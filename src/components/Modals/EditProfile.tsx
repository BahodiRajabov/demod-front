import { Box, styled, Modal } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import axios from '../../utils/axios'
import SimpleTypography from "../Typography";
import Buttons from "../Buttons";
import { ThemeProps } from "../../types/ThemeTypes";
import { useState } from "react";
import SimpleInp from "../Inputs/SimpleInp";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile, resetMyProfile } from "../../data/get_profile";
import { setOpenEditModal } from "../../data/modal_checker";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

const EditProfileModal = styled(Box)(
  ({ theme }: ThemeProps) => `
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width: 400px;
    background: #fff;
    padding: 28px 32px;
    outline:none
  `
);

function EditProfile() {
  const modalChecker = useSelector((state: any) => state.modal_checker.isEditModalOpen)
  const dispatch = useDispatch()
  const userData = useSelector(selectUserProfile);
  const userDataStatus = useSelector((state: any) => state?.get_profile?.status);
  const handleOpen = () => dispatch(setOpenEditModal(true));
  const handleClose = () => dispatch(setOpenEditModal(false));
  console.log(userData, "userDatauserData")
  if (userDataStatus === "succeeded") {
    return (
      <Modal
        open={modalChecker}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Formik
          initialValues={{
            email: userData.user.email,
            full_name: userData.user.full_name,
            submit: null
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .max(255)
              .email('Not a proper email')
              .required('The email field is required'),
            full_name: Yup.string()
              .required('No name provided.')
              .max(255)
            // .min(6, 'Password is too short - should be 6 chars minimum.')
            // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
          })}
          onSubmit={
            async (_values, { resetForm, setErrors, setStatus, setSubmitting }) => {
              try {
                console.log(_values, "_values")
                let res = await axios.put(
                  `users/profile`,
                  { email: _values.email, full_name: _values.full_name },
                  {
                    headers: {
                      Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                  }
                );
                resetForm();
                dispatch(resetMyProfile())
                toast.success("You have successfully updated your profile.");
                setStatus({ success: true });
                handleClose()
                setSubmitting(false);
              } catch (err: any) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                toast.error(err?.response?.data?.message);
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
              <EditProfileModal>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "30px"
                  }}>
                  <SimpleTypography
                    text="Edit profile"
                    className="modal__title"
                  />
                  <CloseIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleClose}
                  />
                </Box>
                {/* <Box sx={{marginBottom:"26px", display:"flex",alignItems:"center",paddingBottom:"26px",borderBottom: "1px solid #b3b3b3"}}>
                    <Box sx={{borderRadius:"50%",width:"88px",height:"88px",overflow:"hidden",marginRight:"20px"}}>
                        <Image 
                            src="/img/default__user.svg" 
                            width={88}
                            height={88}
                            alt="user-img"
                        ></Image>
                    </Box>
                    <Buttons className="upload__img--btn" name="Upload photo">
                    
                        <Image 
                            src="/icons/upload-icon.svg" 
                            width={16}
                            height={17}
                            alt="user-img"
                            style={{marginRight:"6px"}}
                        ></Image>
                    </Buttons>
                </Box> */}
                <Box >
                  <Box sx={{ display: "flex", marginBottom: "26px" }}>
                    <Box sx={{ width: "100%" }}>
                      <SimpleInp
                        //  helperText={"salom"}
                        error={Boolean(touched.full_name && errors.full_name)}
                        helperText={touched.full_name && errors.full_name}
                        name="full_name"
                        type="text"
                        label='First name'
                        // autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.full_name}
                        placeholderText='Enter your first name'
                      />
                    </Box>
                    {/* <Box sx={{ paddingLeft: "9px" }}>
                                        <SimpleInp
                                            //  helperText={"salom"}
                                            name="Surname"
                                            type="text"
                                            label='Surname'
                                            autoComplete="off"
                                            //  onBlur={handleBlur}
                                            //  onChange={handleChange}
                                            value=""
                                            placeholderText='Enter your surname'
                                        />
                                    </Box> */}

                  </Box>
                  <Box sx={{ marginBottom: "26px" }}>
                    <SimpleInp
                      //  helperText={"salom"}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      name="email"
                      type="email"
                      label='Email'
                      // autoComplete="off"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                      //  onChange={handleChange}
                      placeholderText='bendover1977@gmail.com'
                    />
                  </Box>

                  <Buttons
                    className="profile__done--btn"
                    name="Done"
                    type="submit"
                    startIcon={isSubmitting}
                    disabled={Boolean(errors.submit) || isSubmitting}
                  />
                </Box>


              </EditProfileModal>
            </form>
          )}
        </Formik>
      </Modal>
    )
  } else {
    return (
      <>{null}</>
    )
  }
}
export default EditProfile
