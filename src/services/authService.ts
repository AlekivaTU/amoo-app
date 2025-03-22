import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

// Тестовые учетные данные
const TEST_CREDENTIALS = {
  email: 'test@amoo.app',
  password: 'test123',
};

const MOCK_USER = {
  id: '1',
  username: 'Тестовый Пользователь',
  email: TEST_CREDENTIALS.email,
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  createdAt: new Date().toISOString(),
  lastSeen: new Date().toISOString(),
  isOnline: true,
};

class AuthService {
  private static instance: AuthService;
  private token: string | null = localStorage.getItem('token');

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));

    if (credentials.email === TEST_CREDENTIALS.email && 
        credentials.password === TEST_CREDENTIALS.password) {
      const mockToken = 'mock_jwt_token_' + Date.now();
      this.setToken(mockToken);
      return {
        user: MOCK_USER,
        token: mockToken,
      };
    }

    throw new Error('Неверный email или пароль');
  }

  public async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));

    if (credentials.email === TEST_CREDENTIALS.email) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const mockToken = 'mock_jwt_token_' + Date.now();
    this.setToken(mockToken);
    
    return {
      user: {
        ...MOCK_USER,
        id: Date.now().toString(),
        email: credentials.email,
        username: credentials.username,
      },
      token: mockToken,
    };
  }

  public async logout(): Promise<void> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 300));
    this.removeToken();
  }

  public async getCurrentUser(): Promise<AuthResponse> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!this.token) {
      throw new Error('Не авторизован');
    }

    return {
      user: MOCK_USER,
      token: this.token,
    };
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  public getToken(): string | null {
    return this.token;
  }
}

export default AuthService.getInstance(); 