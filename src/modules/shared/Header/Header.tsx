import { Box, Typography, Button, Stack } from "@mui/material";

type HeaderProps = {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function Header({
  title,
  description,
  buttonText,
  onButtonClick,
}: HeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={2}
      mb={3}
    >
      <Box>
        <Typography variant="h5" color="#1F263E" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="#323C47">
          {description}
        </Typography>
      </Box>

      {buttonText && (
        <Button
          variant="contained"
          disableElevation
          sx={{
            fontWeight: "600",
            marginRight: "100px",
            padding: "10px 40px",
            textTransform: "none",
            backgroundColor: "#203FC7",
            "&:hover": { backgroundColor: "#1a33a5" },
          }}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </Stack>
  );
}
