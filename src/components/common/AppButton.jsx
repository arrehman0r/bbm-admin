import * as React from "react";
import Button from "@mui/joy/Button";
import { styled } from "@mui/joy";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const AppButton = ({
  type = "button",
  disabled,
  text,
  startDecorator,
  endDecorator,
  onChange,
  onClick,
  loading,
  color,
  variant,
  bgColor,
  width,
  borderColor,
  height,
})=>  {
  return (
    <Button
      component={type === "file" ? "label" : "button"}
      disabled={disabled}
      // tabIndex={-1}
      variant={variant || "outlined"}
      sx={{
        color: color || "#fff" ,
        backgroundColor: bgColor || "#581E47",
        borderColor: borderColor || "#581E47",
        ...(width && { width: width }), // Apply width only if it exists
        ...(height && { height: height }), // Apply width only if it exists
        "&:hover": {
          backgroundColor: bgColor,
          color:  color || "#000" ,
        },
      }}
      startDecorator={startDecorator}
      endDecorator={endDecorator}
      onChange={type === "file" ? onChange : undefined}
      onClick={type !== "file" ? onClick : undefined}
      loading={loading}
    >
      {text}
      {type === "file" && <VisuallyHiddenInput type="file" />}
    </Button>
  );
}
export default AppButton