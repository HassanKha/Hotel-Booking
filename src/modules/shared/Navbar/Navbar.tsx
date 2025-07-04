import type React from "react"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import { MenuIcon } from "../../../assets/Dashboard/SideBarIcons"
import { ExpandMoreIcon, NotificationIcon, SearchIcon } from "../../../assets/Dashboard/NavbarIcons"
import { useNavigate } from "react-router-dom"
import type { NavbarProps } from "../../../interfaces/MasterLayout/Dashboard"
import { useAuth } from "../../../contexts/AuthContext"



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: typeof theme.shape.borderRadius === "number"
    ? theme.shape.borderRadius * 3
    : 12,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.common.white, 0.7),
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}))

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "sidebarWidth",
})<{ sidebarWidth: number }>(({ theme, sidebarWidth }) => ({
  backgroundColor: "#F8F9FB",
  color: theme.palette.text.primary,
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  zIndex: theme.zIndex.drawer - 1,
  marginLeft: sidebarWidth,
  width: `calc(100% - ${sidebarWidth}px)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    width: "100%",
  },
}))


export const Navbar: React.FC<NavbarProps> = ({ sidebarWidth, onMobileMenuClick }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const {   logout} = useAuth();
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Search:", searchValue)
  }

   const handleLogout = () => {

logout();
 setAnchorEl(null)
    navigate("/login")
  }

  return (
    <StyledAppBar position="fixed" sidebarWidth={isMobile ? 0 : sidebarWidth}>
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={onMobileMenuClick} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", backgroundColor:"#ffff", borderRadius: "2rem", }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearchSubmit} style={{ width: "100%" }}>
              <StyledInputBase
                placeholder="Search Here"
                inputProps={{
                  "aria-label": "search",
                  value: searchValue,
                  onChange: handleSearchChange,
                }}
              />
            </form>
          </Search>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
       
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.black, 0.04),
              },
            }}
            onClick={handleProfileMenuOpen}
            role="button"
            aria-label="Account menu"
            aria-expanded={Boolean(anchorEl)}
            aria-haspopup="true"
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mr: 1,
                backgroundColor: "#D4A574",
              }}
              alt="User Avatar"
              src="/placeholder.svg?height=32&width=32"
            />
            {!isMobile && (
              <>
                <Typography variant="body2" sx={{ mr: 0.5, fontWeight: 500 }}>
                  Upskilling
                </Typography>
                <ExpandMoreIcon />
              </>
            )}
          </Box>
             <IconButton size="large" aria-label="show notifications" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationIcon />
            </Badge>
          </IconButton>

        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              minWidth: 180,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  )
}
