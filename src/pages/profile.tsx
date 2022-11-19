import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile, getProfile } from '../data/get_profile';
import ProfilePage from '../components/screens/Profile'
import Header from '../components/views/Header'
import Navbar from '../components/views/Navbar'
import Footer from '../components/views/Footer'

const Profile: React.FC = () => {
  const dispatch = useDispatch<any>();
  const get_profile_status = useSelector((state: any) => state?.get_profile?.status);
  React.useEffect(() => {
    if (get_profile_status === "idle") {
      dispatch(getProfile());
    }
  }, [get_profile_status, dispatch]);
  return (
    <>
      <>
        <Header />
      </>

      <ProfilePage />

      <>
        <Footer />
      </>
    </>
  )
}

export default Profile