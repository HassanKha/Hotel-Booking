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
import type { RegisterFormData } from "../../../interfaces/Auth/AuthTypes";
import { toast } from "react-toastify";
import registerBg from "../../../assets/Auth/AuthBackGrounds/register.jpg"
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../services/Urls";
import "./Register.module.css";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  let navigate = useNavigate();
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
      userName: "",
      phoneNumber: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: null,
    },

  });
  const appendFormData = (data: any) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("country", data.country);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", "user");


    if (data.profileImage && data.profileImage instanceof File) {
      formData.append("profileImage", data.profileImage);
    }

    return formData;
  }

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    clearErrors();

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "validate",
        message: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }

    try {
      const formData = appendFormData(data);
      const response = await axiosInstance.post(USERS_URLS.REGISTER, formData);
      toast.success(response.data.message || "Account created successfully!");
      navigate("/login");
    } catch (error: any) {

      toast.error(error.response.data.message || "Registration failed. Try again.");
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

              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Controller
                  name="userName"
                  control={control}
                  rules={validateAuthForm.userName}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="User Name"
                      error={!!errors.userName}
                      helperText={errors.userName?.message}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />

                <Grid container spacing={2}>
                  <Grid item size={6}>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={validateAuthForm.phoneNumber}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Phone Number"
                          error={!!errors.phoneNumber}
                          helperText={errors.phoneNumber?.message}
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
                      rules={validateAuthForm.country}
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

                <Controller
                  name="profileImage"
                  control={control}
                  rules={{
                    required: "Profile image is required",
                    validate: {
                      isImageFile: (value) => {
                        if (!value) return "Image is required";
                        return value instanceof File || "Invalid image";
                      },
                    },
                  }}
                  render={({ field }) => (
                    <>
                      {!uploadedImage && (
                        <Button
                          variant="outlined"
                          component="label"
                          sx={{
                            borderStyle: "dashed",
                            borderColor: "#6ad0f8",
                            color: "#2196f3",
                            fontWeight: 600,
                            width: "100%",
                            textTransform: "none",
                          }}
                        >
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setUploadedImage(file);
                                field.onChange(file);
                              }
                            }}
                          />
                        </Button>
                      )}

                      {uploadedImage && (
                        <Box
                          sx={{
                            border: "2px dashed #6ad0f8",
                            backgroundColor: "#e6faff",
                            padding: 2,
                            borderRadius: 2,
                            textAlign: "center",
                            mt: 1,
                          }}
                        >
                          <Typography sx={{ color: "#2196f3", fontWeight: 500 }}>
                            Image uploaded successfully!
                          </Typography>
                          <Button
                            onClick={() => {
                              setUploadedImage(null);
                              field.onChange(null);
                            }}
                            sx={{
                              mt: 1,
                              color: "red",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              fontSize: "14px",
                            }}
                          >
                            REMOVE
                          </Button>
                        </Box>
                      )}

                      {errors.profileImage && (
                        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                          {errors.profileImage.message}
                        </Typography>
                      )}
                    </>
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
className="register-button"
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
            position: "fixed",        
            right: 0,                     
            backgroundImage: `url(${registerBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden",
            borderRadius: 3,
            mt: 2,
            zIndex: 10                 
          }}
        >


          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))",
              display: "flex",
              alignItems: "flex-end",
              p: { md: 4, lg: 6 },
            }}
          >
            <Box sx={{ color: "white" }}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Sign up to Roamhome
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Homes as unique as you.
              </Typography>
            </Box>
          </Box>
        </Box>

      )}

    </Box>
  );
};

export default Register;
