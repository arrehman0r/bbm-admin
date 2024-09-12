import React from 'react';
import AsyncSelect from "react-select/async";
import { useTheme } from '@mui/joy/styles';

const SearchSelect = ({ placeholder, onChange, _name, label, error, startDecorator, size = "lg", loadOptions, value }) => {
  
  const theme = useTheme();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: size === "sm" ? '32px' : '48px',
      height: 'auto',
      borderRadius: theme.radius.sm,
      fontSize: theme.fontSize.md,
      fontFamily: theme.fontFamily.body,
      borderColor: error ? theme.palette.danger[500] : state.isFocused ? theme.palette.primary[500] : theme.palette.neutral[300],
      boxShadow: state.isFocused ? `0 0 0 3px ${theme.palette.primary[200]}` : 'none',
      '&:hover': {
        borderColor: theme.palette.primary[400],
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: size === "sm" ? '2px 8px' : '6px 12px',
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    placeholder: (base) => ({
      ...base,
      color: theme.palette.text.tertiary,
    }),
    singleValue: (base) => ({
      ...base,
      color: theme.palette.text.primary,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? theme.palette.primary[100] : 'white',
      color: state.isSelected ? theme.palette.primary[600] : theme.palette.text.primary,
      '&:hover': {
        backgroundColor: theme.palette.primary[50],
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  const handleInputChange = (inputValue, actionMeta) => {
    if (actionMeta.action === 'input-change') {
      onChange(inputValue, _name);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '4px',
          fontSize: theme.fontSize.sm,
          fontWeight: theme.fontWeight.md,
          color: error ? theme.palette.danger[500] : theme.palette.text.secondary,
        }}>
          {label}
        </label>
      )}
      <AsyncSelect
        cacheOptions
      
        value={value} 
        loadOptions={loadOptions}
        placeholder={placeholder || "Select"}
        styles={customStyles}
        onChange={(selectedOption) => onChange(selectedOption, _name)}
        onInputChange={handleInputChange}
        name={_name}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
      {startDecorator && (
        <div style={{
          position: 'absolute',
          left: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}>
          {startDecorator}
        </div>
      )}
    </div>
  );
}

export default SearchSelect;