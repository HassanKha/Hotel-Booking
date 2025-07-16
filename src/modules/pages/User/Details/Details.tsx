import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  CardMedia,
  CircularProgress,
  Rating,
  TextField,
  Button,
  Card,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../../../contexts/AuthContext";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import { axiosInstance } from "../../../services/Urls";

// Room features icons
import bedroomImg from "../../../../assets/bedroom.png";
import livingroomImg from "../../../../assets/livingroom.png";
import bathroomImg from "../../../../assets/bathroom.png";
import diningroomImg from "../../../../assets/diningroom.png";
import wifiImg from "../../../../assets/wifi.png";
import icacImg from "../../../../assets/icac.png";
import refrigeratorImg from "../../../../assets/refrigerator.png";
import tvImg from "../../../../assets/tv.png";

interface Room {
  roomNumber: number;
  price: number;
  discount: number;
  description: string;
  images: string[];
}

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState("");
  const [comment, setComment] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs(),
    dayjs().add(2, "day"),
  ]);

  const getRoomDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `https://upskilling-egypt.com:3000/api/v0/portal/rooms/${id}`
      );
      setRoom(res.data.data.room);
    } catch {
      toast.error("Failed to fetch room");
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async () => {
    try {
      await axiosInstance.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/room-reviews",
        { roomId: id, rating, review }
      );
      toast.success("Rating submitted!");
    } catch {
      toast.error("Failed to submit rating");
    }
  };

  const handleComment = async () => {
    try {
      await axiosInstance.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/room-comments",
        { roomId: id, comment }
      );
      toast.success("Comment submitted!");
    } catch {
      toast.error("Failed to submit comment");
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, [id]);

  const totalDays =
    dateRange[0] && dateRange[1] ? dateRange[1].diff(dateRange[0], "day") : 0;
  const totalPrice = totalDays * (room?.price || 0);

  const handleBookingClick = () => {
    if (!user) {
      setOpenLoginModal(true);
      return;
    }
    console.log("Proceed with booking...");
  };

  if (loading || !room) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        mb={3}
        color="#152C5B"
      >
        Room {room.roomNumber}
      </Typography>

      <CardMedia
        component="img"
        image={room.images?.[0] || "/placeholder-room.jpg"}
        alt={`Room ${room.roomNumber}`}
        sx={{
          borderRadius: 3,
          height: 400,
          objectFit: "cover",
          mb: 6,
          width: "100%",
        }}
      />

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <Box flex={2}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              whiteSpace: "pre-line",
              mb: 4,
              color: "#B0B0B0",
            }}
          >
            {`Minimal techno is a minimalist subgenre of techno music. It is characterized
by a stripped-down aesthetic that exploits the use of repetition and
understated development. Minimal techno is thought to have been
originally developed in the early 1990s by Detroit-based producers Robert
Hood and Daniel Bell.

Such trends saw the demise of the soul-infused techno that typified the
original Detroit sound. Robert Hood has noted that he and Daniel Bell both
realized something was missing from techno in the post-rave era.

Design is a plan or specification for the construction of an object or system
or for the implementation of an activity or process, or the result of that plan
or specification in the form of a prototype, product or process. The national
agency for design: enabling Singapore to use design for economic growth
and to make lives better.`}
          </Typography>

          <Grid container spacing={2} mb={4}>
            {[
              { icon: bedroomImg, text: "5 bedroom" },
              { icon: livingroomImg, text: "1 living room" },
              { icon: bathroomImg, text: "3 bathroom" },
              { icon: diningroomImg, text: "1 dining room" },
              { icon: wifiImg, text: "10 mbp/s" },
              { icon: icacImg, text: "7 unit ready" },
              { icon: refrigeratorImg, text: "2 refrigerator" },
              { icon: tvImg, text: "4 television" },
            ].map((feature, index) => {
              const match = feature.text.match(/^(\d+)\s(.+)$/);
              const number = match?.[1] || "";
              const label = match?.[2] || feature.text;

              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                  >
                    <img
                      src={feature.icon}
                      alt={feature.text}
                      style={{
                        width: 40,
                        height: 40,
                        marginBottom: 8,
                        objectFit: "contain",
                      }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      <Box component="span" color="#152C5B">
                        {number}
                      </Box>{" "}
                      <Box component="span" color="#B0B0B0">
                        {label}
                      </Box>
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box flex={1}>
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: 1,
              position: "sticky",
              top: 20,
              backgroundColor: "#fff",
              minHeight: "500px",
            }}
          >
            <Typography fontWeight="bold" sx={{ mb: 3, py: 1 }}>
              Start Booking
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold">
                <span style={{ color: "green" }}>${room.price}</span> per night
              </Typography>
              <Typography color="error" fontWeight="bold">
                Discount {room.discount}% Off
              </Typography>
            </Box>

            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Pick a Date
            </Typography>

            <DateRangePicker
              localeText={{ start: "Start date", end: "End date" }}
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
            />

            <Typography variant="body1" mt={3} mb={3} fontWeight="medium">
              {totalDays > 0 ? (
                <>
                  <Box component="span" color="#B0B0B0">
                    You will pay{" "}
                  </Box>
                  <Box component="span" color="#152C5B" fontWeight="bold">
                    ${totalPrice} USD{" "}
                  </Box>
                  <Box component="span" color="#B0B0B0">
                    per{" "}
                  </Box>
                  <Box component="span" color="#152C5B" fontWeight="bold">
                    {totalDays} {totalDays === 1 ? "night" : "nights"}
                  </Box>
                </>
              ) : (
                <Box component="span" color="#B0B0B0">
                  Please pick a valid date range
                </Box>
              )}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, fontWeight: "bold", fontSize: "1rem" }}
              onClick={handleBookingClick}
            >
              Continue Book
            </Button>
          </Card>

          <Dialog
            open={openLoginModal}
            onClose={() => setOpenLoginModal(false)}
          >
            <DialogTitle>Login Required</DialogTitle>
            <DialogContent>
              <Typography>
                Please log in to continue booking this room.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenLoginModal(false)}>Close</Button>
              <Button variant="contained" onClick={() => navigate("/login")}>
                Go to Login
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {user && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          alignItems="stretch"
        >
          <Box flex={1}>
            <Typography
              color="#152C5B"
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Rate
            </Typography>

            <Rating
              value={rating}
              onChange={(_, value) => setRating(value)}
              size="large"
            />
            <Typography color="#152C5B" fontWeight="bold" gutterBottom mt={2}>
              Message
            </Typography>
            <TextField
              fullWidth
              placeholder="Write your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button
              onClick={handleRate}
              variant="contained"
              sx={{
                px: 4,
                "&:hover": { backgroundColor: "primary.main", color: "white" },
              }}
            >
              Rate
            </Button>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />

          <Box flex={1}>
            <Typography
              color="#152C5B"
              variant="h6"
              fontWeight="bold"
              gutterBottom
              mb={4}
            >
              Add Your Comment
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment"
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={handleComment}
                variant="contained"
                sx={{ px: 4, fontWeight: "bold", textTransform: "none" }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
