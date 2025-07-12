import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  useTheme,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {  NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
const { isAuthenticated } = useAuth();

  const toggleDrawer = () => setOpen(!open);

 const NavButton = ({ to, children, ...props }: { to: string; children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Button
      component={NavLink}
      to={to}
      end
      sx={{
        px: 0,
        color: theme.palette.text.primary,
        fontWeight: 500,
        textTransform: "none",
        "&:hover": {
          color: theme.palette.primary.main,
        },
        "&.active": {
          color: theme.palette.primary.main,
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

const navLinks = isAuthenticated
  ? [
      { label: "Home", href: "/landing" },
      { label: "Explore", href: "/landing/Explore" },
      { label: "Favorites", href: "/landing/Favorites" },
    ]
  : [
      { label: "Home", href: "/landing" },
      { label: "Explore", href: "/landing/Explore" },
    ];

  const drawer = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        bgcolor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      {/* close button */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={toggleDrawer} aria-label="Close navigation">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* links */}
      <List sx={{ flexGrow: 1 }}>
        {navLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Button
              fullWidth
              sx={{
                justifyContent: "flex-start",
                color: theme.palette.text.primary,
                fontWeight: 500,
                py: 1.5,
              }}
              onClick={() => {
                /* navigate(item.href) */
                toggleDrawer();
              }}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>

      <Divider />
{!isAuthenticated && (
  <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
    <Button
      component={NavLink}
      to="/register"
      variant="outlined"
      fullWidth
      onClick={toggleDrawer}
      sx={{
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        textTransform: "none",
        "&.active": {
          color: theme.palette.primary.main,
          fontWeight: 600,
        },
      }}
    >
      Register
    </Button>
    <Button
      component={NavLink}
      to="/login"
      variant="contained"
      fullWidth
      onClick={toggleDrawer}
      sx={{
        textTransform: "none",
        "&.active": {
          fontWeight: 600,
        },
      }}
    >
      Login&nbsp;Now
    </Button>
  </Box>
)}

    </Box>
  );

  return (
    <>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          bgcolor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Brand ------------------------------------------------------ */}
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.5rem" }}>
            <Box component="span" sx={{ color: theme.palette.primary.main }}>
              Stay
            </Box>
            <Box component="span" sx={{ color: theme.palette.text.primary }}>
              cation.
            </Box>
          </Typography>

          {/* Desktop nav ------------------------------------------------- */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Box sx={{ display: "flex", gap: 3 }}>
              {navLinks.map((item) => (
     <NavButton key={item.label} to={item.href}>
      {item.label}
    </NavButton>
  ))}
              </Box>

             {!isAuthenticated && (
  <Box sx={{ display: "flex", gap: 2 }}>
    <Button
      component={NavLink}
      to="/register"
      variant="outlined"
      sx={{
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        textTransform: "none",
        "&.active": {
          color: theme.palette.primary.main,
          fontWeight: 600,
        },
      }}
    >
      Register
    </Button>
    <Button
      component={NavLink}
      to="/login"
      variant="contained"
      sx={{
        textTransform: "none",
        "&.active": {
          fontWeight: 600,
        },
      }}
    >
      Login&nbsp;Now
    </Button>
  </Box>
)}
            </Box>
          )}

          {/* Mobile hamburger ------------------------------------------ */}
          {isMobile && (
            <IconButton
              aria-label="Open navigation menu"
              onClick={toggleDrawer}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
