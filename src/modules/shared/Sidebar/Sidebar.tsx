
import React from "react"
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
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { AdsIcon, BookingsIcon, FacilitiesIcon, HomeIcon, LogoutIcon, MenuIcon, PasswordIcon, RoomsIcon, UsersIcon } from "../../../assets/Dashboard/SideBarIcons"

const SIDEBAR_WIDTH = 240
const SIDEBAR_COLLAPSED_WIDTH = 64

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
}))

const StyledListItemButton = styled(ListItemButton)(() => ({
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
}))

const ToggleButton = styled(IconButton)(() => ({
  position: "absolute",
  top: 16,
  right: 8,
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}))

interface SidebarProps {
  open: boolean
  collapsed: boolean
  onToggle: () => void
  onClose: () => void
  selectedItem: string
  onItemSelect: (item: string) => void
}

const menuItems = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "users", label: "Users", icon: UsersIcon },
  { id: "rooms", label: "Rooms", icon: RoomsIcon },
  { id: "ads", label: "Ads", icon: AdsIcon },
  { id: "bookings", label: "Bookings", icon: BookingsIcon },
  { id: "facilities", label: "Facilities", icon: FacilitiesIcon },
  { id: "password", label: "Change password", icon: PasswordIcon },
  { id: "logout", label: "Logout", icon: LogoutIcon },
]
export const Sidebar: React.FC<SidebarProps> = ({ open, collapsed, onToggle, onClose, selectedItem, onItemSelect }) => {

    const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleItemClick = (itemId: string) => {
    onItemSelect(itemId)
    if (isMobile) {
      onClose()
    }
  }

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {!isMobile && (
        <ToggleButton onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} size="small">
          <MenuIcon />
        </ToggleButton>
      )}

      <Box sx={{ mt: isMobile ? 2 : 7 }}>
        <List component="nav" aria-label="Navigation menu">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            const isLogout = item.id === "logout"

            return (
              <React.Fragment key={item.id}>
                {isLogout && <Divider sx={{ my: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />}
                <ListItem disablePadding>
                  <Tooltip title={collapsed && !isMobile ? item.label : ""} placement="right" arrow>
                    <StyledListItemButton
                      selected={selectedItem === item.id}
                      onClick={() => handleItemClick(item.id)}
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
              </React.Fragment>
            )
          })}
        </List>
      </Box>
    </Box>
  )

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
    )
  }


  return (
     <StyledDrawer variant="permanent" collapsed={collapsed}>
      {sidebarContent}
    </StyledDrawer>
  )
}
