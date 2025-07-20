import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import '../Landing.module.css';
import img1 from '../../../../../assets/1.png';
import img2 from '../../../../../assets/2.png';
import img3 from '../../../../../assets/3.png';
import img4 from '../../../../../assets/4.png';
import img5 from '../../../../../assets/5.png';
import img6 from '../../../../../assets/6.png';
import img7 from '../../../../../assets/7.png';
import img8 from '../../../../../assets/8.png';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function CardHome() {
  const { t } = useTranslation();
  const { darkMode } = useThemeContext();

  const firstRow = [
    { title: 'Tabby Town', key: 'tabbyTown', img: img1, popular: true },
    { title: 'Anggana', key: 'anggana', img: img2 },
    { title: 'Seattle Rain', key: 'seattleRain', img: img3 },
    { title: 'Wodden Pit', key: 'woddenPit', img: img4 },
  ];

  const secondRow = [
    { title: 'Green Park', key: 'greenPark', img: img5 },
    { title: 'Podo Wae', key: 'podoWae', img: img6 },
    { title: 'Silver Rain', key: 'silverRain', img: img7 },
    { title: 'Cashville', key: 'cashville', img: img8, popular: true },
  ];

  const renderCards = (items: typeof firstRow) =>
    items.map(({ title, key, img, popular }) => (
      <Paper
        key={title}
        elevation={0}
        role="article"
        aria-label={title}
        tabIndex={0}
        sx={{
          flex: 1,
          p: 2,
          backgroundColor: 'transparent',
          outline: 'none',
          '&:hover': {
            boxShadow: 1,
            transform: 'scale(1.04)',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={img}
            alt={`${title} image`}
            sx={{ width: '100%', borderRadius: 1 }}
          />
          <Typography variant="h6" component="h3" sx={{ mt: 1.5 }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#B0B0B0', fontSize: '13px' }}
          >
            {t(`cardHome.titles.${key}`)}
          </Typography>

          {popular && (
            <Box
              component="span"
              aria-label="Popular choice"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#f14b99ff',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: '0.5rem',
                zIndex: 3,
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
              className="discount"
            >
              {t('cardHome.popularChoice')}
            </Box>
          )}
        </Box>
      </Paper>
    ));

  return (
    <Container
      component="section"
      aria-label="Popular Hotels"
      sx={{
        py: 10,
        color: darkMode ? '#fff' : '#1e293b',
      }}
      maxWidth="lg"
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{ mb: 3, ml: 1 }}
      >
        {t('cardHome.section1Title')}
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={2}
        role="list"
        aria-label="Card list row one"
      >
        {renderCards(firstRow)}
      </Box>

      <Typography
        component="h2"
        variant="h4"
        sx={{ mt: 6, mb: 3, ml: 1 }}
      >
        {t('cardHome.section2Title')}
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={2}
        role="list"
        aria-label="Card list row two"
      >
        {renderCards(secondRow)}
      </Box>
    </Container>
  );
}
