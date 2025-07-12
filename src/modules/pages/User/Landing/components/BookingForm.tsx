import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import React from "react";

export const BookingForm = () => {
  const [guests, setGuests] = React.useState(2)
  // const [startDate, setStartDate] = React.useState("20 Jan")
  // const [endDate, setEndDate] = React.useState("22 Jan")

  const handleGuestChange = (increment: boolean) => {
    if (increment) {
      setGuests((prev) => prev + 1)
    } else {
      setGuests((prev) => Math.max(1, prev - 1))
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 500,
        width: "100%",
        p: 3,
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Start Booking Header */}
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "#1e293b",
            fontSize: "1.75rem",
          }}
        >
          Start Booking
        </Typography>

        {/* Pick a Date Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: "#1e293b",
              fontSize: "1.25rem",
            }}
          >
            Pick a Date
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              bgcolor: "#f8fafc",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Calendar Icon */}
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: "#1e293b",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  border: "2px solid white",
                  borderRadius: "4px",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -4,
                    left: 4,
                    right: 4,
                    height: 2,
                    bgcolor: "white",
                    borderRadius: "1px",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 4,
                    left: 2,
                    right: 2,
                    bottom: 2,
                    border: "1px solid white",
                    borderRadius: "2px",
                  },
                }}
              />
            </Box>

            {/* Date Range */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#1e293b",
                fontSize: "1.1rem",
              }}
            >
              {"20 Jan"} - {"26 Jan"}
            </Typography>
          </Box>
        </Box>

        {/* Capacity Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: "#1e293b",
              fontSize: "1.25rem",
            }}
          >
            Capacity
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            {/* Minus Button */}
            <IconButton
              onClick={() => handleGuestChange(false)}
              sx={{
                width: 56,
                height: 56,
                bgcolor: "#ef4444",
                color: "white",
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "#dc2626",
                },
                "&:disabled": {
                  bgcolor: "#fca5a5",
                  color: "white",
                },
              }}
              disabled={guests <= 1}
            >
              <Box
                sx={{
                  width: 20,
                  height: 3,
                  bgcolor: "currentColor",
                  borderRadius: "2px",
                }}
              />
            </IconButton>

            {/* Guest Count */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#1e293b",
                fontSize: "1.1rem",
                minWidth: "100px",
                textAlign: "center",
              }}
            >
              {guests} person{guests !== 1 ? "s" : ""}
            </Typography>

            {/* Plus Button */}
            <IconButton
              onClick={() => handleGuestChange(true)}
              sx={{
                width: 56,
                height: 56,
                bgcolor: "#10b981",
                color: "white",
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "#059669",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 20,
                  height: 20,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 20,
                    height: 3,
                    bgcolor: "currentColor",
                    borderRadius: "2px",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 3,
                    height: 20,
                    bgcolor: "currentColor",
                    borderRadius: "2px",
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>

        {/* Explore Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            py: 2,
            fontSize: "1.1rem",
            fontWeight: 600,
            bgcolor: "#4f46e5",
            borderRadius: "12px",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            "&:hover": {
              bgcolor: "#4338ca",
              boxShadow: "0 6px 16px rgba(79, 70, 229, 0.4)",
            },
          }}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  )
}