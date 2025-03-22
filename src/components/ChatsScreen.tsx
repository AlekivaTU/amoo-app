import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ChatsScreen.css';

interface Reaction {
  emoji: string;
  userId: string;
}

type MessageType = 'text' | 'voice' | 'video' | 'image' | 'sticker' | 'gif' | 'videoNote';

interface Message {
  id: string;
  senderId: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  reactions: Reaction[];
  isDisappearing?: boolean;
  disappearAfter?: number; // в секундах
  isRead: boolean;
  replyTo?: string; // ID сообщения, на которое отвечаем
}

interface UserInfo {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastActive?: Date;
}

interface Chat {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  isTyping: boolean;
  typingUsers: string[];
  userInfo: UserInfo;
}

interface ChatState {
  messages: Message[];
  isRecording: boolean;
  isVideoCall: boolean;
  selectedGif: string | null;
  selectedSticker: string | null;
  replyingTo: string | null;
  recordingType: 'voice' | 'videoNote' | null;
}

interface Story {
  id: string;
  userId: string;
  type: 'image' | 'video';
  content: string;
  timestamp: Date;
  views: string[]; // массив ID пользователей, просмотревших историю
  duration: number; // длительность в секундах
}

interface UserStories {
  userId: string;
  stories: Story[];
  lastUpdated: Date;
}

const mockUsers: Record<string, UserInfo> = {
  '101': {
    id: '101',
    username: 'Анна',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    isOnline: true,
    lastActive: new Date()
  },
  '102': {
    id: '102',
    username: 'Михаил',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    isOnline: false,
    lastActive: new Date(Date.now() - 3600000)
  },
  '103': {
    id: '103',
    username: 'Елена',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    isOnline: true,
    lastActive: new Date()
  },
  '104': {
    id: '104',
    username: 'Александр',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
    isOnline: true,
    lastActive: new Date()
  },
  '105': {
    id: '105',
    username: 'Мария',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    isOnline: false,
    lastActive: new Date(Date.now() - 7200000)
  }
};

const mockChats: Chat[] = [
  {
    id: '1',
    participants: ['101', 'currentUser'],
    lastMessage: {
      id: '1',
      senderId: '101',
      type: 'text',
      content: 'Привет! Как дела? 😊',
      timestamp: new Date('2024-03-20T14:30:00'),
      reactions: [],
      isRead: false
    },
    unreadCount: 2,
    isTyping: false,
    typingUsers: [],
    userInfo: mockUsers['101']
  },
  {
    id: '2',
    participants: ['102', 'currentUser'],
    lastMessage: {
      id: '2',
      senderId: '102',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1513379733131-48b424e4c267',
      timestamp: new Date('2024-03-20T12:45:00'),
      reactions: [],
      isRead: true
    },
    unreadCount: 0,
    isTyping: false,
    typingUsers: [],
    userInfo: mockUsers['102']
  },
  {
    id: '3',
    participants: ['103', 'currentUser'],
    lastMessage: {
      id: '3',
      senderId: '103',
      type: 'voice',
      content: '/audio/voice1.webm',
      timestamp: new Date('2024-03-19T20:00:00'),
      reactions: [{ emoji: '❤️', userId: 'currentUser' }],
      isRead: false
    },
    unreadCount: 1,
    isTyping: false,
    typingUsers: [],
    userInfo: mockUsers['103']
  },
  {
    id: '4',
    participants: ['104', 'currentUser'],
    lastMessage: {
      id: '4',
      senderId: 'currentUser',
      type: 'video',
      content: '/video/video1.webm',
      timestamp: new Date('2024-03-19T18:30:00'),
      reactions: [],
      isRead: true
    },
    unreadCount: 0,
    isTyping: true,
    typingUsers: ['104'],
    userInfo: mockUsers['104']
  },
  {
    id: '5',
    participants: ['105', 'currentUser'],
    lastMessage: {
      id: '5',
      senderId: '105',
      type: 'sticker',
      content: '/stickers/sticker1.png',
      timestamp: new Date('2024-03-19T15:00:00'),
      reactions: [
        { emoji: '😍', userId: 'currentUser' },
        { emoji: '👍', userId: '105' }
      ],
      isRead: true
    },
    unreadCount: 0,
    isTyping: false,
    typingUsers: [],
    userInfo: mockUsers['105']
  }
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      senderId: '101',
      type: 'text',
      content: 'Привет! Как дела? 😊',
      timestamp: new Date('2024-03-20T14:30:00'),
      reactions: [],
      isRead: false
    },
    {
      id: '2',
      senderId: 'currentUser',
      type: 'text',
      content: 'Привет! Все отлично, спасибо! Как ты? 🌟',
      timestamp: new Date('2024-03-20T14:31:00'),
      reactions: [],
      isRead: true
    },
    {
      id: '3',
      senderId: '101',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1513379733131-48b424e4c267',
      timestamp: new Date('2024-03-20T14:32:00'),
      reactions: [{ emoji: '😍', userId: 'currentUser' }],
      isRead: false
    }
  ]
};

const mockStories: UserStories[] = [
  {
    userId: '101',
    stories: [
      {
        id: '1',
        userId: '101',
        type: 'image',
        content: 'https://picsum.photos/400/700?random=1',
        timestamp: new Date('2024-03-20T15:00:00'),
        views: [],
        duration: 5
      },
      {
        id: '2',
        userId: '101',
        type: 'video',
        content: 'https://example.com/video1.mp4',
        timestamp: new Date('2024-03-20T15:30:00'),
        views: [],
        duration: 15
      }
    ],
    lastUpdated: new Date('2024-03-20T15:30:00')
  },
  {
    userId: '102',
    stories: [
      {
        id: '3',
        userId: '102',
        type: 'image',
        content: 'https://picsum.photos/400/700?random=2',
        timestamp: new Date('2024-03-20T14:00:00'),
        views: ['101'],
        duration: 5
      }
    ],
    lastUpdated: new Date('2024-03-20T14:00:00')
  },
  {
    userId: '103',
    stories: [
      {
        id: '4',
        userId: '103',
        type: 'image',
        content: 'https://picsum.photos/400/700?random=3',
        timestamp: new Date('2024-03-20T16:00:00'),
        views: [],
        duration: 5
      },
      {
        id: '5',
        userId: '103',
        type: 'image',
        content: 'https://picsum.photos/400/700?random=4',
        timestamp: new Date('2024-03-20T16:05:00'),
        views: [],
        duration: 5
      }
    ],
    lastUpdated: new Date('2024-03-20T16:05:00')
  }
];

const emojis = ['😊', '😂', '❤️', '😍', '👍', '🎉', '🌟', '💕', '🤔', '😎'];
const stickers = [
  '/stickers/sticker1.png',
  '/stickers/sticker2.png',
  '/stickers/sticker3.png',
  '/stickers/sticker4.png',
  '/stickers/sticker5.png'
];

const ChatsScreen: React.FC = () => {
  const { id: chatId } = useParams();
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [stories, setStories] = useState<UserStories[]>(mockStories);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const storyTimerRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatId]);

  const handleChatSelect = (id: string) => {
    navigate(`/chats/${id}`);
  };

  const handleSendMessage = (type: Message['type'] = 'text', content: string = newMessage) => {
    if (!chatId || (!content && type === 'text')) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'currentUser',
      type,
      content,
      timestamp: new Date(),
      reactions: [],
      isRead: false
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMsg]
    }));

    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, lastMessage: newMsg, unreadCount: 0 }
          : chat
      )
    );

    setNewMessage('');
    setShowEmojis(false);
    setShowStickers(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleStickerSelect = (sticker: string) => {
    handleSendMessage('sticker', sticker);
    setShowStickers(false);
  };

  const startRecording = async (type: 'voice' | 'video') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video'
      });
      setIsRecording(true);
      // Здесь должна быть логика записи
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Здесь должна быть логика остановки записи
  };

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'text':
        return <div className="message-text">{message.content}</div>;
      case 'image':
        return (
          <div className="message-image">
            <img src={message.content} alt="Изображение" />
          </div>
        );
      case 'voice':
        return (
          <div className="message-voice">
            <audio controls src={message.content} />
          </div>
        );
      case 'video':
        return (
          <div className="message-video">
            <video controls src={message.content} />
          </div>
        );
      case 'sticker':
        return (
          <div className="message-sticker">
            <img src={message.content} alt="Стикер" />
          </div>
        );
      default:
        return null;
    }
  };

  const selectedChat = chatId ? chats.find(chat => chat.id === chatId) : null;

  const handleStoryNavigation = (direction: 'prev' | 'next') => {
    if (!selectedStory) return;

    const currentUserStories = stories.find(s => s.userId === selectedStory.userId);
    if (!currentUserStories) return;

    const currentIndex = currentUserStories.stories.findIndex(
      s => s.id === selectedStory.id
    );

    if (direction === 'next') {
      if (currentIndex < currentUserStories.stories.length - 1) {
        // Следующая история того же пользователя
        setSelectedStory(currentUserStories.stories[currentIndex + 1]);
      } else {
        // Переход к историям следующего пользователя
        const currentUserIndex = stories.findIndex(s => s.userId === selectedStory.userId);
        if (currentUserIndex < stories.length - 1) {
          setSelectedStory(stories[currentUserIndex + 1].stories[0]);
        } else {
          setIsStoryModalOpen(false);
        }
      }
    } else {
      if (currentIndex > 0) {
        // Предыдущая история того же пользователя
        setSelectedStory(currentUserStories.stories[currentIndex - 1]);
      } else {
        // Переход к историям предыдущего пользователя
        const currentUserIndex = stories.findIndex(s => s.userId === selectedStory.userId);
        if (currentUserIndex > 0) {
          const prevUserStories = stories[currentUserIndex - 1].stories;
          setSelectedStory(prevUserStories[prevUserStories.length - 1]);
        }
      }
    }
  };

  const markStoryAsViewed = (storyId: string) => {
    setStories((prev: UserStories[]) =>
      prev.map((userStories: UserStories) => ({
        ...userStories,
        stories: userStories.stories.map((story: Story) =>
          story.id === storyId
            ? {
                ...story,
                views: story.views.includes('currentUser')
                  ? story.views
                  : [...story.views, 'currentUser']
              }
            : story
        )
      }))
    );
  };

  // Эффект для автоматического переключения историй
  React.useEffect(() => {
    if (selectedStory && isStoryModalOpen) {
      // Отмечаем историю как просмотренную
      markStoryAsViewed(selectedStory.id);

      // Устанавливаем таймер для следующей истории
      storyTimerRef.current = setTimeout(() => {
        handleStoryNavigation('next');
      }, selectedStory.duration * 1000);

      return () => {
        if (storyTimerRef.current) {
          clearTimeout(storyTimerRef.current);
        }
      };
    }
  }, [selectedStory, isStoryModalOpen]);

  const renderStoryModal = () => {
    if (!selectedStory || !isStoryModalOpen) return null;

    const user = mockUsers[selectedStory.userId];
    const currentUserStories = stories.find(s => s.userId === selectedStory.userId);
    const currentIndex = currentUserStories?.stories.findIndex(
      s => s.id === selectedStory.id
    );

    return (
      <div className="story-modal">
        <div 
          className="story-overlay story-prev" 
          onClick={() => handleStoryNavigation('prev')}
        />
        <div 
          className="story-overlay story-next" 
          onClick={() => handleStoryNavigation('next')}
        />

        <div className="story-header">
          <div className="story-user-info">
            <img src={user.avatar} alt={user.username} />
            <span>{user.username}</span>
            <span className="story-timestamp">
              {new Date(selectedStory.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <button onClick={() => setIsStoryModalOpen(false)}>✕</button>
        </div>

        <div className="story-progress-bar">
          {currentUserStories?.stories.map((story, index) => (
            <div
              key={story.id}
              className={`progress-segment ${
                currentIndex !== undefined && index === currentIndex ? 'active' : ''
              } ${currentIndex !== undefined && index < currentIndex ? 'viewed' : ''}`}
            >
              {currentIndex !== undefined && index === currentIndex && (
                <div 
                  className="progress-animation"
                  style={{ animationDuration: `${selectedStory.duration}s` }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="story-content">
          {selectedStory.type === 'image' ? (
            <img src={selectedStory.content} alt="Story" />
          ) : (
            <video
              src={selectedStory.content}
              autoPlay
              playsInline
              muted
              controls={false}
              onEnded={() => handleStoryNavigation('next')}
            />
          )}
        </div>

        <div className="story-actions">
          <input
            type="text"
            placeholder="Ответить на историю..."
            className="story-reply-input"
          />
          <button className="story-reply-button">Отправить</button>
        </div>
      </div>
    );
  };

  return (
    <div className="chats-screen">
      <button 
        className="mobile-nav-toggle"
        onClick={() => setIsMobileNavVisible(!isMobileNavVisible)}
      >
        {isMobileNavVisible ? '✕' : '☰'}
      </button>
      <div className={`chats-list ${isMobileNavVisible ? 'visible' : ''}`}>
        <div className="chats-header">
          <h2>Чаты</h2>
        </div>
        {renderStoryModal()}
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${chatId === chat.id ? 'active' : ''}`}
            onClick={() => handleChatSelect(chat.id)}
          >
            <div className="chat-avatar">
              <img src={chat.userInfo.avatar} alt={chat.userInfo.username} />
              {chat.userInfo.isOnline && <span className="online-status" />}
            </div>
            <div className="chat-info">
              <div className="chat-header">
                <h3>{chat.userInfo.username}</h3>
                <span className="chat-time">
                  {chat.lastMessage.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="chat-last-message">
                {chat.isTyping ? 'печатает...' : chat.lastMessage.content}
              </p>
            </div>
            {chat.unreadCount > 0 && (
              <span className="unread-count">{chat.unreadCount}</span>
            )}
          </div>
        ))}
      </div>

      <div className="chat-window">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-avatar">
                <img src={selectedChat.userInfo.avatar} alt={selectedChat.userInfo.username} />
                {selectedChat.userInfo.isOnline && <span className="online-status" />}
              </div>
              <div className="chat-info">
                <h3>{selectedChat.userInfo.username}</h3>
                {selectedChat.userInfo.isOnline ? (
                  <p>В сети</p>
                ) : (
                  <p>
                    {selectedChat.userInfo.lastActive &&
                      `Был(а) в сети ${selectedChat.userInfo.lastActive.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}`}
                  </p>
                )}
              </div>
            </div>

            <div className="messages-container">
              {messages[selectedChat.id]?.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.senderId === 'currentUser' ? 'own' : ''}`}
                >
                  <div className="message-content">
                    {renderMessageContent(message)}
                    {message.reactions.length > 0 && (
                      <div className="message-reactions">
                        {message.reactions.map((reaction, index) => (
                          <span key={index} className="reaction">
                            {reaction.emoji}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {message.isRead && <span className="read-status">✓✓</span>}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-controls">
              <div className="message-input-container">
                <input
                  type="text"
                  placeholder="Введите сообщение..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <div className="message-actions">
                  <button onClick={() => setShowEmojis(!showEmojis)}>😊</button>
                  <button onClick={() => setShowStickers(!showStickers)}>🎯</button>
                  <button
                    className={isRecording ? 'recording' : ''}
                    onClick={() => isRecording ? stopRecording() : startRecording('voice')}
                  >
                    🎤
                  </button>
                  <button onClick={() => startRecording('video')}>📹</button>
                </div>
                {showEmojis && (
                  <div className="emoji-picker">
                    {emojis.map((emoji, index) => (
                      <button key={index} onClick={() => handleEmojiSelect(emoji)}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
                {showStickers && (
                  <div className="sticker-picker">
                    {stickers.map((sticker, index) => (
                      <button key={index} onClick={() => handleStickerSelect(sticker)}>
                        <img src={sticker} alt={`Стикер ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            Выберите чат для начала общения
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsScreen; 