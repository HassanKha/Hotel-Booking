import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  AdsIcon,
  BookingsIcon,
  FacilitiesIcon,
  HomeIcon,
  LogoutIcon,
  MenuIcon,
  PasswordIcon,
  RoomsIcon,
  UsersIcon,
} from "../../../assets/Dashboard/SideBarIcons";
import type { ListItemButtonProps } from "@mui/material";
import type { SidebarProps } from "../../../interfaces/MasterLayout/Dashboard";
const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 64;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    boxSizing: "border-box",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
}));

const StyledListItemButton = styled(ListItemButton)<ListItemButtonProps>(() => ({
  margin: "4px 8px",
  borderRadius: "8px",
  minHeight: 48,
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
  },
}));

const ToggleButton = styled(IconButton)(() => ({
  position: "absolute",
  top: 16,
  right: 8,
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));


const menuItems = [
  { id: "dashboard", label: "Home", icon: HomeIcon },
  { id: "users", label: "Users", icon: UsersIcon },
  { id: "rooms", label: "Rooms", icon: RoomsIcon },
  { id: "ads", label: "Ads", icon: AdsIcon },
  { id: "bookings", label: "Bookings", icon: BookingsIcon },
  { id: "facilities", label: "Facilities", icon: FacilitiesIcon },
  { id: "change-password", label: "Change password", icon: PasswordIcon },
  { id: "logout", label: "Logout", icon: LogoutIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  collapsed,
  onToggle,
  onClose,
  selectedItem,
  onItemSelect,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
const location = useLocation();
const currentPath = location.pathname;

console.log(currentPath)
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const sidebarContent = (
    <Box
      component="nav"
      aria-label="Sidebar navigation"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {!isMobile && (
        <ToggleButton
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          size="small"
        >
          <MenuIcon />
        </ToggleButton>
      )}

      <Box sx={{ mt: isMobile ? 2 : 7 }}>
        <List component="ul" aria-label="Navigation menu">
          {menuItems.map((item) => {
            const IconComponent = item.icon;

            if (item.id === "logout") {
              return (
                <React.Fragment key={item.id}>
                  <Divider
                    sx={{ my: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  />
                  <ListItem disablePadding>
                    <Tooltip
                      title={collapsed && !isMobile ? item.label : ""}
                      placement="right"
                      arrow
                    >
                      <StyledListItemButton
                        onClick={handleLogout}
                        role="menuitem"
                        sx={{
                          px: collapsed && !isMobile ? 2.5 : 3,
                          justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: "inherit",
                            minWidth: collapsed && !isMobile ? "auto" : 40,
                            mr: collapsed && !isMobile ? 0 : 1,
                          }}
                        >
                          <IconComponent />
                        </ListItemIcon>
                        {(!collapsed || isMobile) && (
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: "0.95rem",
                              fontWeight: 400,
                            }}
                          />
                        )}
                      </StyledListItemButton>
                    </Tooltip>
                  </ListItem>
                </React.Fragment>
              );
            }

            return (
              <ListItem disablePadding key={item.id}>
                <Tooltip
                  title={collapsed && !isMobile ? item.label : ""}
                  placement="right"
                  arrow
                >
                  <StyledListItemButton
                    component={React.forwardRef(function LinkButton(itemProps) {
                      return <Link  to={`/${item.id}`} {...itemProps} />;
                    })}
                    selected={selectedItem === item.id || currentPath === `/${item.id}` }
                    onClick={() => {
                      onItemSelect(item.id);
                      if (isMobile) onClose();
                    }}
                    aria-current={selectedItem === item.id ? "page" : undefined}
                    role="menuitem"
                    sx={{
                      px: collapsed && !isMobile ? 2.5 : 3,
                      justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                        minWidth: collapsed && !isMobile ? "auto" : 40,
                        mr: collapsed && !isMobile ? 0 : 1,
                      }}
                    >
                      <IconComponent />
                    </ListItemIcon>
                    {(!collapsed || isMobile) && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: "0.95rem",
                          fontWeight: selectedItem === item.id ? 600 : 400,
                        }}
                      />
                    )}
                  </StyledListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            backgroundColor: "#4F46E5",
            color: "white",
            border: "none",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <StyledDrawer variant="permanent" collapsed={collapsed}>
      {sidebarContent}
    </StyledDrawer>
  );
};
