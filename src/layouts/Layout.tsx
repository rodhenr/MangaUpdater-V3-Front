import { Home, ListAlt, MenuBook, Queue } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, Outlet } from "react-router";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/queue">
            <ListItemIcon>
              <Queue />
            </ListItemIcon>
            <ListItemText primary="Queue" />
          </ListItem>
          <ListItem component={Link} to="/logs">
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItem>
          <ListItem component={Link} to="/manga">
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="Manga" />
          </ListItem>
          <ListItem component={Link} to="/source">
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="Source" />
          </ListItem>
          <ListItem component={Link} to="/mangasource">
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="Manga Source" />
          </ListItem>
        </List>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
