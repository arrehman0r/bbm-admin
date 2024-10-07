import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/joy";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../server/api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/reducer/loaderSlice";
import { useSnackbar } from "notistack";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams(); 
  const token = searchParams.get("token");
  const [isVerified, setIsVerified] = useState(null); // State to track verification status

  const verifyUser = async () => {
    dispatch(setLoading(true));
    try {
      const res = await verifyEmail(token); // Ensure to await the API call
      console.log("res of verify email is", res);
      setIsVerified(true); // Set to true if verification is successful
    } catch (error) {
      enqueueSnackbar("Verification failed. " + error, { variant: 'error' });
      setIsVerified(false); // Set to false if there's an error
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

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
      {isVerified === null && ( // Initial state: show nothing
        <Typography level="body1">Verifying your email...</Typography>
      )}
      {isVerified && ( // Email verified successfully
        <>
          <Typography level="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Thank you for verifying your email!
          </Typography>
          <Typography level="body1" sx={{ mb: 4 }}>
            Your email has been successfully verified. You can now continue using our services.
          </Typography>
        </>
      )}
      {isVerified === false && ( // Email verification failed
        <Typography level="body1" sx={{ mb: 4, color: 'error.main' }}>
          Your email could not be verified. Please try again.
        </Typography>
      )}
      {isVerified !== null && ( // Only show the button if verification process has completed
        <Button variant="solid" color="primary" size="lg" onClick={handleContinue}>
          Continue
        </Button>
      )}
    </Box>
  );
};

export default VerifyEmail;
