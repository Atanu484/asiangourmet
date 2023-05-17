import Drawer from "@material-ui/core/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  drawer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
    display: "block",
    width: "70%",
    boxSizing: "border-box",
  },
}));

export default function CustomDrawer({
  mobileOpen,
  handleDrawerToggle,
  pages,
}: {
  mobileOpen: boolean;
  handleDrawerToggle: any;
  pages: string[];
}) {
  const navigate = useNavigate();
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const classes = useStyles();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        Asian Gourmet
      </Typography>
      <Divider />
      {pages.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate(item.replace(/\s/g, "").toLowerCase())}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );
  return (
    <>
      <Drawer
        classes={{ paper: classes.drawer }}
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}