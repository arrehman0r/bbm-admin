import { Typography } from "@mui/joy";
import * as React from "react";

export default function CustomTypography({
  level,
  variant,
  fontSize,
  color,
  fontWeight,
  ...props
}) {
  const responsiveFontSize = {
    xs: fontSize?.xs || '0.75rem', 
    sm: fontSize?.sm || '0.875rem', 
    md: fontSize?.md || '1rem', 
    lg: fontSize?.lg || '1.05rem', 
    xl: fontSize?.xl || '1.25rem', 
  };

  return (
    <Typography
      level={level}
      variant={variant}
      fontSize={responsiveFontSize || fontSize}
      color={color || "#141f2b"}
      fontWeight={fontWeight}
      {...props}
    />
  );
}
