import { Box } from '@mui/system'
import React from 'react'
import EditProfile from '../../Modals/EditProfile'
import ProfileHeader from '../../views/Profile'

function ProfilePage() {
  return (
   <section style={{paddingTop:"32px",background:"#fafafa"}}>
      <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto" }}>
        <ProfileHeader />
        <EditProfile />
      </Box>
   </section>
  )
}


export default ProfilePage
