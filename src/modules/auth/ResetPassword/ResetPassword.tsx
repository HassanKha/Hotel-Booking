// ResetPassword.tsx
import { useState } from "react";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  EyeIcon,
  EyeOffIcon,
} from "../../../assets/Auth/AuthIcons/Icons";
import LoginBG from "../../../assets/Auth/AuthBackGrounds/LoginBG.png";
// import "./Login.module.css";
import { toast } from "react-toastify";

type ResetPasswordFormData = {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
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
  } = useForm<ResetPasswordFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    clearErrors();

    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      console.log("Reset password data:", data);
      toast.success("Password reset successful!");
    } catch (error) {
      toast.error("Something went wrong!");
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
            <Box component="span" sx={{ color: "secondary.main" }}>Stay</Box>cation.
          </Typography>
        </Box>
        <Container maxWidth="sm">
          <Box
            sx={{
              width: "100%",
              marginLeft: { lg: "2rem", md: "0rem" },
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 500, mb: 1 }}>
                Reset Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                If you already have an account register
                    <Link
                  href="/register"
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
                    sx={{ color: "primary.danger", fontWeight: "600" }}
                  >
                    Register Here !
                  </Box>
                </Link>
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {errors.root && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.root.message}
                </Alert>
              )}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {/* Email */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: "16px", color: "#152C5B" }}>
                    Email Address
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        variant="outlined"
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "grey.50",
                          },
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                        InputLabelProps={{
                          shrink: true,
                          sx: { display: "none" },
                        }}
                      />
                    )}
                  />
                </Box>

                {/* OTP */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: "16px", color: "#152C5B" }}>
                    OTP Code
                  </Typography>
                  <Controller
                    name="otp"
                    control={control}
                    rules={{ required: "OTP is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="OTP"
                        error={!!errors.otp}
                        helperText={errors.otp?.message}
                        variant="outlined"
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "grey.50",
                          },
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                        InputLabelProps={{
                          shrink: true,
                          sx: { display: "none" },
                        }}
                      />
                    )}
                  />
                </Box>

                {/* Password */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: "16px", color: "#152C5B" }}>
                    New Password
                  </Typography>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "grey.50",
                          },
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                        InputLabelProps={{ shrink: true, sx: { display: "none" } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>

                {/* Confirm Password */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: "16px", color: "#152C5B" }}>
                    Confirm Password
                  </Typography>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{ required: "Please confirm your password" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Confirm Password"
                        type={showConfirm ? "text" : "password"}
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "grey.50",
                          },
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                        InputLabelProps={{ shrink: true, sx: { display: "none" } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  disabled={!isValid || isLoading}
                  sx={{
                    py: 1.5,
                    fontWeight: 500,
                    backgroundColor: "secondary.main",
                    "&:hover": {
                      backgroundColor: "#1d3ecf",
                    },
                    color: "white",
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Submitting...
                    </>
                  ) : (
                    "Reset Password"
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
            position: "relative",
            backgroundImage: `url(${LoginBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 3,
            overflow: "hidden",
            mt: 2,
          }}
        >
          <img loading="lazy" alt="Reset Password Background" src={LoginBG} />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
              display: "flex",
              alignItems: "flex-end",
              p: { md: 4, lg: 6 },
            }}
          >
            <Box sx={{ color: "white" }}>
              <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { md: "2.5rem", lg: "3rem" } }}>
                Reset your password
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                We'll get you back in
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ResetPassword;


