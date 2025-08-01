import {
  Box,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import type { Theme, SxProps } from "@mui/material";
import type { Room } from "../../../../../interfaces/Shared/Shared";
import { useThemeContext } from "../../../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export interface AdsSectionProps {
  heading?: string;
  rooms: Room[];
}

const cardWrapper: SxProps<Theme> = {
  position: "relative",
  borderRadius: 2,
  overflow: "hidden",
  cursor: "pointer",
  height: { xs: 240, md: "100%" },
  transition: "transform .3s, box-shadow .3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -2px rgb(0 0 0 / .05)",
  },
};

const imageSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const AdsSection = ({ rooms }: AdsSectionProps) => {
  const smallAds = rooms?.slice(1, 5); // handle max 4 small ads
  const { t } = useTranslation();
  const { darkMode } = useThemeContext();

  return (
    <Container component="section" maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        component="h2"
        variant="h2"
        sx={{
          mb: 4,
          fontWeight: 600,
          fontSize: { xs: "1.5rem", md: "2rem" },
          color: darkMode ? '#ffffff' : "#1e293b",
        }}
      >
        {t("adsSection.heading")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
          height: { xs: "auto", md: 400 },
        }}
        role="list"
        aria-label="Featured hotel ads"
      >
        {/* Main Featured Ad */}
        <AdCard
          ad={rooms[0]}
          t={t}
          sx={{ flex: "1 1 50%" }}
          large
        />

        {/* Side Ads */}
        <Box
          sx={{
            flex: "1 1 50%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {[0, 1].map((row) => (
            <Box
              key={row}
              sx={{ display: "flex", gap: 3, flex: "1 1 50%" }}
            >
              {smallAds.slice(row * 2, row * 2 + 2).map((ad) => (
                <AdCard key={ad._id} ad={ad} t={t} sx={{ flex: 1 }} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

type AdCardProps = {
  ad: Room;
  large?: boolean;
  sx?: SxProps<Theme>;
  t: (key: string, options?: any) => string;
};

const AdCard: React.FC<AdCardProps> = ({ ad, large, sx, t }) => {
  const imageAlt = ad?.roomNumber || "Hotel room";

  return (
    <Box sx={{ ...cardWrapper, ...sx }} role="listitem" aria-label={`Ad for room ${ad?.roomNumber}`}>
      <Box
        component="img"
        src={ad?.images?.[0] || "/default-room.jpg"}
        alt={imageAlt}
        sx={imageSx}
      />

      <Chip
        label={t("adsSection.perNight", { price: `$${ad?.price}` })}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          bgcolor: "#EC4899",
          color: "white",
          fontWeight: 600,
          fontSize: "0.75rem",
          px: large ? 2 : 1.5,
        }}
      />

      {/* Text overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 100%)",
          p: large ? 3 : 2,
        }}
      >
        <Typography
          component="h3"
          variant={large ? "h5" : "h6"}
          sx={{
            color: "white",
            fontWeight: 600,
            mb: 0.5,
            fontSize: large ? undefined : "1rem",
          }}
        >
          {ad?.roomNumber}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,.9)", fontSize: large ? "1rem" : ".875rem" }}
        >
          {ad?.facilities?.map((f) => f.name).join(", ")}
        </Typography>
      </Box>
    </Box>
  );
};

export default AdsSection;
