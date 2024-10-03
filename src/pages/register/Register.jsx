import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { GoogleIcon } from '../../images';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { userRegister } from '../../server/api';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/reducer/loaderSlice';

// function ColorSchemeToggle() {
// //   const { onClick, ...other } = props;
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = React.useState(false);

//   React.useEffect(() => setMounted(true), []);

//   return (
//     <IconButton
//       aria-label="toggle light/dark mode"
//       size="sm"
//       variant="outlined"
//       disabled={!mounted}
//       onClick={(event) => {
//         setMode(mode === 'light' ? 'dark' : 'light');
//         // onClick?.(event);
//       }}
//     //   {...other}
//     >
//       {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
//     </IconButton>
//   );
// }

export default function AppRegister() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: ''


  });
  const dispatch = useDispatch()
  const validateForm = () => {
      const { password, email } = formData;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!password || !email) {
          enqueueSnackbar("Please fill in all required fields.", { variant: 'error' });
          return false;
      }
      if (!emailRegex.test(email)) {
          enqueueSnackbar("Please enter a valid email address", { variant: 'error' });

          return false;
      }
      return true;
  };

  const handleUserLogin = async (event) => {
      event.preventDefault();
      if (validateForm()) {
          console.log("form is valid")
          try {
              dispatch(setLoading(true))
              const res = await userRegister(formData);
            
              if (res.body._id) {
                  enqueueSnackbar("Registration successful!", { variant: 'success' });
                  // dispatch(setLoginUser(res?.user))
                  // Cookies.set('auth-token', res.token, { expires: 7 });
                  dispatch(setLoading(false))
                  navigate("/login")
              } 
          } catch (error) {
              enqueueSnackbar(error, { variant: 'error' });
              console.log("error is ", error)
              dispatch(setLoading(false))
          }
          finally {
              dispatch(setLoading(false))
          }
      }
  };

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };





  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              {/* <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton> */}
              <Typography level="title-lg">Beauty By Mandy</Typography>
            </Box>
            {/* <ColorSchemeToggle /> */}
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                Register
                </Typography>
                <Typography level="body-sm">
                Already have an account?{' '}
                  <Link href="/login" level="title-sm">
                   Login
                  </Link>
                </Typography>
              </Stack>
              {/* <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button> */}
            </Stack>
            {/* <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                },
              })}
            >
              or
            </Divider> */}
            <Stack gap={4} sx={{ mt: 2 }}>
            <form onSubmit={handleUserLogin}
                // onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                //   event.preventDefault();
                //   const formElements = event.currentTarget.elements;
                //   const data = {
                //     email: formElements.email.value,
                //     password: formElements.password.value,
                //     persistent: formElements.persistent.checked,
                //   };
                //   alert(JSON.stringify(data, null, 2));
                // }}
              >
                  <FormControl required>
                  <FormLabel>First Name</FormLabel>
                  <Input type="first-name" name="firstName" value={formData.firstName} onChange={handleChange} />
                 
                </FormControl>
                <FormControl required>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="last-name" name="lastName" value={formData.lastName} onChange={handleChange} />
                 
                </FormControl>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                </FormControl>
                <FormControl required>
                  <FormLabel>Phone</FormLabel>
                  <Input type="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type={showPassword ? "text" : "password"} name="password" endDecorator={showPassword ? <VisibilityIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} /> : <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />} value={formData.password} onChange={handleChange} />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox size="sm" label="Accept Terms" name="persistent" />
                    <Link level="title-sm" href="#replace-with-a-link">
                    
                    </Link>
                  </Box>
                  <Button type="submit" fullWidth>
                   Regsiter
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Beauty By Mandy {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      />
    </CssVarsProvider>
  );
}
