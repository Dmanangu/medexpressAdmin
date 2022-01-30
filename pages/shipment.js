import React, { useState } from "react";
import Layout from "component/Layout";
import {
  Button,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import "firebase/compat/firestore";
import { postToJSON, firestore } from "../lib/firebase";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("shippingAddress");

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  //   console.log("AAAAAAAAAAAAAAAAAAAa");
  //   console.log(posts);
  //   console.log("AAAAAAAAAAAAAAAAAAAa");

  return {
    props: { posts }, // will be passed to the page component as props
  };
}
export default function Shipment(props) {
  const [posts, setPosts] = useState(props.posts);
  const shippingClient = posts.filter((shippingAddress) => {
    return shippingAddress.status.toLowerCase().includes("not delivered");
  });
  const router = useRouter();
  const shipmentHandler = (e) => {
    try {
      firestore
        .collection("shippingAddress")
        .doc(e)
        .update({
          status: "out for delivery",
        })
        .then(alert("The User's medicine is now successfully delivered"));
      router.push("/shipment");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <Layout>
      <div style={{ marginTop: 60 }}>
        <Paper style={{ maxHeight: 600, overflow: "auto" }}>
          <Table>
            <TableRow>
              <TableCell>
                <Typography>Full Name</Typography>
              </TableCell>
              <TableCell>
                <Typography>Email</Typography>
              </TableCell>
              <TableCell>
                <Typography>Phone</Typography>
              </TableCell>
              <TableCell>
                <Typography>Address</Typography>
              </TableCell>
              <TableCell>
                <Typography>Shipment Status</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Action</Typography>
              </TableCell>
            </TableRow>
            {shippingClient.map((ship) => (
              <TableRow key={ship.id}>
                <TableCell>
                  <Typography>{ship.fullName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ship.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ship.phone}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {ship.address},{ship.barangay}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ship.status}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => shipmentHandler(ship.id)}
                  >
                    Deliver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Paper>
      </div>
    </Layout>
  );
}
