import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";
import useStyles from "../utils/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
//

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);
  const classes = useStyles();
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
    // <nav className="navbar navbar-expand navbar-dark bg-dark">
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h4">Admin Dashboard</Typography>
        {/* <div className="navbar-nav"> */}
        <div className={classes.grow}></div>
        <div>
          <NavLink href="/orders" className={classes.brand}>
            ORDERS
          </NavLink>
          <NavLink href="/support" className={classes.brand}>
            SETTINGS
          </NavLink>
        </div>
        {/* </div> */}
      </Toolbar>
    </AppBar>
    // </nav>
  );
}
