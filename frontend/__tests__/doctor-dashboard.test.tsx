import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import Dashboard from '../pages/doctor/dashboard';
import axios from 'axios';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should redirect to signin when no token is available', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/auth/doctor-signin');
    });
  });

  it('should display loading state initially', () => {
    localStorageMock.getItem.mockReturnValue('valid-token');
    mockedAxios.get.mockResolvedValue({
      data: {
        user: { fullname: 'Dr. John Doe', specialty: 'Cardiology' },
        appointmentCount: 5
      }
    });

    render(<Dashboard />);
    
    expect(screen.getByText('Loading dashboard data...')).toBeInTheDocument();
  });

  it('should display dashboard data when loaded successfully', async () => {
    localStorageMock.getItem.mockReturnValue('valid-token');
    const mockData = {
      user: { fullname: 'Dr. John Doe', specialty: 'Cardiology', email: 'john@example.com', _id: '123' },
      appointmentCount: 5
    };
    
    mockedAxios.get.mockResolvedValue({ data: mockData });

    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome, Dr. John Doe')).toBeInTheDocument();
      expect(screen.getByText('Specialty: Cardiology')).toBeInTheDocument();
      expect(screen.getByText('Pending Appointments: 5')).toBeInTheDocument();
    });
  });

  it('should display error state when API call fails', async () => {
    localStorageMock.getItem.mockReturnValue('valid-token');
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Error loading dashboard')).toBeInTheDocument();
      expect(screen.getByText('Network error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });
  });

  it('should call API with correct headers when token is available', async () => {
    const token = 'valid-token';
    localStorageMock.getItem.mockReturnValue(token);
    mockedAxios.get.mockResolvedValue({
      data: {
        user: { fullname: 'Dr. John Doe', specialty: 'Cardiology' },
        appointmentCount: 5
      }
    });

    render(<Dashboard />);
    
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:5000/doctor/dashboard',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    });
  });

  it('should render sidebar navigation correctly', () => {
    localStorageMock.getItem.mockReturnValue('valid-token');
    
    render(<Dashboard />);
    
    expect(screen.getByText('Meddical')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});