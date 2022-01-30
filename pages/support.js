import {
  Card,
  Divider,
  Link,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import Layout from "../component/Layout";
import NextLink from "next/link";
import useStyles from "../utils/styles";

import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";

export default function Support() {
  const classes = useStyles();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;

  return (
    <Layout>
      <div style={{ marginTop: 60 }}>
        <Card>
          <MenuList dense>
            <Typography variant="h2" className={classes.center}>
              SETTINGS
            </Typography>
            <Divider />
            <MenuItem>
              <a onClick={logout} className="nav-item nav-link">
                <Typography variant="h4">LOGOUT</Typography>
              </a>
            </MenuItem>
          </MenuList>
        </Card>
      </div>
    </Layout>
  );
}
