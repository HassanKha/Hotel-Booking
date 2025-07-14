import { Box, Typography, IconButton, Rating, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';
import { useRef } from 'react';
import img1 from '../../../../../assets/rev1.jpg';
import img2 from '../../../../../assets/rev2.png';


export default function Feedback() {
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const data = [
        {
            img: img1,
            title: 'Happy Family',
            rating: 5,
            text: 'What a great trip with my family and I should try again next time soon ...',
            author: 'Angga, Product Designer',
        },

        {
            img: img2,
            title: 'Great Memories',
            rating: 5,
            text: 'Great experience with my loved ones. Will go again for sure!',
            author: 'John, Photographer',
        },
        {
            img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',

            title: 'Great Memories',
            rating: 5,
            text: 'Great experience with my loved ones. Will go again for sure!',
            author: 'John, Photographer',
        },
    ];

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', my: 5 }}>
            <Slider {...settings} ref={sliderRef}>
                {data.map((item, index) => (
                    <Box key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: { xs: 3, md: 5 },
                                p: { xs: 2, md: 4 },
                                borderRadius: 4,
                                backgroundColor: '#fffefeff',
                                boxShadow: 0,
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* Image */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: { xs: '100%', sm: 300 },
                                    flexShrink: 0,
                                    borderRadius: 4,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        right: 25,
                                        bottom: 25,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 4,
                                        border: '2px solid #e0e0e0',
                                        zIndex: 0,
                                        
                                    }}
                                />
                                <Box
                                    component="img"
                                    src={item.img}
                                    alt={item.title}
                                    sx={{
                                        width: '100%',
                                        height: { xs: 250, md: 400 },
                                        borderRadius: 4,
                                        objectFit: 'cover',
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                    style={{ borderBottomRightRadius: '100px' }}
                                />
                            </Box>

                           
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                    {item.title}
                                </Typography>

                                <Rating value={item.rating} readOnly size="small" sx={{ mb: 2 }} />

                                <Typography
                                    variant="body1"
                                    sx={{ color: 'text.secondary', mb: 2 }}
                                >
                                    {item.text}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.disabled"
                                    display="block"
                                    sx={{ mb: 3 }}
                                >
                                    {item.author}
                                </Typography>

                                {/* Arrows */}
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <IconButton style={{ border: '3px solid rgb(25, 118, 210)',  margin: '0 30px',fontSize: '30px'}} color="primary" onClick={() => sliderRef.current?.slickPrev()}>
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                    <IconButton style={{ border: '3px solid rgb(25, 118, 210)',fontSize: '30px'}} color="primary" onClick={() => sliderRef.current?.slickNext()}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
