import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#fcfbfbff', px: 6, py: 8, }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 6,
          flexWrap: 'wrap',
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            <Box component="span" sx={{ color: 'primary.main' }}>Stay</Box>cation.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            We kaboom your beauty holiday instantly and memorable.
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            For Beginners
          </Typography>
          <Link href="#" underline="none" color="text.secondary" display="block" mb={0.5}>
            New Account
          </Link>
          <Link href="#" underline="none" color="text.secondary" display="block" mb={0.5}>
            Start Booking a Room
          </Link>
          <Link href="#" underline="none" color="text.secondary" display="block">
            Use Payments
          </Link>
        </Box>

   
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Explore Us
          </Typography>
          <Link href="#" underline="none" color="text.secondary" display="block" mb={0.5}>
            Our Careers
          </Link>
          <Link href="#" underline="none" color="text.secondary" display="block" mb={0.5}>
            Privacy
          </Link>
          <Link href="#" underline="none" color="text.secondary" display="block">
            Terms & Conditions
          </Link>
        </Box>

   
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Connect Us
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
          osamaahmeddev71@gmail.com
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
           01286561086
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Beni Suef, Egypt
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
