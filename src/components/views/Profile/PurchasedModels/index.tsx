import { Box, styled } from "@mui/material";
import SimpleTypography from "../../../Typography";

const PurchasedModelsBox = styled(Box)(
  ({ theme }) => `
        max-width: 100%;
        height: 236px;
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 20px;
    `
);


function PurchasedModels() {
  return (
    <PurchasedModelsBox>
      <SimpleTypography text="Downloaded models" className="user__name" />
    </PurchasedModelsBox>
  )
}

export default PurchasedModels