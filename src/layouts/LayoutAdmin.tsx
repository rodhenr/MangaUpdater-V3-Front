import { Home, ListAlt, MenuBook, Queue } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, Outlet } from "react-router";
import "./LayoutAdmin.scss";

const LayoutAdmin = () => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <List>
          <ListItem component={Link} to="/admin">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/admin/queue">
            <ListItemIcon>
              <Queue />
            </ListItemIcon>
            <ListItemText primary="Queue" />
          </ListItem>
          <ListItem component={Link} to="/admin/logs">
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItem>
          <ListItem component={Link} to="/admin/manga">
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="Manga" />
          </ListItem>
          <ListItem component={Link} to="/admin/source">
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="Source" />
          </ListItem>
          <ListItem component={Link} to="/admin/mangasource">
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

export default LayoutAdmin;
