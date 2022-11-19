import { Grid, Box } from '@mui/material'
import SimpleTypography from '../../Typography'
import AccountDetails from './Account'
import BillingInfo from './BillingInfo'
import PurchasedModels from './PurchasedModels'

const Profile__header = () => {

  return (
    <Box >
      <SimpleTypography text='My account' className="account__title" />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <AccountDetails />
        </Grid>
        <Grid item xs={8}>
          <PurchasedModels />
        </Grid>
        {/* <Grid item xs={4}>
          <BillingInfo />
        </Grid> */}
      </Grid>



    </Box>
  )
}

export default Profile__header