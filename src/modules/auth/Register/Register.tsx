import { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";

import {
  EyeIcon,
  EyeOffIcon,
} from "../../../assets/Auth/AuthIcons/Icons";
import { validateAuthForm } from "../../services/Validations";
import "./Register.module.css";
import type { RegisterFormData } from "../../../interfaces/Auth/LoginFormData";
import { toast } from "react-toastify";
import { registerBG } from "@/assets";
import { Link as RouterLink } from "react-router-dom";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    watch,
  } = useForm<RegisterFormData>({
    mode: "onChange",
    defaultValues: {
      username: "",
      phone: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    clearErrors();

    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "validate",
          message: "Passwords do not match",
        });
        return;
      }

      console.log("Register attempt:", data);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", maxHeight: "100vh" }}>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          gap: 5,
          p: { xs: 2, sm: 3, md: 2 },
        }}
      >
        <Box sx={{ mb: { xs: 3, md: 3 }, textAlign: { xs: "center", sm: "left" } }}>
          <Typography variant="h4" sx={{ fontWeight: 500, color: "primary.main" }}>
            <Box component="span" sx={{ color: "secondary.main" }}>Stay</Box>
            cation.
          </Typography>
        </Box>

        <Container maxWidth="sm">
          <Box
            sx={{
              maxWidth: 500,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 500, mb: 2 }}>
              Sign up
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                display: "flex",
                flexDirection: "column",
                fontWeight: 400,
              }}
            >
              If you don't have an account register{" "}
              <Link
                component={RouterLink}
                to="/login"
                color="primary"
                sx={{
                  fontWeight: 400,
                  textDecoration: "none",
                  display: "flex",
                  gap: 1,
                }}
              >
                You can{" "}
                <Box
                  component="span"
                  sx={{ color: "#EB5148", fontWeight: 600 }}
                >
                  Login Here!
                </Box>
              </Link>
            </Typography>


            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {errors.root && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.root.message}
                </Alert>
              )}

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "User Name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="User Name"
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />

                <Grid container spacing={2}>
                  <Grid item size={6}>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Phone Number"
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item size={6}>
                    <Controller
                      name="country"
                      control={control}
                      rules={{ required: "Country is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Country"
                          error={!!errors.country}
                          helperText={errors.country?.message}
                          fullWidth
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Controller
                  name="email"
                  control={control}
                  rules={validateAuthForm.email}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={validateAuthForm.password}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Confirm Password"
                      type={showConfirm ? "text" : "password"}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Button
                  type="submit"
                  fullWidth
                  disabled={!isValid || isLoading}
                  sx={{
                    py: 1.5,
                    fontWeight: 500,
                    backgroundColor: "secondary.main",
                    "&:hover": { backgroundColor: "#1d3ecf" },
                    color: "white",
                  }}
                  style={{ color: "white", fontWeight: 500, fontSize: "17px", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", marginBottom: "15px" }}

                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Signing up...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {!isMobile && (
        <Box
          sx={{
            width: { md: "50%" },
            height: "95.2vh",
            backgroundImage: `url(${registerBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 3,
            mt: 2,
          }}
        />
        
      )}
      
    </Box>
  );
};

export default Register;
