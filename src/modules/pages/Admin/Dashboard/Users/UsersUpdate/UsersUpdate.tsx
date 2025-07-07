import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider,
  Fade,
} from "@mui/material";
import { axiosInstance, USERS_URLS } from "../../../../../services/Urls";
import type { UserDataProfile } from "../../../../../../interfaces/Auth/AuthTypes";

export default function UsersUpdate() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserDataProfile>();
  const location = useLocation();
  const id: number = location.state;

  const getUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(USERS_URLS.GET_CURRENT_USER(id));
      setUser(response?.data?.data?.user);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#f3f6f9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      {loading ? (
        <CircularProgress size={40} />
      ) : user ? (
        <Fade in timeout={500}>
          <Card
            elevation={4}
            sx={{
              width: "100%",
              maxWidth: 450,
              borderRadius: 4,
              p: 3,
              background: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Avatar
                  src={user.profileImage ?? ""}
                  alt={user.userName}
                  sx={{
                    width: 120,
                    height: 120,
                    boxShadow: 3,
                    border: "3px solid white",
                  }}
                />
                <Typography variant="h5" fontWeight="bold">
                  {user.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Divider sx={{ width: "100%", my: 2 }} />
                <Box textAlign="left" width="100%" display="flex" flexDirection="column" gap={1}>
                  <Typography variant="body1">
                    <strong>Country:</strong> {user.country}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Created At:</strong>{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Updated At:</strong>{" "}
                    {new Date(user.updatedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      ) : (
        <Typography color="error">User not found.</Typography>
      )}
    </Box>
  );
}


