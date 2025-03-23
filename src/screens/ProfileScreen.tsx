import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import BarChartIcon from '@mui/icons-material/BarChart';
import { alpha, SxProps, Theme } from '@mui/material/styles';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Chip from '@mui/material/Chip';

const mockUser = {
  name: 'Александр Петров',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: 'Люблю путешествовать и знакомиться с новыми людьми',
  location: 'Москва, Россия',
  age: 28,
  interests: ['ПУТЕШЕСТВИЯ', 'ФОТОГРАФИЯ', 'СПОРТ', 'МУЗЫКА'],
};

// Обновленная цветовая палитра в стиле Badoo
const theme = {
  primary: '#7B48F6', // Фиолетовый как в Badoo
  secondary: '#F5F5F5', // Светло-серый для фона
  accent: '#5B35B4', // Темно-фиолетовый для акцентов
  text: '#000000', // Черный для основного текста
  textSecondary: '#666666', // Серый для вторичного текста
  background: '#FFFFFF', // Белый фон
  divider: '#E8E8E8', // Цвет разделителей
  blue: '#4CC7FC', // Голубой для кнопок верификации
  chipBackground: '#F0F2F4',
} as const;

// Обновленные стилизованные компоненты
const Root = styled(Box)({
  minHeight: '100vh',
  backgroundColor: theme.background,
});

const TopBar = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px',
  backgroundColor: theme.background,
});

const IconWrapper = styled(Box)({
  width: '24px',
  height: '24px',
  color: theme.text,
  cursor: 'pointer',
});

const ProfileSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 16px',
});

const AvatarContainer = styled(Box)({
  position: 'relative',
  marginBottom: '16px',
  width: '120px',
  height: '120px',
});

const StyledAvatar = styled(Avatar)({
  width: '100%',
  height: '100%',
  border: 'none',
});

const CameraButton = styled(Box)({
  position: 'absolute',
  right: 0,
  bottom: 0,
  backgroundColor: theme.primary,
  borderRadius: '50%',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  cursor: 'pointer',
});

const Name = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  color: theme.text,
  marginBottom: '4px',
  textAlign: 'center',
});

const ViewProfile = styled(Typography)({
  color: theme.textSecondary,
  fontSize: '16px',
  marginBottom: '24px',
  cursor: 'pointer',
});

const VerificationButton = styled(Button)({
  backgroundColor: theme.blue,
  color: 'white',
  borderRadius: '100px',
  padding: '12px 24px',
  width: '100%',
  textTransform: 'none',
  fontSize: '16px',
  marginBottom: '24px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.blue,
    opacity: 0.9,
  },
});

const CreditsSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: theme.background,
  borderRadius: '12px',
  marginBottom: '16px',
});

const CreditIcon = styled(Box)({
  width: '48px',
  height: '48px',
  backgroundColor: '#FFD700',
  borderRadius: '50%',
  marginRight: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
});

const PopularitySection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  backgroundColor: theme.background,
  borderRadius: '12px',
});

const PopularityMeter = styled(Box)({
  width: '48px',
  height: '48px',
  position: 'relative',
});

const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '12px',
  width: '100%',
  marginBottom: '24px',
});

const ActionButton = styled(Button)({
  flex: 1,
  backgroundColor: theme.blue,
  color: 'white',
  borderRadius: '100px',
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '16px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.blue,
    opacity: 0.9,
  },
});

const SettingsButton = styled(Button)({
  flex: 1,
  backgroundColor: theme.background,
  color: theme.text,
  borderRadius: '100px',
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '16px',
  border: `1px solid ${theme.divider}`,
  '&:hover': {
    backgroundColor: theme.secondary,
  },
});

const InfoSection = styled(Box)({
  width: '100%',
  marginBottom: '24px',
});

const InfoTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 'bold',
  color: theme.text,
  marginBottom: '16px',
});

const InfoItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
});

const InfoLabel = styled(Typography)({
  fontSize: '16px',
  color: theme.text,
  fontWeight: 500,
  marginRight: '8px',
});

const InfoValue = styled(Typography)({
  fontSize: '16px',
  color: theme.textSecondary,
});

const InterestsSection = styled(Box)({
  width: '100%',
  marginBottom: '24px',
});

const InterestChip = styled(Chip)({
  margin: '4px',
  backgroundColor: theme.chipBackground,
  color: theme.text,
  borderRadius: '16px',
  fontSize: '14px',
  fontWeight: 500,
});

const BottomNavigation = styled(Box)({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-around',
  padding: '12px',
  backgroundColor: theme.background,
  borderTop: `1px solid ${theme.divider}`,
});

const NavItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.textSecondary,
  fontSize: '12px',
  cursor: 'pointer',
  '&.active': {
    color: theme.primary,
  },
});

function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(mockUser);

  return (
    <Root>
      <TopBar>
        <IconWrapper>
          <SettingsIcon />
        </IconWrapper>
        <img src="/badoo-logo.png" alt="Badoo" style={{ height: '24px' }} />
        <IconWrapper>
          <EditIcon />
        </IconWrapper>
      </TopBar>

      <ProfileSection>
        <AvatarContainer>
          <StyledAvatar src={user.avatar} />
          <CameraButton>
            <PhotoCamera fontSize="small" />
          </CameraButton>
        </AvatarContainer>
        <Name>{user.name}</Name>
        <ViewProfile>Посмотреть профиль</ViewProfile>

        <ActionButtons>
          <ActionButton startIcon={<EditIcon />}>
            РЕДАКТИРОВАТЬ
          </ActionButton>
          <SettingsButton startIcon={<SettingsIcon />}>
            НАСТРОЙКИ
          </SettingsButton>
        </ActionButtons>

        <InfoSection>
          <InfoTitle>Основная информация</InfoTitle>
          <InfoItem>
            <InfoLabel>Местоположение</InfoLabel>
            <InfoValue>{user.location}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Возраст</InfoLabel>
            <InfoValue>{user.age} лет</InfoValue>
          </InfoItem>
        </InfoSection>

        <InterestsSection>
          <InfoTitle>Интересы</InfoTitle>
          <Box display="flex" flexWrap="wrap">
            {user.interests.map((interest) => (
              <InterestChip key={interest} label={interest} />
            ))}
          </Box>
        </InterestsSection>

        <VerificationButton
          startIcon={<CheckCircleOutline />}
        >
          Пройдите верификацию!
        </VerificationButton>

        <CreditsSection>
          <CreditIcon>+</CreditIcon>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">Кредиты</Typography>
            <Typography variant="body2" color={theme.textSecondary}>Добавить</Typography>
          </Box>
        </CreditsSection>

        <PopularitySection>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">Популярность</Typography>
            <Typography variant="body2" color={theme.textSecondary}>Оч. низкая</Typography>
          </Box>
          <PopularityMeter>
            {/* Здесь можно добавить круговой прогресс-бар */}
          </PopularityMeter>
        </PopularitySection>
      </ProfileSection>

      <BottomNavigation>
        <NavItem className="active">
          <IconButton color="inherit" size="small">❤️</IconButton>
          <Typography>Поиск</Typography>
        </NavItem>
        <NavItem>
          <IconButton color="inherit" size="small">🗺️</IconButton>
          <Typography>Карта</Typography>
        </NavItem>
        <NavItem>
          <IconButton color="inherit" size="small">📹</IconButton>
          <Typography>Стрим</Typography>
        </NavItem>
        <NavItem>
          <IconButton color="inherit" size="small">💬</IconButton>
          <Typography>Чаты</Typography>
        </NavItem>
        <NavItem>
          <IconButton color="inherit" size="small">👤</IconButton>
          <Typography>Профиль</Typography>
        </NavItem>
      </BottomNavigation>

      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Редактировать профиль</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Имя"
            fullWidth
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Возраст"
            type="number"
            fullWidth
            value={user.age}
            onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="О себе"
            fullWidth
            multiline
            rows={4}
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Местоположение"
            fullWidth
            value={user.location}
            onChange={(e) => setUser({ ...user, location: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Отмена</Button>
          <Button onClick={() => setIsEditing(false)} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  );
}

export default ProfileScreen; 