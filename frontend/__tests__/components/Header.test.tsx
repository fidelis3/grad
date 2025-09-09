import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import Header from '../../app/components/Header';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/',
        href: 'http://localhost',
      },
      writable: true,
    });
  });

  it('should render header component', () => {
    render(<Header />);
    
    expect(screen.getByText('MED')).toBeInTheDocument();
    expect(screen.getByText('DICAL')).toBeInTheDocument();
  });

  it('should display emergency contact information', () => {
    render(<Header />);
    
    expect(screen.getAllByText('EMERGENCY')).toHaveLength(2); 
    expect(screen.getAllByText('(237) 681-812-255')).toHaveLength(2);
  });

  it('should display work hours', () => {
    render(<Header />);
    
    expect(screen.getAllByText('WORK HOUR')).toHaveLength(2);
    expect(screen.getAllByText('09:00 - 20:00 Everyday')).toHaveLength(2);
  });

  it('should display location information', () => {
    render(<Header />);
    
    expect(screen.getAllByText('LOCATION')).toHaveLength(2);
    expect(screen.getAllByText('Nairobi, Kenya')).toHaveLength(2);
  });

  it('should have navigation links', () => {
    render(<Header />);
    
    expect(screen.getAllByText('Home')).toHaveLength(2); 
    expect(screen.getAllByText('Services')).toHaveLength(2);
    expect(screen.getAllByText('Doctors')).toHaveLength(2);
    expect(screen.getAllByText('News')).toHaveLength(2);
    expect(screen.getAllByText('Contact')).toHaveLength(2);
  });

  it('should have signup and login buttons', () => {
    render(<Header />);
    
    expect(screen.getAllByText('SIGNUP')).toHaveLength(2); 
    expect(screen.getAllByText('LOGIN')).toHaveLength(2);
  });

  it('should have appointment button', () => {
    render(<Header />);
    
    expect(screen.getAllByText('Appointment')).toHaveLength(2); 
  });

  it('should navigate to register page when signup is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const signupButtons = screen.getAllByText('SIGNUP');
    await user.click(signupButtons[0]); 
    
    expect(mockPush).toHaveBeenCalledWith('/Register');
  });

  it('should navigate to login page when login is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const loginButtons = screen.getAllByText('LOGIN');
    await user.click(loginButtons[0]); 
    
    expect(mockPush).toHaveBeenCalledWith('/Login');
  });

  it('should toggle mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    
    expect(screen.getByText('Menu')).toBeInTheDocument();
    
    
    await user.click(menuButton);
    
    
    expect(screen.getAllByText('Home')).toHaveLength(2); 
  });

  it('should navigate to home when home is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const homeButtons = screen.getAllByText('Home');
    await user.click(homeButtons[0]); 
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should navigate to news page when news is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const newsButtons = screen.getAllByText('News');
    await user.click(newsButtons[0]); 
    
    expect(mockPush).toHaveBeenCalledWith('/News');
  });
});
