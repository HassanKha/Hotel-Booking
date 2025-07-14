import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import '../Landing.module.css'
import img1 from '../../../../../assets/1.png'
import img2 from '../../../../../assets/2.png'
import img3 from '../../../../../assets/3.png'
import img4 from '../../../../../assets/4.png'
import img5 from '../../../../../assets/5.png'
import img6 from '../../../../../assets/6.png'
import img7 from '../../../../../assets/7.png'
import img8 from '../../../../../assets/8.png'




export default function CardHome() {
    return (
        <>

            <Container sx={{ py: 10, color: "#152C5B" }} maxWidth="lg">
                <h2 style={{ margin: "20px" }}> Houses with beauty backyard</h2>
                <Box
                
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap={2}
                
                    
                >
                    <Paper elevation={0} sx={{
                        flex: 1, p: 2, backgroundColor: 'transparent', '&:hover': {
                            boxShadow: 1,
                            transform: 'scale(1.04)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                        <Box sx={{ position: 'relative' }} >
                            <img style={{ width: '100%' }} src={img1} alt="img1" />
                            <h3 style={{ margin: "10px 0" }}>Tabby Town</h3>
                            <p style={{ color: "#B0B0B0", fontSize: "13px" }}>Gunung Batu, Indonesia</p>
                            <p style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#f14b99ff', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', zIndex: 3, margin: '0' }} className='discound'>Popular Choice</p>
                        </Box>
                    </Paper>
                    <Paper elevation={0} sx={{
                        flex: 1, p: 2, backgroundColor: 'transparent', '&:hover': {
                            boxShadow: 1,
                            transform: 'scale(1.04)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                        <Box >
                            <img style={{ width: '100%' }} src={img2} alt="img1" />
                            <h3 style={{ margin: "10px 0" }}>Anggana</h3>
                            <p style={{ color: "#B0B0B0", fontSize: "13px" }}>Bogor, Indonesia</p>
                        </Box>
                    </Paper>
                    <Paper elevation={0} sx={{
                        flex: 1, p: 2, backgroundColor: 'transparent', '&:hover': {
                            boxShadow: 1,
                            transform: 'scale(1.04)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                        <Box>
                            <img style={{ width: '100%' }} src={img3} alt="img1" />
                            <h3 style={{ margin: "10px 0" }}>Seattle Rain</h3>
                            <p style={{ color: "#B0B0B0", fontSize: "13px" }}>Jakarta, Indonesia</p>
                        </Box>
                    </Paper>
                    <Paper elevation={0} sx={{
                        flex: 1, p: 2, backgroundColor: 'transparent', '&:hover': {
                            boxShadow: 1,
                            transform: 'scale(1.04)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                        <Box >
                            <img style={{ width: '100%' }} src={img4} alt="img1" />
                            <h3 style={{ margin: "10px 0" }}>Wodden Pit</h3>
                            <p style={{ color: "#B0B0B0", fontSize: "13px" }}>Wonosobo, Indonesia</p>
                        </Box>
                    </Paper>

                </Box>
                <h2 style={{ margin: "20px" }}> Hotels with large living room</h2>
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap={2}
                >

                    <Paper elevation={0} sx={{
                        flex: 1, p: 2, backgroundColor: 'transparent', '&:hover': {
                            boxShadow: 1,
                            transform: 'scale(1.04)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                        <Box >
                            <img style={{ width: '100%' }} src={img5} alt="img1" />
                            <h3 style={{ margin: "10px 0" }}>Green Park</h3>
                            <p style={{ color: "#B0B0B0", fontSize: "13px" }}>Tangerang, Indonesia</p>
                        </Box>
                    </Paper>
                    <Paper elevation={0} sx={{
                        flex: 1, p: 2, backgroundColor: 'transparent', '&:hover': {
                            boxShadow: 1,
                            transform: 'scale(1.04)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                        <Box>
                            <img style={{ width: '100%' }} src={img6} alt="img1" />
                            <h3 style={{ margin: "10px 0" }}>Podo Wae</h3>
                            <p style={{ color: "#B0B0B0", fontSize: "13px" }}>Madiun, Indonesia</p>
                        </Box>
                    </Paper>
                    <Paper elevation={0} sx={{
                        flex: 1, p: 2, backgroundColor: 'transparent', '&:hover': {
                            boxShadow: 1,
                            transform: 'scale(1.04)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                        <Box >
                            <img style={{ width: '100%' }} src={img7} alt="img1" />
                            <h3 style={{ margin: "10px 0" }}>Silver Rain</h3>
                            <p style={{ color: "#B0B0B0", fontSize: "13px" }}>Bandung, Indonesia</p>
                        </Box>
                    </Paper>
                    <Paper elevation={0} sx={{
                        flex: 1, p: 2, backgroundColor: 'transparent', '&:hover': {
                            boxShadow: 1,
                            transform: 'scale(1.04)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                        <Box sx={{ position: 'relative' }} >
                            <img style={{ width: '100%' }} src={img8} alt="img1" />
                            <h3 style={{ margin: "10px 0" }}>Cashville</h3>
                            <p style={{ color: "#B0B0B0", fontSize: "13px" }}>Kemang, Indonesia</p>
                            <p style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#f14b99ff', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', zIndex: 3, margin: '0' }} className='discound'>Popular Choice</p>
                        </Box>
                    </Paper>

                </Box>

            </Container>



        </>
    )
}
