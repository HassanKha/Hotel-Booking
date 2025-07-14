import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  CircularProgress,
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import defaultRoomImage from "../../../../assets/r01_2.jpg";
import { axiosInstance, USERS_FAVORITES } from '../../../services/Urls';
import NoData from '../../../shared/NoData/NoData';
import { toast } from 'react-toastify';
import { HeartIcon, ViewIcon } from '../../../../assets/ExploreIcons';
import DeleteConfirmationDialog from '../../../shared/DeleteConfirmation/DeleteConfirmation';

interface Facility {
  _id: string;
  name: string;
}

interface Room {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
  discount: number;
  capacity: number;
  description: string;
  facilities: Facility[];
  createdAt: string;
  createdBy: {
    _id: string;
    userName: string;
    email: string;
    role: string;
  };
  updatedAt: string;
  isBooked: boolean;
}

const PriceBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: '#f14b99ff',
  color: 'white',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.shape.borderRadius,
  zIndex: 3, // زِد الـ zIndex ليكون فوق الأيقونات الأخرى
}));

const IconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  gap: theme.spacing(1),
  zIndex: 2,
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
}));

const FavoriteItemCard = ({
  room,
  onOpenDialog,
}: {
  room: Room;
  onOpenDialog: (roomId: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <PriceBadge>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            ${room.price} per night
          </Typography>
        </PriceBadge>

        {/* 💡 التعديل هنا: وضع CardMedia داخل Box له position: relative */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={room.images && room.images.length > 0 ? room.images[0] : defaultRoomImage}
            alt={`Room ${room.roomNumber}`}
            loading="lazy"
            sx={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              objectFit: 'cover',
              aspectRatio: '16 / 9',
            }}
          />
          {/* 💡 نقل IconContainer ليصبح داخل Box الذي يحتوي على CardMedia */}
          <IconContainer sx={{ opacity: isHovered ? 1 : 0 }}>
            <IconButton
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                color: '#BB2121',
                '&:hover': { backgroundColor: 'white' }
              }}
              aria-label="remove from favorites"
              onClick={() => onOpenDialog(room._id)}
            >
              <HeartIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                color: '#29A4D0',
                '&:hover': { backgroundColor: 'white' }
              }}
              aria-label="view room details"
              onClick={() => console.log(`View details for Room ${room.roomNumber}`)}
            >
              <ViewIcon />
            </IconButton>
          </IconContainer>
        </Box>

        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#3F4462' }}>
            Room {room.roomNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discount {room.discount}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Capacity: {room.capacity}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

function Favorites() {
  const [loading, setLoading] = useState<boolean>(false);
  const [favList, setFavList] = useState<Room[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const getAllFavourites = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(USERS_FAVORITES.GET_USER_FAVOURITES);
      if (response?.data?.data?.favoriteRooms && response.data.data.favoriteRooms.length > 0) {
        setFavList(response.data.data.favoriteRooms.map((fav: any) => fav.rooms).flat() || []);
      } else {
        setFavList([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error('Failed to load favorite rooms.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = (roomId: string) => {
    setSelectedRoomId(roomId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRoomId) return;
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        USERS_FAVORITES.DELETE_FROM_FAVOURITE(selectedRoomId), { data: { roomId: selectedRoomId } }
      );
      toast.success(response.data.message || 'Removed from favorites.');
      await getAllFavourites();
    } catch (error: any) {
      console.error("Error removing favorite:", error);
      toast.error(error?.response?.data?.message || 'Failed to remove room from favorites.');
    } finally {
      setLoading(false);
      setOpenDeleteDialog(false);
      setSelectedRoomId(null);
    }
  };

  useEffect(() => {
    getAllFavourites();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#F8F8F8', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Home / Favorites
        </Typography>
        <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', color: '#3F4462' }}>
          Your Favorite Rooms
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', color: '#3F4462' }}>
          Saved For Later
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2, color: '#3F4462' }}>Loading Favorites...</Typography>
          </Box>
        ) : favList?.length > 0 ? (
          <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            {favList.map((roomItem) => (
              <FavoriteItemCard
                key={roomItem._id}
                room={roomItem}
                onOpenDialog={handleOpenDeleteDialog}
              />
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column' }}>
            <NoData />
          </Box>
        )}
      </Container>

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Remove from Favorites"
        message="Are you sure you want to remove this room from your favorites?"
        loading={loading}
      />
    </Box>
  );
}

export default Favorites;