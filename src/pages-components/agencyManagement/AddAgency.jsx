import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import Box from "@mui/joy/Box";
import InputField from "../../components/common/InputField";
import FormSelect from "../../components/common/FormSelect";
import AppTextArea from "../../components/common/AppTextArea";
import AppButton from "../../components/common/AppButton";
import { Country, City } from "country-state-city";
import { useSnackbar } from "notistack";
import TextHeading from "../../components/common/TextHeading";
import { addTravelAgency } from "../../server/api";
import { Divider } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/reducer/loaderSlice";

const AddAgency = () => {
  const agencyDetailsRef = useRef({});
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [timeZones, setTimeZones] = useState([]);
  const [languages, setLanguages] = useState([
    "English",
    "Spanish",
    "French",
    "German",
    "Urdu",
    "Hindi",
    "Punjabi",
  ]);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [fileName, setFileName] = useState(["Upload File"]); // State to manage multiple file upload buttons
  const { enqueueSnackbar } = useSnackbar();
  const loading  = useSelector((state)=> state.loading.loading)
const dispatch = useDispatch()
  useEffect(() => {
    setCountries(Country.getAllCountries());
    setTimeZones([Intl.DateTimeFormat().resolvedOptions().timeZone]); // Wrap in array
  }, []);

  const handleInputChange = useCallback(
    (event, index) => {
      const { name, value, files } = event.target;

      if (files) {
        // Handle multiple file uploads for images
        const selectedFiles = Array.from(files);
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[index] = selectedFiles;
          return updatedImages;
        });

        const newFileName =
          selectedFiles.length > 1
            ? `${selectedFiles.length} files selected`
            : selectedFiles[0]?.name || "Upload File";

        setFileName((prevFileNames) => {
          const updatedFileNames = [...prevFileNames];
          updatedFileNames[index] = newFileName;
          return updatedFileNames;
        });
      } else {
        agencyDetailsRef.current[name] = value;
      }

      if (name === "country") {
        const selectedCountry = countries.find((c) => c.name === value);
        if (selectedCountry) {
          setCities(
            City.getCitiesOfCountry(selectedCountry.isoCode).map(
              (city) => city.name
            )
          );
        } else {
          setCities([]);
        }
      }
    },
    [countries]
  );

  const addFileUploadField = () => {
    setFileName((prevFileNames) => [...prevFileNames, "Upload File"]);
    setImages((prevImages) => [...prevImages, []]);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["affiliateName", "personName"];

    requiredFields.forEach((field) => {
      if (!agencyDetailsRef.current[field]) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAgency = async () => {
    if (!validateForm()) {
      enqueueSnackbar("Please fill in all required fields.", {
        variant: "error",
      });
      return;
    }

    // const imagesBase64 = await Promise.all(
    //   images.flat().map((file) => {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.onload = () => resolve(reader.result);
    //       reader.onerror = reject;
    //       reader.readAsDataURL(file);
    //     });
    //   })
    // );

    console.log("images==", images)

    const body = {
      affiliateName: agencyDetailsRef.current.affiliateName,
      personName: agencyDetailsRef.current.personName,
      designation: agencyDetailsRef.current.designation,
      phoneNumber: agencyDetailsRef.current.phoneNumber,
      country: agencyDetailsRef.current.country,
      city: agencyDetailsRef.current.city,
      timeZone: agencyDetailsRef.current.timeZone,
      defaultCurrency: agencyDetailsRef.current.defaultCurrency,
      currency: agencyDetailsRef.current.currency,
      defaultLanguage: agencyDetailsRef.current.defaultLanguage,
      salesChannel: agencyDetailsRef.current.salesChannel,
      poBoxNumber: agencyDetailsRef.current.poBoxNumber,
      affiliateType: agencyDetailsRef.current.affiliateType,
      arCode: agencyDetailsRef.current.arCode,
      groupArCode: agencyDetailsRef.current.groupArCode,
      address: agencyDetailsRef.current.address,
      images: images, 
      agencyEmail:  agencyDetailsRef.current.agencyEmail,
      agencyPassword:  agencyDetailsRef.current.agencyPassword,
      markupType: agencyDetailsRef.current.markupType,
      markupRate: agencyDetailsRef.current.markupValue,
    };

    try {
      console.log("body is", body)
      dispatch(setLoading(true))
      const res = await addTravelAgency(body);
      enqueueSnackbar("Agency added successfully!", { variant: "success" });
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      console.error("Error adding agency:", error);
      enqueueSnackbar("Error adding agency", { variant: "error" });
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  const formFields = [
    {
      component: InputField,
      label: "Affiliate Name *",
      name: "affiliateName",
      error: errors.affiliateName,
    },
    {
      component: InputField,
      label: "Person Name *",
      name: "personName",
      error: errors.personName,
    },
    {
      component: InputField,
      label: "Designation *",
      name: "designation",
      error: errors.designation,
    },
    {
      component: FormSelect,
      label: "Country *",
      name: "country",
      options: countries.map((c) => c.name),
      error: errors.country,
    },
    {
      component: FormSelect,
      label: "City *",
      name: "city",
      options: cities,
      error: errors.city,
    },
    {
      component: InputField,
      label: "Phone *",
      name: "phoneNumber",
      error: errors.phoneNumber,
    },
    {
      component: FormSelect,
      label: "TimeZone *",
      name: "timeZone",
      options: timeZones,
      error: errors.timeZone,
    },
    {
      component: FormSelect,
      label: "Default Currency *",
      name: "defaultCurrency",
      options: ["USD", "EUR", "PKR", "RMB"],
      error: errors.defaultCurrency,
    },
    {
      component: FormSelect,
      label: "Currency *",
      name: "currency",
      options: ["USD", "EUR", "PKR", "RMB"],
      error: errors.currency,
    },
    {
      component: FormSelect,
      label: "Default Language",
      name: "defaultLanguage",
      options: languages,
      error: errors.defaultLanguage,
    },
    {
      component: FormSelect,
      label: "Sales Channel *",
      name: "salesChannel",
      options: ["Online", "Offline"],
      error: errors.salesChannel,
    },
    {
      component: InputField,
      label: "PO Box Number",
      name: "poBoxNumber",
      error: errors.poBoxNumber,
    },
    {
      component: FormSelect,
      label: "Affiliate Type",
      name: "affiliateType",
      options: ["B2B", "B2C"],
      error: errors.affiliateType,
    },
    {
      component: FormSelect,
      label: "Markup Type",
      name: "markupType",
      options: ["FIXED", "PERCENTAGE"],
      error: errors.affiliateType,
    },
    {
      component: InputField,
      label: "Markup Value",
      name: "markupValue",
      error: errors.arCode,
    },
    {
      component: InputField,
      label: "AR Code",
      name: "arCode",
      error: errors.arCode,
    },
    {
      component: InputField,
      label: "Group AR Code",
      name: "groupArCode",
      error: errors.groupArCode,
    },
    // {
    //   component: FormSelect,
    //   label: "email",
    //   name: "markupValue",
    //   options: ["Fixed", "Percentage"],
    //   placeholder: "Fixed",
    //   error: errors.markupValue,
    // },
    {
      component: InputField,
      label: "Email",
      name: "agencyEmail",
      error: errors.addMarkup,
    },
    {
      component: InputField,
      label: "Password",
      name: "agencyPassword",
      error: errors.addMarkup,
    },
  ];

  const renderAgencyForm = useMemo(
    () => (
      <div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            marginBottom: 3,
          }}
        >
          {formFields.map(
            (
              { component: Field, label, name, options, error, placeholder },
              index
            ) => (
              <Box
                key={index}
                sx={{
                  flexBasis: "calc(33.333% - 16px)",
                  flexGrow: 0,
                  flexShrink: 0,
                }}
              >
                <Field
                  label={label}
                  name={name}
                  options={options}
                  fullWidth
                  onChange={handleInputChange}
                  error={error}
                  placeholder={placeholder}
                />
              </Box>
            )
          )}
        </Box>
        <AppTextArea
          label="Address"
          name="address"
          onChange={handleInputChange}
          error={errors.address}
        />
        <Box mt={3}>
          <TextHeading text="Affiliate Documents" level="h5" />

          <Divider sx={{ mt: 2, mb: 2 }} />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="column" gap={2}>
              {fileName.map((name, index) => (
                <Box key={index} display="flex" gap={2}>
                  <AppButton
                    text={name || "Upload File"} // Display file name or default text
                    type="file"
                    variant="outlined"
                    color="#581E47"
                    bgColor="#581E47"
                    onChange={(e) => handleInputChange(e, index)}
                    component="label"
                    width="250px"
                    multiple
                  />
                </Box>
              ))}
              <Box display="flex" alignItems="center" mt={2}>
                <AppButton
                  text="Add Another File"
                  onClick={addFileUploadField}
                  variant="outlined"
                  width="250px"
                  color="#581E47"
                  bgColor="#581E47"
                  endIcon={<AddIcon />} // Add "+" icon
                />
              </Box>
            </Box>
            <AppButton
              text="Add Agency"
              onClick={handleAddAgency}
              variant="contained"
              color="#fff"
              bgColor="#581E47"
              height="30px"
              disabled={loading}
            />
          </Box>
        </Box>
      </div>
    ),
    [fileName, formFields, handleInputChange]
  );

  return <Box sx={{ mt: 2, mb: 5 }}>{renderAgencyForm}</Box>;
};

export default AddAgency;
