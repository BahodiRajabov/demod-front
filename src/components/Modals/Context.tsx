import * as React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { getMyProfile, resetMyProfile } from '../../data/me';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState, setSignupState, setVerifyState, setOpenModal } from '../../data/modal_checker';
import { setAuthState } from "../../data/login";
import { Box, Typography, Grid, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { useCookies } from "react-cookie";
import Image from 'next/image';
import SimpleTypography from '../Typography'
import Buttons from '../Buttons';
import EmailInputAdornments from '../Inputs/EmailInput';
import PasswordInputAdornments from '../Inputs/PasswordInput';
import axios from '../../utils/axios';
import AlertWrapper from '../Alert';
import Countdown from 'react-countdown';
import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from '../../utils/expiration'
import ForwardIcon from '@mui/icons-material/Forward';
import Cookies from 'js-cookie'
import { env } from 'process';
import SimpleInp from '../Inputs/SimpleInp';
import Link from 'next/link';
//Login context
interface LoginContextProps {
  // setAlertMessage: any
  setModalChange__Viewer?: any,
  setOpen?: any,
  setUserEmail?: any,
  userEmail?: any,
  setProgress?: any,
}

// converts UTC time to local time
function ConvertUTCTimeToLocalTime(UTCDateString: any) {
  var convertdLocalTime = new Date(UTCDateString);

  var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

  convertdLocalTime.setHours(convertdLocalTime.getHours() + hourOffset);

  return convertdLocalTime;
}

export const LoginContext = (props: LoginContextProps) => {
  const authState = useSelector((state: any) => state?.auth_slicer?.authState);

  //declare dispatcher
  const dispatch = useDispatch<any>();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          phone_number: '',
          password: '',
          submit: null
        }}
        // 998971113539
        validationSchema={Yup.object().shape({
          phone_number: Yup.string()
            .min(10, "too short")
            .max(13, "too long")
            .required('The phone number field is required'),
          password: Yup.string()
            .required('No password provided.')
            .max(255)
            .min(6, 'Password is too short - should be 6 chars minimum.')
          // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        })}
        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            let res = await axios.post(
              `auth/signin`,
              { phone_number: _values.phone_number, password: _values?.password },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'accessToken'
                  )}`
                },
                onUploadProgress: (progressEvent) => {
                  console.log(progressEvent)

                }
              }
            );
            resetForm();
            props?.setUserEmail(_values?.phone_number);
            // dispatch(resetMyProfile())
            if (res?.data?.data?.user?.is_verified) {
              var inFifteenMinutes = new Date(new Date().getTime() + Number(ACCESS_TOKEN_EXPIRATION));

              var inTwoMinutes = new Date(new Date().getTime() + Number(REFRESH_TOKEN_EXPIRATION));

              console.log(REFRESH_TOKEN_EXPIRATION, "truu")
              Cookies.set(
                'accessToken',
                res?.data?.data?.tokens?.accessToken?.token,
                { expires: inFifteenMinutes, path: '/' }
              )

              Cookies.set(
                'refreshToken',
                res?.data?.data?.tokens?.refreshToken?.token,
                { expires: inTwoMinutes, path: '/' }
              )

              dispatch(setAuthState(true))
              dispatch(setOpenModal(false));
            } else {
              dispatch(setVerifyState(true));
            }
            dispatch(setLoginState(false));
            toast.success("You have successfully logged in")
            setStatus({ success: true });

            // var inFifteenMinutes = new Date(new Date().getTime() + Number(ACCESS_TOKEN_EXPIRATION));

            // var inTwoMinutes = new Date(new Date().getTime() + Number(REFRESH_TOKEN_EXPIRATION));
            // console.log(REFRESH_TOKEN_EXPIRATION, "truu")
            // Cookies.set(
            //   'accessToken',
            //   res?.data?.data?.tokens?.accessToken?.token,
            //   { expires: inFifteenMinutes, path: '/' }
            // )

            // Cookies.set(
            //   'refreshToken',
            //   res?.data?.data?.tokens?.refreshToken?.token,
            //   { expires: inTwoMinutes, path: '/' }
            // )

            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            if (err.response.data.message) {
              toast.error(err.response.data.message);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <SimpleTypography
                  className="modal__title"
                  variant="h6"
                  text="Login"
                />
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginBottom: "26px"
                  }}>
                  <SimpleTypography
                    className="modal__sub-title"
                    variant="h6"
                    text="Don’t have an account?"
                  />
                  <Buttons
                    name="Create account"
                    onClick={() => {
                      dispatch(setSignupState(true));
                      dispatch(setLoginState(false))
                    }}
                    className='underlined__btn'
                  />
                </Grid>
                <Box sx={{ marginBottom: "26px", width: "100%" }}>
                  <SimpleInp
                    error={Boolean(touched.phone_number && errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                    name="phone_number"
                    type="text"
                    label='Phone number'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone_number}
                    placeholderText='+9989XXXXXXXX'
                  />
                </Box>


                <SimpleInp
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  label='Password'
                  type="password"
                  autoComplete="off"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Enter password'
                />

                {/* <EmailInputAdornments
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  name="email"
                  type="email"
                  label='Email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  placeholderText='example@gmail.com'
                />

                <PasswordInputAdornments
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  type="password"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Enter password'
                /> */}

                <Box sx={{ marginTop: "10px" }}>
                  <Buttons name="Forgot your password?" className='underlined__btn' />
                </Box>
                <Buttons
                  type="submit"
                  name="Sign in"
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                />
              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}

//Sign up context

export const SignUpContext = (props: LoginContextProps) => {
  const dispatch = useDispatch<any>();

  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          phone_number: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string()
            .max(255)
            .min(2, 'Too short - should be 2 chars minimum.')
            .required('The full name field is required'),
          last_name: Yup.string()
            .max(255)
            .min(2, 'Too short - should be 2 chars minimum.'),
          phone_number: Yup.string()
            .min(10, "too short")
            .max(13, "too long")
            .required('The phone number field is required'),
          password: Yup.string()
            .max(255)
            .min(6, 'Password is too short - should be 8 chars minimum.')
            .required('The password field is required')
          // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        })}

        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            await axios.post(
              `auth/signup`,
              {
                full_name: `${_values.first_name} ${_values.last_name}`,
                phone_number: _values.phone_number,
                password: _values?.password,
                language_id: 1
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'accessToken'
                  )}`
                },
                // onUploadProgress: (progressEvent) => {
                // setProgress(`${Math.round((100 * data.loaded) / data.total)}`);
                // }
              }
            );
            // resetForm();
            // dispatch(reset());
            setStatus({ success: true });
            props?.setUserEmail(_values?.phone_number);
            dispatch(setSignupState(false));
            dispatch(setVerifyState(true));
            dispatch(setOpenModal(true));
            // setTimeout(()=>{
            //   props?.setOpen(false);
            // }, [500])
            // toast.success("You have been registered successfully")
            setSubmitting(false);
          } catch (err: any) {
            console.error(err, "hellow");
            setStatus({ success: false });
            toast.error(err?.response?.data?.message)
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <SimpleTypography className="modal__title" variant="h6" text="Create account" />
                <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                  <SimpleTypography className="modal__sub-title" variant="h6" text="Already have an account?" />
                  <Buttons
                    name="Log in"
                    onClick={() => {
                      dispatch(setLoginState(true))
                      dispatch(setSignupState(false))
                    }}
                    className='underlined__btn'
                  />
                </Grid>

                {/* <EmailInputAdornments
                  error={Boolean(touched.full_name && errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                  name="full_name"
                  type="full_name"
                  label="Full name"
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.full_name}
                  placeholderText='Name Surname'
                /> */}
                <Box sx={{ display: "flex", marginTop: "26px", width: "100%", marginBottom: "26px" }}>
                  <Box sx={{ paddingRight: "8px", width: "50%" }}>
                    <SimpleInp
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      name="first_name"
                      type="first_name"
                      label="First name"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name}
                      placeholderText='First name'
                    />
                  </Box>
                  <Box sx={{ paddingLeft: "8px", width: "50%" }}>
                    <SimpleInp
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                      name="surname"
                      type="surname"
                      label="Surname"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      placeholderText='Surname'
                    />
                  </Box>
                </Box>

                <Box sx={{ marginBottom: "26px", width: "100%" }}>
                  <SimpleInp
                    error={Boolean(touched.phone_number && errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                    name="phone_number"
                    type="phone_number"
                    label='Phone number'
                    autoComplete="off"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone_number}
                    placeholderText='+9989XXXXXXXX'
                  />
                </Box>

                <SimpleInp
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  label='Password'
                  type="password"
                  autoComplete="off"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Enter password'
                />




                {/* <EmailInputAdornments
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  name="email"
                  type="email"
                  label='Email'
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  placeholderText='example@gmail.com'
                /> */}

                {/* <PasswordInputAdornments
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  type="password"
                  autoComplete="off"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Enter password'
                /> */}

                {/* <Buttons name="Forgot your password?" className='underlined__btn' /> */}
                <Buttons
                  type="submit"
                  name="Create an account"
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                />
                <Box></Box>
                <SimpleTypography className='singIn__text' text='By creating an account you agree to our'>
                  <Link href={"/"}>
                    <a>
                      Terms & Conditions and our
                    </a>
                  </Link>
                </SimpleTypography>

              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}


//Verify your account context

export const VerificationContext = (props: LoginContextProps) => {
  interface RenderTypes {
    minutes: any,
    seconds: any,
    completed: boolean,
  }

  //declare dispatcher
  const dispatch = useDispatch<any>();

  const Renderer = ({ minutes, seconds, completed }: RenderTypes) => {
    if (completed) {
      // Render a completed state
      return (
        <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
          <SimpleTypography
            className="modal__sub-title"
            variant="h6"

            text="Didn't received code?"
          />
          <Buttons
            name="Resend code"
            onClick={() => { }}
            className='underlined__btn'
          />
        </Grid>
      )
    } else {
      // Render a countdown
      return (<>Resend in {" "}<span>{minutes}:{seconds}</span></>)
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          code: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string()
            .max(255)
            .min(6, 'Too short - should be 6 chars minimum.')
            .required('The code field is required'),
        })}

        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            let res = await axios.post(
              `auth/verify`,
              { code: parseFloat(_values?.code), phone_number: props?.userEmail },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'accessToken'
                  )}`
                },
              },
            );
            resetForm();

            var inFifteenMinutes = new Date(new Date().getTime() + Number(ACCESS_TOKEN_EXPIRATION));

            var inTwoMinutes = new Date(new Date().getTime() + Number(REFRESH_TOKEN_EXPIRATION));

            Cookies.set(
              'accessToken',
              res?.data?.data?.tokens?.accessToken,
              { expires: inFifteenMinutes, path: '/' }
            )

            Cookies.set(
              'refreshToken',
              res?.data?.data?.tokens?.refreshToken,
              { expires: inTwoMinutes, path: '/' }
            )
            setStatus({ success: true });
            dispatch(resetMyProfile())
            dispatch(setAuthState(true))
            dispatch(setVerifyState(false))
            dispatch(setOpenModal(false));
            toast.success("You have been registered successfully");
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            if (err?.response?.data?.message) {
              toast.error(err?.response?.data?.message)
              setErrors({ submit: err?.response?.data?.message });
            }
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <SimpleTypography
                  className="modal__title"
                  variant="h6"

                  text="Verify your email"
                />
                <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                  <SimpleTypography
                    className="modal__sub-title"
                    variant="h6"

                    text={`We’ve sent 6-digit verification code to ${props?.userEmail}`}
                  />
                </Grid>

                <EmailInputAdornments
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                  name="code"
                  type="code"
                  label="Verification code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.code}
                  placeholderText='******'
                />
                <Grid sx={{ display: 'flex', alignItems: "center" }}>
                  <Button
                    sx={{ transform: 'rotate(180deg)', padding: 1 }}
                    onClick={() => {
                      dispatch(setSignupState(true))
                      dispatch(setVerifyState(false))
                    }}
                  >
                    <ForwardIcon sx={{ marginLeft: '10px' }} />
                  </Button>
                  <Typography>
                    <Countdown
                      date={Date.now() + 75000}
                      renderer={Renderer}
                    />
                  </Typography>
                </Grid>
                <Buttons
                  type="submit"
                  name="Sign in"
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                />
              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}