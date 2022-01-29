import Head from "next/head";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from "next/link";

function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      {/* <Head>
        <title>Tech Assist</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <div className={classes.grow}></div>
          <div>
            <NextLink href="/clients" passHref>
              <Link className={classes.brand}>CLIENTS</Link>
            </NextLink>
            <NextLink href="/worker" passHref>
              <Link className={classes.brand}>WORKER</Link>
            </NextLink>
            <NextLink href="/payments" passHref>
              <Link className={classes.brand}>PAYMENTS</Link>
            </NextLink>
            <NextLink href="/support" passHref>
              <Link className={classes.brand}>SUPPORT</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar> */}
      <Container className={classes.main}>{children}</Container>
      {/* <footer className={classes.footer}>
        <Typography>All rights reserved. TechAssist 2021-2022.</Typography>
      </footer> */}
    </div>
  );
}

export default Layout;
