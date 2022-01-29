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

//

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("orders");
  const postsQuery2 = firestore.collectionGroup("shippingAddress");
  const postsQuery3 = firestore.collectionGroup("users");

  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  const posts2 = (await postsQuery2.get()).docs.map(postToJSON);
  const posts3 = (await postsQuery3.get()).docs.map(postToJSON);
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  // console.log(posts);
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  return {
    props: { posts, posts2, posts3 }, // will be passed to the page component as props
  };
}

export default function Orders(props) {
  const [posts, setPosts] = useState(props.posts);
  const [posts2, setPosts2] = useState(props.posts2);
  const [posts3, setPosts3] = useState(props.posts3);

  const userCount = posts.filter((users) => {
    return users;
  });

  const recentOrders = posts.filter((orders) => {
    return orders;
  });

  const shippingClient = posts2.filter((shippingAddress) => {
    return shippingAddress;
  });

  var totalPrice = 0;

  recentOrders.map((total) => (totalPrice += total.totalPrice));

  const router = useRouter();
  const deleteHandler = (e) => {
    try {
      firestore
        .collection("shippingAddress")
        .doc(e)
        .delete()
        .then(alert("This user address is now deleted"));
      router.push("/orders");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
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
              <TableCell>
                <Typography variant="h5">{recentOrders.length}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">{userCount.length}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h5">₱{totalPrice}</Typography>
              </TableCell>
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
            {shippingClient.map((ships) => (
              <TableRow key={ships.id}>
                <TableCell>
                  <Typography>{ships.fullName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ships.phone}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ships.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {ships.address},{ships.barangay}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => deleteHandler(ships.id)}
                  >
                    Delete
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
