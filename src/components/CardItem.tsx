import { Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface CardItemProps {
  title: string;
  description: string;
  barcolor?: string; // 可选属性，默认使用 primary.main
}

const CardItem = ({ title, description, barcolor }: CardItemProps) => {

  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/step');
  }
  return (
    <Card
      sx={{
        maxWidth: 450,
        width: '100%',
        height: '60vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // 动画效果
        '&:hover': {
          transform: 'translateY(-10px)', // 鼠标悬停时卡片向上偏移
          boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', // 高亮边框效果
        },
        cursor: 'pointer', 
      }}
      onClick={onClickHandler} // 点击事件
    >
      <Box
        sx={{
          width: '100%',
          height: '10px', // 色条的高度
          backgroundColor: barcolor, // 色条的背景色，可以自定义
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // 使内容上下居中
          alignItems: 'center',
          height: '100%', // 让内容区域占满卡片的高度
        }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardItem;
