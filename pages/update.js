import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import Layout from "../component/Layout";
import upStyles from "./css/update.module.css";
import { postToJSON, firestore } from "../lib/firebase";
import Image from "next/image";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useRouter } from "next/router";

//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("users");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  // console.log(posts);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}
function DeleteUser(props) {
  const router = useRouter();
  const [posts, setPosts] = useState(props.posts);
  const [filteredPosts, setFilteredPosts] = useState(props.posts);
  const usersClient = posts.filter((users) => {
    return users.status.toLowerCase().includes("not verified");
  });

  const updateHandler = (e) => {
    try {
      firestore
        .collection("users")
        .doc(e)
        .update({
          status: "Verified",
        })
        .then(alert("This User is now Verified"));
      router.push("/update");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const clientSearchHandler = (e) => {
    const searchClient = filteredPosts;

    if (e.target.value.length >= 0 && e.target.value === "") {
      setPosts(filteredPosts);
    } else {
      const filter = usersClient.filter((users) => {
        return users.fullname.toLowerCase().includes(e.target.value);
      });
      setPosts(filter);
    }
  };
  return (
    <Layout>
      <input
        style={{ marginTop: 20, width: 600 }}
        type="search"
        placeholder="Search User Here"
        value={usersClient.users}
        onChange={clientSearchHandler}
      />
      <div className={upStyles.updateContainer}>
        <Paper style={{ maxHeight: 700, overflow: "auto" }}>
          <Grid container spacing={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h4">Image</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Email</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Role</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Status</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h4">Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersClient.map((users) => (
                    <TableRow key={users.id}>
                      <TableCell>
                        <img
                          component="img"
                          src={
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          }
                          height={40}
                          width={40}
                          alt={users.username}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography>{users.fullname}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>{users.email}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>{users.jobdescription}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>{users.status}</Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          // color="success"
                          onClick={() => updateHandler(users.id)}
                        >
                          Verify User
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </div>
    </Layout>
  );
}

export default DeleteUser;
