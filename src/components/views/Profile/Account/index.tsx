import { Box, styled } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import SimpleTypography from "../../../Typography";
import { selectUserProfile } from '../../../../data/get_profile'
import Skeleton from '@mui/material/Skeleton';
import Buttons from "../../../Buttons";
import { setOpenEditModal } from "../../../../data/modal_checker";

const AccountBox = styled(Box)(
  ({ theme }) => `
        max-width: 100%;
        height: 236px;
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 20px;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `
);

function Account() {
  const myAccount = useSelector(selectUserProfile);
  const myAccountStatus = useSelector((state: any) => state?.get_profile?.status)
  console.log(myAccountStatus, "myAccountStatus")
  const dispatch = useDispatch()

  if (myAccountStatus === "succeeded") {
    return (
      <AccountBox sx={{ position: "relative" }}>
        <Buttons
          onClick={() => {
            if (myAccountStatus === "succeeded") {
              dispatch(setOpenEditModal(true))
            }
          }
          }
          className="edit__account--btn"
          name=""
        >
          <Image
            width="18px"
            height="18px"
            alt='user-edit-icon'
            src="/icons/edit-icon.svg"
          />
          <SimpleTypography className="edit__account--text" text="edit" />
        </Buttons>
        <Image
          width="128px"
          height="128px"
          alt='user icon'
          src="/img/default__user.svg"
        />
        <SimpleTypography text={myAccount?.user?.full_name} className="user__name" />
        <SimpleTypography text={myAccount?.user?.phone_number} className="user__email" />
      </AccountBox>
    )
  } else if (myAccountStatus === "failed") {
    return (
      <>Network error</>
    )
  } else {
    return (
      <AccountBox>
        <Image
          width="128px"
          height="128px"
          alt='user icon'
          src="/img/default__user.svg"
        />
        {/* <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} /> */}
      </AccountBox>
    )
  }
}

export default Account;
