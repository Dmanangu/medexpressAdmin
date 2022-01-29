import React from "react";
import Layout from "component/Layout";
import {
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

//

export default function Orders() {
  return (
    <Layout>
      <div style={{ marginTop: 60 }}>
        <Paper style={{ maxHeight: 300, overflow: "auto" }}>
          <Table>
            <TableRow>
              <TableCell>
                <Typography variant="h5">
                  <b>Orders</b>
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">
                  <b>Customer</b>
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h5">
                  <b>Sales</b>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </Table>
        </Paper>
        <Paper style={{ maxHeight: 300, overflow: "auto" }}>
          <Table>
            <TableRow>
              <Typography variant="h5">Recent Orders</Typography>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>FullName</Typography>
              </TableCell>
              <TableCell>
                <Typography>Phone Number</Typography>
              </TableCell>
              <TableCell>
                <Typography>Email</Typography>
              </TableCell>
              <TableCell>
                <Typography>Complete Address</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Action</Typography>
              </TableCell>
            </TableRow>
            <TableRow></TableRow>
          </Table>
        </Paper>
      </div>
    </Layout>
  );
}
