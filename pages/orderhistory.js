import React, { useState } from "react";
import Layout from "component/Layout";
import {
  Button,
  Paper,
  Tab,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import "firebase/compat/firestore";
import { postToJSON, firestore } from "../lib/firebase";
// import { useRouter } from "next/router";

//

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("orders");

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  //   console.log("AAAAAAAAAAAAAAAAAAAa");
  //   console.log(posts);
  //   console.log("AAAAAAAAAAAAAAAAAAAa");

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function OrderHistory(props) {
  const [posts, setPosts] = useState(props.posts);
  const orderClient = posts.filter((orders) => {
    return orders.status.toLowerCase().includes("paid");
  });
  //   const router = useRouter();
  //   const paymentHandler = (e) => {
  //     try {
  //       firestore
  //         .collection("orders")
  //         .doc(e)
  //         .update({
  //           status: "paid",
  //         })
  //         .then(alert("The order is now paid."));
  //       router.push("/payment");
  //     } catch (error) {
  //       console.log(error);
  //       alert(error);
  //     }
  //   };
  return (
    <Layout>
      <div style={{ marginTop: 60 }}>
        <Paper style={{ maxHeight: 600, overflow: "auto" }}>
          <Table>
            <TableRow>
              <TableCell>
                <Typography>Order Id</Typography>
              </TableCell>
              <TableCell>
                <Typography>User Id</Typography>
              </TableCell>
              <TableCell>
                <Typography>Payment Method</Typography>
              </TableCell>
              <TableCell>
                <Typography>Total Cost</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Payment Status</Typography>
              </TableCell>
            </TableRow>
            {orderClient.map((userOrder) => (
              <TableRow>
                <TableCell>
                  <Typography>{userOrder.id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{userOrder.user_id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{userOrder.paymentMethod}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>₱{userOrder.totalPrice}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{userOrder.status}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Paper>
      </div>
    </Layout>
  );
}
