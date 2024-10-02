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
import { setDashboardOption } from "../../redux/reducer/dashboardSlice";
import { usCities } from "../../components/utils/constants";
import AppDatePicker from "../../components/common/AppDatePicker";
const AddAgency = () => {
  const agencyDetailsRef = useRef({});
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [timeZones, setTimeZones] = useState([]);
  const userData = useSelector((state) => state.user.loginUser);

  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [fileName, setFileName] = useState(["Upload File"]); // State to manage multiple file upload buttons
  const [agencyTypes, setAgencyTypes] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const loading = useSelector((state) => state.loading.loading);
  const [showPassword, setShowPassword] = React.useState(false);
  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null
  });

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
      "businessName",  "ntn", "businessPhoneNumber", "timeZone", "businessType", "businessEmail"
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
  const timeOptions = Array.from({ length: 24 }, (_, i) => ({
    label: `${i.toString().padStart(2, '0')}:00`,
    value: `${i.toString().padStart(2, '0')}:00`,
  }));

  const handleAddAgency = async () => {
    // ... validation logic remains the same ...
  
    const formData = new FormData();
    formData.append("name", agencyDetailsRef.current.businessName);
    formData.append("ntn", agencyDetailsRef.current.ntn);
    formData.append("phone", agencyDetailsRef.current.businessPhoneNumber);
    formData.append("timeZone", agencyDetailsRef.current.timeZone);
    
    // Append address as an object
    formData.append("address[street]", agencyDetailsRef.current.address);
    formData.append("address[city]", agencyDetailsRef.current.city);
    // formData.append("address[state]", agencyDetailsRef.current.state);
    // formData.append("address[zip]", agencyDetailsRef.current.zip);
    formData.append("address[country]", "USA");
    formData.append("address[location][]", 1212);
    formData.append("address[location][]", 1313);
  
    formData.append("businessType", agencyDetailsRef.current.businessType);
    formData.append("ownerId", userData?.id);
    
    // Append location object directly
    formData.append("location[type]", "Point");
    formData.append("location[coordinates][]", -96.7970);
    formData.append("location[coordinates][]", 32.7767);
  
    // Append business hours
    formData.append("businessHours[0][isOpen]", true);
    formData.append("businessHours[0][startTime]", agencyDetailsRef.current.startTime);
    formData.append("businessHours[0][endTime]", agencyDetailsRef.current.endTime);
  
    // Create an array to hold all files
    const allFiles = images.flat(); // Flatten nested arrays
  
    // Append all files to FormData
    allFiles.forEach((file) => {
      formData.append('files', file);
    });
  
    try {
      dispatch(setLoading(true));
      const res = await addTravelAgency(formData);
      enqueueSnackbar("Business details added successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error adding agency:", error);
      enqueueSnackbar(error, { variant: "error" });
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  console.log("agencyTypes", agencyTypes)
  const formFields = [
    {
      component: InputField,
      label: "Business Name *",
      name: "businessName",
      error: errors.affiliateName,
    },
    {
      component: InputField,
      label: "NTN *",
      name: "ntn",
      type: "number",
      error: errors.affiliateName,
    },

    // {
    //   component: InputField,
    //   label: "Person Name *",
    //   name: "personName",
    //   error: errors.personName,
    // },

    // {
    //   component: FormSelect,
    //   label: "Country *",
    //   name: "country",
    //   options: countries.map((c) => c.name),
    //   error: errors.country,
    // },
    {
      component: FormSelect,
      label: "City *",
      name: "city",
      options: usCities,
      error: errors.city,
    },

    {
      component: InputField,
      label: "Phone *",
      name: "businessPhoneNumber",
      type: "number",
      error: errors.phoneNumber,
    },
    {
      component: InputField,
      label: "Email *",
      name: "businessEmail",
      type: "email",
      error: errors.businessEmail,
    },
    {
      component: InputField,
      label: "Street Address *",
      name: "address",
      type: "address",
      error: errors.address,
    },
    {
      component: FormSelect,
      label: "TimeZone *",
      name: "timeZone",
      options: [
        "America/Los_Angeles",   // Pacific Standard Time (PST)
        "America/Denver",        // Mountain Standard Time (MST)
        "America/Chicago",       // Central Standard Time (CST)
        "America/New_York",      // Eastern Standard Time (EST)
        "America/Anchorage",     // Alaska Standard Time (AKST)
        "Pacific/Honolulu",      // Hawaii-Aleutian Standard Time (HAST)
        "America/Puerto_Rico",   // Atlantic Standard Time (AST)
        "Atlantic/Canary",       // Western European Time (WET)
        "America/Argentina/Buenos_Aires",  // Argentina Time (ART)
        "America/Sao_Paulo"      // Brazil Standard Time (BRT)
      ],
      error: errors.timeZone,
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
      multiple: true,
      label: "Accepted Payment Methods *",
      name: "acceptedMethods",
      options: ["Credit Card", "Cash", "PayPal"],
      error: errors.acceptedMethods,
    },
    {
      component: FormSelect,
      label: "Business Type",
      name: "businessType",
      options: agencyTypes.map((c) => ({ id: c._id, name: c.type })),
      error: errors.affiliateType,
    },

    {
      component: FormSelect,
      label: "Start Time",
      name: "startTime",
      options: timeOptions.map((c) => ({ id: c.label, name: c.value })),

      error: errors.startTime,
    },
    {
      component: FormSelect,
      label: "End Time",
      name: "endTime",
      options: timeOptions.map((c) => ({ id: c.label, name: c.value })),
      error: errors.endTime,
    },
    // {
    //   component: FormSelect,
    //   label: "email",
    //   name: "markupValue",
    //   options: ["Fixed", "Percentage"],
    //   placeholder: "Fixed",
    //   error: errors.markupValue,
    // },
    // {
    //   component: InputField,
    //   label: "Email",
    //   name: "agencyEmail",
    //   error: errors.agencyEmail,
    // },
    // {
    //   component: InputField,
    //   label: "Password",
    //   name: "agencyPassword",
    //   error: errors.agencyPassword,
    //   type: showPassword ? "text" : "password",
    //   endDecorator: showPassword ? (
    //     <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
    //   ) : (
    //     <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
    //   ),
    // },
    // {
    //   component: InputField,
    //   label: "Confirm Password",
    //   name: "agencyConfirmPassword",
    //   error: errors.agencyPassword,
    //   type: showPassword ? "text" : "password",
    //   endDecorator: showPassword ? (
    //     <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
    //   ) : (
    //     <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
    //   ),
    // }

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
              { component: Field, label, name, options, error, placeholder, type, endDecorator, multiple },
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
                  multiple={multiple}
                  fullWidth
                  type={type}
                  onChange={handleInputChange}
                  error={error}
                  placeholder={placeholder}
                  endDecorator={endDecorator}
                />
              </Box>
            )
          )}
        </Box>

        <AppTextArea
          label="Description"
          name="description"
          onChange={handleInputChange}
          error={errors.description}
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
                    text={name || "Upload File"}
                    type="file"
                    variant="outlined"
                    color="#fff"
                    bgColor="#A67E85"
                    onChange={(e) => handleInputChange(e, index)}
                    component="label"
                    multiple
                  />
                  <AppButton
                    text=""
                    variant="outlined"
                    color="#fff"
                    bgColor="#fff"
                    borderColor="#fff"
                    onClick={() => handleFileDelete(index)}
                    startDecorator={<DeleteIcon sx={{ color: "#000", fontSize: '30px' }} />}
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
                  bgColor="#A67E85"
                  endDecorator={<AddIcon />} // Add "+" icon
                />
              </Box>
            </Box>
            <AppButton
              text="Add Business"
              onClick={handleAddAgency}


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
