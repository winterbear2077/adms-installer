import { Grid } from '@mui/material';
import { CardItemProps } from '../components/CardItem';
import CardItem from '../components/CardItem';
import BasicPage from '../components/BasicPage';

function HomePage({ cards }: { cards: CardItemProps[] }) {
  return (
    <BasicPage>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignContent='center'
        width='80%'
        sx={{
          height: '100%'
        }}
      >
        {cards.map((card) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 3 }}// 响应式：xs=12, sm=6, md=3
            key={card.title}
            marginBottom='64px'
          >
            <CardItem
              title={card.title}
              description={card.description}
              barcolor={card.barcolor}
            />
          </Grid>
        ))}
      </Grid>
    </BasicPage>
  );
}

export default HomePage;
