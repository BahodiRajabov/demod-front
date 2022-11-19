import { Box,styled,TableContainer,Table,TableBody,TableRow,TableCell,Paper } from "@mui/material";
import SimpleTypography from "../../../Typography";

const BillingInfoBox = styled(Box)(
    ({ theme }) => `
        max-width: 100%;
        height: 236px;
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 20px;
    `
  );


function BillingInfo() {
  const rows = [
    {
      title:"Country",
      text:"Belarus"
    },
    {
      title:"CIty",
      text:"Minsk"
    },
    {
      title:"Postal code",
      text:"984651"
    },
    {
      title:"Address",
      text:"dolor sit amet ipsum"
    },
  ];

  return (
    <BillingInfoBox>
        <SimpleTypography text="Billing info" className="user__name"/>
        <TableContainer sx={{borderRadius:"0",marginTop:"24px"}} component={Paper}>
          <Table   size="small" aria-label="a dense table">
            <TableBody sx={{borderTop:"1px solid #b3b3b3",borderBottom:"1px solid #b3b3b3"}} >
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }  }}
                >
                  <TableCell sx={{borderColor:" #B3B3B3"}} component="th" scope="row">
                    <SimpleTypography 
                      text={row.title} 
                      className="table__text" 
                    />
                  </TableCell>
                  <TableCell sx={{borderColor:" #B3B3B3"}} align="right">
                    <SimpleTypography 
                      text={row.text} 
                      className="billing__info--text" 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </BillingInfoBox>       
  )
}

export default BillingInfo