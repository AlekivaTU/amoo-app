import React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

const mockUser = {
  name: 'Александр Петров',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: 'Люблю путешествовать и знакомиться с новыми людьми',
  location: 'Москва, Россия',
  age: 28,
  interests: ['ПУТЕШЕСТВИЯ', 'ФОТОГРАФИЯ', 'СПОРТ', 'МУЗЫКА'],
};

const theme = {
  primary: '#7B48F6',
  secondary: '#F5F5F5',
  accent: '#5B35B4',
  text: '#000000',
  textSecondary: '#666666',
  background: '#FFFFFF',
  divider: '#E8E8E8',
  blue: '#4CC7FC',
  chipBackground: '#F0F2F4',
};

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: #F5F5F5;
    min-height: 100vh;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #F5F5F5;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: ${theme.background};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 80px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 32px;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${theme.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CameraButton = styled.button`
  position: absolute;
  right: -4px;
  bottom: -4px;
  background: ${theme.primary};
  border: 3px solid ${theme.background};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Name = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 8px 0;
  color: ${theme.text};
`;

const Bio = styled.p`
  color: ${theme.textSecondary};
  margin-bottom: 24px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 24px;
`;

const Button = styled.button<{ variant?: 'outlined' }>`
  flex: 1;
  padding: 12px 24px;
  border-radius: 100px;
  border: ${props => props.variant === 'outlined' ? `1px solid ${theme.divider}` : 'none'};
  background: ${props => props.variant === 'outlined' ? 'transparent' : theme.blue};
  color: ${props => props.variant === 'outlined' ? theme.text : 'white'};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Section = styled.section`
  width: 100%;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${theme.text};
  padding-bottom: 8px;
  border-bottom: 1px solid ${theme.divider};
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: ${theme.text};
`;

const InfoValue = styled.span`
  color: ${theme.textSecondary};
`;

const InterestTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const InterestTag = styled.span`
  background: ${theme.chipBackground};
  padding: 8px 16px;
  border-radius: 16px;
  color: ${theme.text};
  font-weight: 500;
  font-size: 14px;
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 12px;
  background: ${theme.background};
  border-top: 1px solid ${theme.divider};
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.active ? theme.primary : theme.textSecondary};
  padding: 4px 16px;
  
  span {
    font-size: 24px;
    margin-bottom: 4px;
  }
  
  p {
    font-size: 12px;
    margin: 0;
  }
`;

function ProfileScreen() {
  return (
    <>
      <Global styles={globalStyles} />
      <Wrapper>
        <Container>
          <ProfileHeader>
            <AvatarContainer>
              <Avatar src={mockUser.avatar} alt={mockUser.name} />
              <CameraButton>📸</CameraButton>
            </AvatarContainer>
            <Name>{mockUser.name}</Name>
            <Bio>{mockUser.bio}</Bio>
            
            <ButtonGroup>
              <Button>
                ✏️ РЕДАКТИРОВАТЬ
              </Button>
              <Button variant="outlined">
                ⚙️ НАСТРОЙКИ
              </Button>
            </ButtonGroup>
          </ProfileHeader>

          <Section>
            <SectionTitle>Основная информация</SectionTitle>
            <InfoList>
              <InfoItem>
                <span>📍</span>
                <InfoLabel>Местоположение:</InfoLabel>
                <InfoValue>{mockUser.location}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Возраст:</InfoLabel>
                <InfoValue>{mockUser.age} лет</InfoValue>
              </InfoItem>
            </InfoList>
          </Section>

          <Section>
            <SectionTitle>Интересы</SectionTitle>
            <InterestTags>
              {mockUser.interests.map((interest) => (
                <InterestTag key={interest}>{interest}</InterestTag>
              ))}
            </InterestTags>
          </Section>
        </Container>

        <BottomNav>
          <NavItem>
            <span>❤️</span>
            <p>Поиск</p>
          </NavItem>
          <NavItem>
            <span>🗺️</span>
            <p>Карта</p>
          </NavItem>
          <NavItem>
            <span>📹</span>
            <p>Стрим</p>
          </NavItem>
          <NavItem>
            <span>💬</span>
            <p>Чаты</p>
          </NavItem>
          <NavItem active>
            <span>👤</span>
            <p>Профиль</p>
          </NavItem>
        </BottomNav>
      </Wrapper>
    </>
  );
}

export default ProfileScreen; 