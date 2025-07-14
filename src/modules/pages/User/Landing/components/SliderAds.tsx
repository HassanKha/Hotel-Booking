import React, { useEffect, useState } from 'react';
import { axiosInstance, ROOMS_USERS_URLS } from '../../../../services/Urls';
import { toast } from 'react-toastify';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import type { Room } from '../../../../../interfaces/Shared/Shared';

export default function SliderAds() {
  const [rooms, setRooms] = useState<Room[]>([]);



  async function getAllRooms() {
    try {
      const res = await axiosInstance.get(`${ROOMS_USERS_URLS.GET_USERS_ROOMS}?page=1&size=10`);
      setRooms(res.data.data.rooms);
      console.log(res.data.data.rooms);

    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error fetching rooms');
    }
  }

  useEffect(() => {
    getAllRooms();
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };


  return (
    <>
      <div style={{ width: '85%', margin: '0 auto' ,paddingBottom:"50px"}}>
        <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Our Rooms</h2>
        <Slider {...settings}  >
          {rooms.map((room) => (
            <div key={room._id} >
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 1,
                  backgroundColor: 'transparent',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <img
                    style={{
                      width: '100%',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      height: '200px'
                    }}
                    src={room.images[0]}
                    alt={room.roomNumber}
                  />
                  <h3 style={{ margin: '10px 0' }}>{room.roomNumber}</h3>
                  <p style={{ color: '#B0B0B0', fontSize: '13px' }}>
                    Capacity: {room.capacity}
                  </p>
                  <p
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: '#f14b99ff',
                      color: 'white',
                      padding: '0.5rem 1.5rem',
                      borderRadius: '0.5rem',
                      zIndex: 3,
                      margin: '0',
                    }}
                    className='discound'
                  >
                    {room.discount}% OFF
                  </p>
                </Box>
              </Paper>
            </div>
          ))}
        </Slider>
      </div>


    </>
  );
}
