import React from "react";
import { Box, Typography, Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/login");
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 3,
        backgroundColor: 'background.body'
      }}
    >
      <Typography level="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Thank you for verifying your email!
      </Typography>
      <Typography level="body1" sx={{ mb: 4 }}>
        Your email has been successfully verified. You can now continue using our services.
      </Typography>
      <Button variant="solid" color="primary" size="lg"  onClick={handleContinue}>
        Continue
      </Button>
    </Box>
  );
};

export default VerifyEmail;
