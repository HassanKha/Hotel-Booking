import { useCallback, useMemo, useState } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useThemeContext } from "../../../contexts/ThemeContext";
import {
  DarkModeIcon,
  LightModeIcon,
} from "../../../assets/Dashboard/NavbarIcons";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useThemeContext();
  const { t } = useTranslation();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const toggleDrawer = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const toggleLanguage = useCallback(() => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  }, []);

  const navLinks = useMemo(
    () =>
      isAuthenticated
        ? [
            { label: t("navbar.home"), href: "landing" },
            { label: t("navbar.explore"), href: "Explore" },
            { label: t("navbar.favorites"), href: "Favorites" },
            { label: t("navbar.my-bookings"), href: "my-bookings" },
          ]
        : [
            { label: t("navbar.home"), href: "landing" },
            { label: t("navbar.explore"), href: "Explore" },
          ],
    [isAuthenticated, t]
  );

  const NavButton = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Button
      component={NavLink}
      to={to}
      end
      sx={{
        px: 0,
        color: theme.palette.text.primary,
        fontWeight: 500,
        textTransform: "none",
        "&:hover": { color: theme.palette.primary.main },
        "&.active": { color: theme.palette.primary.main },
      }}
    >
      {children}
    </Button>
  );

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
      aria-label="Mobile navigation menu"
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={toggleDrawer} aria-label="Close navigation">
          <CloseIcon />
        </IconButton>
      </Box>

      <List
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {navLinks.map((item) => (
          <ListItem key={item.href} disablePadding>
            <NavButton to={item.href}>{item.label}</NavButton>
          </ListItem>
        ))}
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            onClick={toggleDarkMode}
            variant="outlined"
            startIcon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            sx={{ textTransform: "none", color: darkMode ? "white" : "black" }}
          >
            {darkMode ? t("navbar.lightMode") : t("navbar.darkMode")}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={toggleLanguage}
            sx={{ textTransform: "none", color: darkMode ? "white" : "black" }}
          >
            {i18n.language === "ar" ? "English" : "العربية"}
          </Button>
        </Box>
      </List>

      <Divider />

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {!isAuthenticated ? (
          <>
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
              }}
            >
              {t("navbar.register")}
            </Button>
            <Button
              component={NavLink}
              to="/login"
              variant="contained"
              fullWidth
              onClick={toggleDrawer}
              sx={{ textTransform: "none" }}
            >
              {t("navbar.loginNow")}
            </Button>
          </>
        ) : (
          <Button
            onClick={handleLogout}
            variant="outlined"
            fullWidth
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              textTransform: "none",
            }}
          >
            {t("navbar.logout")}
          </Button>
        )}
      </Box>
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
          <Typography variant="h1" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
            <Box component="span" color="primary.main">
              Stay
            </Box>
            <Box component="span" color="text.primary">
              cation.
            </Box>
          </Typography>

          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Box sx={{ display: "flex", gap: 3 }}>
                {navLinks.map((item) => (
                  <NavButton key={item.href} to={item.href}>
                    {item.label}
                  </NavButton>
                ))}
              </Box>
              <IconButton
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                sx={{ color: darkMode ? "white" : "black" }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton
                onClick={toggleLanguage}
                aria-label="Toggle language"
                sx={{ color: darkMode ? "white" : "black" }}
              >
                {i18n.language === "ar" ? "English" : "العربية"}
              </IconButton>
              {!isAuthenticated ? (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    component={NavLink}
                    to="/register"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                    }}
                  >
                    Register
                  </Button>
                  <Button
                    component={NavLink}
                    to="/login"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                  >
                    Login&nbsp;Now
                  </Button>
                </Box>
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{ textTransform: "none", color: "white" }}
                >
                  {t("navbar.logout")}
                </Button>
              )}
            </Box>
          ) : (
            <IconButton
              onClick={toggleDrawer}
              aria-label="Open mobile navigation"
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
