import React, { useState, useRef, useEffect } from 'react';
import './ChatScreen.css';

interface Message {
  id: string;
  senderId: number;
  type: 'text' | 'voice' | 'video' | 'image' | 'sticker' | 'story';
  content: string;
  timestamp: Date;
  isDeleted: boolean;
}

interface Chat {
  id: number;
  userId: number;
  userName: string;
  userPhoto: string;
  lastActive: Date;
  messages: Message[];
  isOnline: boolean;
}

const initialChats: Chat[] = [
  {
    id: 1,
    userId: 1,
    userName: "Анна",
    userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    lastActive: new Date(),
    isOnline: true,
    messages: [
      {
        id: '1',
        senderId: 1,
        type: 'text',
        content: 'Привет! Как дела?',
        timestamp: new Date(Date.now() - 3600000),
        isDeleted: false
      },
      {
        id: '2',
        senderId: 0,
        type: 'text',
        content: 'Привет! Все отлично, спасибо! Как твои дела?',
        timestamp: new Date(Date.now() - 3500000),
        isDeleted: false
      },
      {
        id: '3',
        senderId: 1,
        type: 'image',
        content: 'https://images.unsplash.com/photo-1513379733131-48b424e4c267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        timestamp: new Date(Date.now() - 3400000),
        isDeleted: false
      },
      {
        id: '4',
        senderId: 0,
        type: 'text',
        content: 'Вау, отличное фото! Где это снято?',
        timestamp: new Date(Date.now() - 3300000),
        isDeleted: false
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    userName: "Мария",
    userPhoto: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    lastActive: new Date(Date.now() - 1800000),
    isOnline: false,
    messages: [
      {
        id: '5',
        senderId: 2,
        type: 'image',
        content: 'https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        timestamp: new Date(Date.now() - 7200000),
        isDeleted: false
      },
      {
        id: '6',
        senderId: 0,
        type: 'text',
        content: 'Очень красиво! Ты профессиональный фотограф?',
        timestamp: new Date(Date.now() - 7100000),
        isDeleted: false
      }
    ]
  },
  {
    id: 3,
    userId: 3,
    userName: "София",
    userPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    lastActive: new Date(),
    isOnline: true,
    messages: [
      {
        id: '7',
        senderId: 3,
        type: 'text',
        content: 'Привет! Видел твой новый проект, очень впечатляет! 👏',
        timestamp: new Date(Date.now() - 86400000),
        isDeleted: false
      },
      {
        id: '8',
        senderId: 0,
        type: 'text',
        content: 'Спасибо большое! Я очень старался над ним 😊',
        timestamp: new Date(Date.now() - 86300000),
        isDeleted: false
      }
    ]
  },
  {
    id: 4,
    userId: 4,
    userName: "Екатерина",
    userPhoto: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    lastActive: new Date(Date.now() - 3600000),
    isOnline: false,
    messages: [
      {
        id: '9',
        senderId: 4,
        type: 'text',
        content: 'Готова к завтрашней встрече?',
        timestamp: new Date(Date.now() - 172800000),
        isDeleted: false
      },
      {
        id: '10',
        senderId: 0,
        type: 'text',
        content: 'Да, уже подготовила все материалы!',
        timestamp: new Date(Date.now() - 172700000),
        isDeleted: false
      }
    ]
  },
  {
    id: 5,
    userId: 5,
    userName: "Алиса",
    userPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    lastActive: new Date(),
    isOnline: true,
    messages: [
      {
        id: '11',
        senderId: 5,
        type: 'voice',
        content: '/audio/voice1.webm',
        timestamp: new Date(Date.now() - 259200000),
        isDeleted: false
      },
      {
        id: '12',
        senderId: 0,
        type: 'text',
        content: 'Извини, сейчас не могу прослушать, перезвоню позже!',
        timestamp: new Date(Date.now() - 259100000),
        isDeleted: false
      }
    ]
  },
  {
    id: 6,
    userId: 6,
    userName: "Виктория",
    userPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    lastActive: new Date(Date.now() - 7200000),
    isOnline: false,
    messages: [
      {
        id: '13',
        senderId: 6,
        type: 'video',
        content: '/video/video1.webm',
        timestamp: new Date(Date.now() - 345600000),
        isDeleted: false
      },
      {
        id: '14',
        senderId: 0,
        type: 'text',
        content: 'Классное видео! Обязательно посмотрю полностью вечером',
        timestamp: new Date(Date.now() - 345500000),
        isDeleted: false
      }
    ]
  },
  {
    id: 7,
    userId: 7,
    userName: "Полина",
    userPhoto: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    lastActive: new Date(Date.now() - 14400000),
    isOnline: false,
    messages: [
      {
        id: '15',
        senderId: 7,
        type: 'sticker',
        content: '/stickers/sticker1.png',
        timestamp: new Date(Date.now() - 432000000),
        isDeleted: false
      },
      {
        id: '16',
        senderId: 0,
        type: 'sticker',
        content: '/stickers/sticker2.png',
        timestamp: new Date(Date.now() - 431900000),
        isDeleted: false
      }
    ]
  }
];

const emojis = ['😊', '😂', '❤️', '😍', '👍', '🎉', '🌟', '💕', '🤔', '😎', '😌', '🥰', '😇', '🤗', '😋', '😉', '🙌', '✨', '🔥', '💪'];
const stickers = [
  '/stickers/sticker1.png',
  '/stickers/sticker2.png',
  '/stickers/sticker3.png',
  '/stickers/sticker4.png',
  '/stickers/sticker5.png',
  '/stickers/sticker6.png',
  '/stickers/sticker7.png',
  '/stickers/sticker8.png',
  '/stickers/sticker9.png',
  '/stickers/sticker10.png'
];

const ChatScreen: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isVideoMode, setIsVideoMode] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const startRecording = async (type: 'audio' | 'video') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video'
      });
      
      setMediaStream(stream);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: type === 'video' ? 'video/webm' : 'audio/webm'
        });
        const url = URL.createObjectURL(audioBlob);
        
        if (selectedChat) {
          const newMessage: Message = {
            id: Date.now().toString(),
            senderId: 0,
            type: type === 'video' ? 'video' : 'voice',
            content: url,
            timestamp: new Date(),
            isDeleted: false
          };
          
          addMessage(selectedChat.id, newMessage);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaStream) {
      mediaRecorderRef.current.stop();
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
      setIsRecording(false);
      setIsVideoMode(false);
    }
  };

  const takePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);

      const photoUrl = canvas.toDataURL('image/jpeg');
      stream.getTracks().forEach(track => track.stop());

      if (selectedChat) {
        const newMessage: Message = {
          id: Date.now().toString(),
          senderId: 0,
          type: 'image',
          content: photoUrl,
          timestamp: new Date(),
          isDeleted: false
        };
        
        addMessage(selectedChat.id, newMessage);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const addMessage = (chatId: number, newMessage: Message) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
  };

  const deleteMessage = (chatId: number, messageId: string) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map(msg =>
                msg.id === messageId
                  ? { ...msg, isDeleted: true }
                  : msg
              )
            }
          : chat
      )
    );
  };

  const deleteChat = (chatId: number) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
    }
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 0,
      type: 'text',
      content: message.trim(),
      timestamp: new Date(),
      isDeleted: false
    };

    addMessage(selectedChat.id, newMessage);
    setMessage('');
  };

  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const sendSticker = (stickerUrl: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 0,
      type: 'sticker',
      content: stickerUrl,
      timestamp: new Date(),
      isDeleted: false
    };

    addMessage(selectedChat.id, newMessage);
    setShowStickers(false);
  };

  const renderMessage = (message: Message) => {
    if (message.isDeleted) {
      return <div className="deleted-message">Сообщение удалено</div>;
    }

    switch (message.type) {
      case 'text':
        return <div className="message-text">{message.content}</div>;
      case 'voice':
        return (
          <audio controls className="voice-message">
            <source src={message.content} type="audio/webm" />
          </audio>
        );
      case 'video':
        return (
          <video controls className="video-message">
            <source src={message.content} type="video/webm" />
          </video>
        );
      case 'image':
        return <img src={message.content} alt="Фото" className="image-message" />;
      case 'sticker':
        return <img src={message.content} alt="Стикер" className="sticker-message" />;
      default:
        return null;
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-list">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
            onClick={() => setSelectedChat(chat)}
          >
            <div className="chat-item-photo">
              <img src={chat.userPhoto} alt={chat.userName} />
              {chat.isOnline && <div className="online-indicator" />}
            </div>
            <div className="chat-item-info">
              <div className="chat-item-name">{chat.userName}</div>
              <div className="chat-item-last-message">
                {chat.messages[chat.messages.length - 1]?.content}
              </div>
            </div>
            <button
              className="delete-chat-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {selectedChat ? (
        <div className="chat-content">
          <div className="chat-header">
            <img src={selectedChat.userPhoto} alt={selectedChat.userName} />
            <div className="chat-header-info">
              <div className="chat-header-name">{selectedChat.userName}</div>
              <div className="chat-header-status">
                {selectedChat.isOnline ? 'В сети' : 'Был(а) в сети ' + new Date(selectedChat.lastActive).toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="messages-container">
            {selectedChat.messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.senderId === 0 ? 'sent' : 'received'}`}
              >
                {renderMessage(message)}
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
                {message.senderId === 0 && !message.isDeleted && (
                  <button
                    className="delete-message-button"
                    onClick={() => deleteMessage(selectedChat.id, message.id)}
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <div className="chat-input">
            <div className="input-buttons">
              <button onClick={() => setShowEmojis(!showEmojis)}>😊</button>
              <button onClick={() => setShowStickers(!showStickers)}>🎯</button>
              <button onClick={() => startRecording('audio')}>🎤</button>
              <button onClick={() => {
                setIsVideoMode(true);
                startRecording('video');
              }}>🎥</button>
              <button onClick={takePhoto}>📸</button>
            </div>

            {showEmojis && (
              <div className="emoji-picker">
                {emojis.map(emoji => (
                  <button key={emoji} onClick={() => addEmoji(emoji)}>
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {showStickers && (
              <div className="sticker-picker">
                {stickers.map(sticker => (
                  <button key={sticker} onClick={() => sendSticker(sticker)}>
                    <img src={sticker} alt="Стикер" />
                  </button>
                ))}
              </div>
            )}

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />

            {isRecording ? (
              <button className="stop-recording" onClick={stopRecording}>
                ⏹️ Остановить запись
              </button>
            ) : (
              <button onClick={sendMessage}>➤</button>
            )}
          </div>
        </div>
      ) : (
        <div className="no-chat-selected">
          Выберите чат для начала общения
        </div>
      )}
    </div>
  );
};

export default ChatScreen; 