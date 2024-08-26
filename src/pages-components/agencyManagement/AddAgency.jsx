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
import ButtonGroup from "@mui/joy/ButtonGroup";
import AppButton from "../../components/common/AppButton";
import ComponentWrapper from "../../components/common/ComponentWrapper";
import { addTravelAgency } from "../../server/api";
import { Country, City } from "country-state-city";
import { useSnackbar } from "notistack";
import { Button } from "@mui/joy";

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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setCountries(Country.getAllCountries());
    setTimeZones([Intl.DateTimeFormat().resolvedOptions().timeZone]); // Wrap in array
  }, []);

  const handleInputChange = useCallback(
    (event) => {
      const { name, value, files } = event.target;

      if (files) {
        // Handle file upload for images
        const selectedFiles = Array.from(files);
        setImages(selectedFiles);
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

    // Convert files to base64 or keep as blobs
    const imagesBase64 = await Promise.all(
      images.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );

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
      images: imagesBase64, // Add the images array to the request body
    };

    try {
      const res = await addTravelAgency(body);
      enqueueSnackbar("Agency added successfully!", { variant: "success" });
      // Reset form or handle any post-submit actions
    } catch (error) {
      console.error("Error adding agency:", error);
      enqueueSnackbar("Error adding agency", { variant: "error" });
    }
  };

  const formFields = [
    {
      component: InputField,
      label: "Affiliate Name",
      name: "affiliateName",
      error: errors.affiliateName,
    },
    {
      component: InputField,
      label: "Person Name",
      name: "personName",
      error: errors.personName,
    },
    {
      component: InputField,
      label: "Designation",
      name: "designation",
      error: errors.designation,
    },
    {
      component: FormSelect,
      label: "Country",
      name: "country",
      options: countries.map((c) => c.name),
      error: errors.country,
    },
    {
      component: FormSelect,
      label: "City",
      name: "city",
      options: cities,
      error: errors.city,
    },
    {
      component: InputField,
      label: "Phone",
      name: "phoneNumber",
      error: errors.phoneNumber,
    },
    {
      component: FormSelect,
      label: "TimeZone",
      name: "timeZone",
      options: timeZones,
      error: errors.timeZone,
    },
    {
      component: FormSelect,
      label: "Default Currency",
      name: "defaultCurrency",
      options: ["USD", "EUR", "PKR", "RMB"],
      error: errors.defaultCurrency,
    },
    {
      component: FormSelect,
      label: "Currency",
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
      label: "Sales Channel",
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
    {
      component: FormSelect,
      label: "Markup Value",
      name: "markupValue",
      options: ["Fixed", "Percentage"],
      placeholder: "Fixed",
      error: errors.markupValue,
    },
    {
      component: InputField,
      label: "Add Markup",
      name: "AddMarkup",
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
            ({ component: Field, label, name, options, error, placeholder }, index) => (
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
                  placeholder ={placeholder}
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
        <ComponentWrapper text="Affiliate Documents">
          <AppButton
            text="Upload"
            type="file"
            onChange={handleInputChange}
            multiple
          />
        </ComponentWrapper>
        <AppButton text="Add Agency" onClick={handleAddAgency} />
      </div>
    ),
    [handleInputChange, countries, cities, timeZones, languages, errors]
  );

  return renderAgencyForm;
};

export default AddAgency;
