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
import { addTravelAgency, getAgencyTypes } from "../../server/api";
import { Divider } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/reducer/loaderSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { cnicRegex, emailRegex, passwordRegex, phoneNumberRegex } from "../../components/utils";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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
  const [agencyTypes, setAgencyTypes] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const loading = useSelector((state) => state.loading.loading);
  const [showPassword, setShowPassword] = React.useState(false);
  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const dispatch = useDispatch()
  useEffect(() => {
    setCountries(Country.getAllCountries());
    setTimeZones([Intl.DateTimeFormat().resolvedOptions().timeZone]); // Wrap in array
    fetchAgencyTypes()
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};
  const fetchAgencyTypes = async () => {
    try {

      const res = await getAgencyTypes()
      console.log("res of agency types is ", res)
      setAgencyTypes(res || []);
    }
    catch (error) {
      console.log("error in fetching agnecy types", error)
    }


  }

  const handleFileDelete = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1); // Remove the file at the specified index
      return updatedImages;
    });

    setFileName((prevFileNames) => {
      const updatedFileNames = [...prevFileNames];
      updatedFileNames.splice(index, 1); // Remove the file name at the specified index
      return updatedFileNames;
    });
  };
  const handleInputChange = useCallback(
    (event, index) => {
      console.log("handleInputChange called", index);
      const { name, value, files } = event.target;

      if (files && files.length > 0) {
        const selectedFiles = Array.from(files);

        if (images.flat().length + selectedFiles.length > MAX_FILES) {
          enqueueSnackbar(`You can upload a maximum of ${MAX_FILES} files.`, { variant: "error" });
          return;
        }

        // Check file sizes
        const oversizedFiles = selectedFiles.filter(file => file.size > MAX_FILE_SIZE);
        if (oversizedFiles.length > 0) {
          enqueueSnackbar(`File(s) exceed the 5MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`, { variant: "error" });
          return;
        }

        // Handle multiple file uploads for images
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
      }
    },
    [countries, enqueueSnackbar, images, MAX_FILES, MAX_FILE_SIZE]
  );

  const addFileUploadField = () => {
    setFileName((prevFileNames) => [...prevFileNames, "Upload File"]);
    setImages((prevImages) => [...prevImages, []]);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "affiliateName", "personName", "cnic", "designation", "phoneNumber",
      "country", "city", "timeZone", "defaultCurrency", "currency",
      "salesChannel", "poBoxNumber", "affiliateType",
      "agencyType", "arCode", "groupArCode",
      "agencyEmail", "agencyPassword", "agencyConfirmPassword"
    ];
    requiredFields.forEach((field) => {
      if (!agencyDetailsRef.current[field]) {
        console.log("missing fiels", field)
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

    const agencyEmail = agencyDetailsRef.current.agencyEmail;
    if (agencyEmail && !emailRegex.test(agencyEmail)) {
      enqueueSnackbar("Invalid Email Format", {
        variant: "error",
      });
      return
    }

    const agencyCnic = agencyDetailsRef.current.cnic;
    if (agencyCnic && !cnicRegex.test(agencyCnic)) {
      enqueueSnackbar("Invalid CNIC Format", {
        variant: "error",
      });
      return
    }

    const agencyPhone = agencyDetailsRef.current.phoneNumber;
    if (agencyPhone && !phoneNumberRegex.test(agencyPhone)) {
      enqueueSnackbar("Invalid Phone Format", {
        variant: "error",
      });
      return
    }

    // Validate password
    const agencyPassword = agencyDetailsRef.current.agencyPassword;
    const agencyConfirmPassword = agencyDetailsRef.current.agencyConfirmPassword;

    if (agencyPassword !== agencyConfirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return; 
    }


    if (agencyPassword && !passwordRegex.test(agencyPassword)) {
      enqueueSnackbar("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character", {
        variant: "error",
      });
      return
    }



    const formData = new FormData();
    formData.append("affiliateName", agencyDetailsRef.current.affiliateName);
    formData.append("personName", agencyDetailsRef.current.personName);
    formData.append("designation", agencyDetailsRef.current.designation);
    formData.append("phoneNumber", agencyDetailsRef.current.phoneNumber);
    formData.append("country", agencyDetailsRef.current.country);
    formData.append("city", agencyDetailsRef.current.city);
    formData.append("timeZone", agencyDetailsRef.current.timeZone);
    formData.append("defaultCurrency", agencyDetailsRef.current.defaultCurrency);
    formData.append("currency", agencyDetailsRef.current.currency);
    formData.append("addStaff", agencyDetailsRef.current.staffNumber);
    formData.append("salesChannel", agencyDetailsRef.current.salesChannel);
    formData.append("poBoxNumber", agencyDetailsRef.current.poBoxNumber);
    formData.append("affiliateType", agencyDetailsRef.current.affiliateType);
    formData.append("arCode", agencyDetailsRef.current.arCode);
    formData.append("groupArCode", agencyDetailsRef.current.groupArCode);
    formData.append("address", agencyDetailsRef.current.address);
    formData.append("agencyEmail", agencyDetailsRef.current.agencyEmail);
    formData.append("agencyPassword", agencyDetailsRef.current.agencyPassword);
    formData.append("agencyType", agencyDetailsRef.current.agencyType);

    formData.append("agencyName", agencyDetailsRef.current.agencyName);
    formData.append("CNIC", agencyDetailsRef.current.cnic);
    formData.append("role", "agency");

    // Create an array to hold all files
    const allFiles = images.flat(); // Flatten nested arrays

    // Append all files to FormData
    allFiles.forEach((file) => {
      formData.append('files', file); // Use the same key ''
    });


    try {
      dispatch(setLoading(true));
      const res = await addTravelAgency(formData);
      enqueueSnackbar("Agency added successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error adding agency:", error);
      enqueueSnackbar("Error adding agency", { variant: "error" });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const formFields = [
    {
      component: InputField,
      label: "Agency Name *",
      name: "agencyName",
      error: errors.affiliateName,
    },
    {
      component: InputField,
      label: "CNIC *",
      name: "cnic",
      type: "number",
      error: errors.affiliateName,
    },
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
      type: "number",
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
      component: InputField,
      label: "Number of staff can be added",
      name: "staffNumber",
      type: "number",
      error: errors.staffNumber,
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
      type: "number",
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
      label: "Agency Type",
      name: "agencyType",
      options: agencyTypes.map((c, id) => c.type),
      error: errors.affiliateType,
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
      error: errors.agencyEmail,
    },
    {
      component: InputField,
      label: "Password",
      name: "agencyPassword",
      error: errors.agencyPassword,
      type: showPassword ? "text" : "password",
      endDecorator: showPassword ? (
        <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
      ) : (
        <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
      ),
    },
    {
      component: InputField,
      label: "Confirm Password",
      name: "agencyConfirmPassword",
      error: errors.agencyPassword,
      type: showPassword ? "text" : "password",
      endDecorator: showPassword ? (
        <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
      ) : (
        <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
      ),
    }
    
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
              { component: Field, label, name, options, error, placeholder, type, endDecorator },
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
                  type={type}
                  onChange={handleInputChange}
                  error={error}
                  placeholder={placeholder}
                  endDecorator = {endDecorator}
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
                    color="#fff"
                    bgColor="#581E47"
                    onChange={(e) => handleInputChange(e, index)}
                    component="label"
                    // width="250px"
                    multiple
                    endDecorator={<DeleteIcon onClick={() => handleFileDelete(index)} />}
                  />
                </Box>
              ))}
              <Box display="flex" alignItems="center" mt={2}>
                <AppButton
                  text="Add Another File"
                  onClick={addFileUploadField}
                  variant="outlined"
                  width="250px"
                  color="#fff"
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
