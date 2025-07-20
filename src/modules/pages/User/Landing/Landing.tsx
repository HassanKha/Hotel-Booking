import {
  Typography,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { BookingForm } from "./components/BookingForm";
import AdsCard from "./components/AdsCard";
import LandingBG from "../../../../assets/landing.png";
import CardHome from "../Landing/components/CardHome";
import SliderAds from "./components/SliderAds";

import Feedback from "./components/Feedback";
import { axiosInstance, ROOMS_USERS_URLS } from "../../../services/Urls";
import { toast } from "react-toastify";
import { useEffect, useState, useCallback, useMemo } from "react";
import type { Room } from "../../../../interfaces/Shared/Shared";
import { useThemeContext } from "../../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { darkMode } = useThemeContext();
  const { t } = useTranslation();

  const getAllRooms = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `${ROOMS_USERS_URLS.GET_USERS_ROOMS(null, null)}?page=1&size=10`
      );
      setRooms(res.data.data.rooms);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error fetching rooms");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllRooms();
  }, [getAllRooms]);

  const headingSplit = useMemo(() => {
    const title = t("landing.title");
    const highlight = t("landing.highlight");
    return title.split(highlight);
  }, [t]);

  return (
    <>
      <Box
        sx={{ minHeight: "100vh", bgcolor: "background.default" }}
        component="section"
        aria-label="landing-intro"
      >
        <main>
          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  textAlign: { xs: "center", md: "left" },
                  fontWeight: "900",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    mb: 2,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    color: darkMode ? "white" : "#152C5B",
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: "900",
                  }}
                >
                  {headingSplit[0]}
                  <Box
                    component="span"
                    sx={{ color: darkMode ? "white" : "#152C5B", fontWeight: "900" }}
                  >
                    {t("landing.highlight")}
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: darkMode ? "white" : "text.secondary",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                  }}
                >
                  {t("landing.description")}
                </Typography>

                <BookingForm />
              </Box>

              <Box
                sx={{
                  flex: downMd ? "0 0 auto" : 1,
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "10%",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "100%", sm: 380 },
                    borderRadius: 3,
                    overflow: "visible",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: "inherit",
                      backgroundColor: "#fff",
                      border: "2px solid",
                      borderColor: "#E5E5E5",
                      transform: "translate(24px, 24px)",
                      zIndex: 0,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={LandingBG}
                    alt={t("landing.imageAlt", "A scenic view of hotel resort")} // accessibility
                    loading="lazy"
                    width="100%"
                    height="auto"
                    sx={{
                      display: "block",
                      borderRadius: "inherit",
                      objectFit: "cover",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Container>
        </main>
      </Box>

      {/* SEO and UX enhancements: pass loading state */}
      <AdsCard rooms={rooms} />
      <CardHome />
      <SliderAds rooms={rooms} loading={loading} />
      <Feedback />
    </>
  );
}
