import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import OnboardingPage from '../app/page';

interface MockImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

import NextImage from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: MockImageProps) => {
    const { src, alt, ...rest } = props;
    return <NextImage src={src} alt={alt || ''} {...rest} />;
  },
}));


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

describe('OnboardingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the onboarding page', () => {
    render(<OnboardingPage />);
    
    expect(screen.getByText(/Welcome To Med/)).toBeInTheDocument();
    expect(screen.getByText(/dical/)).toBeInTheDocument();
  });

  it('should display language selection on first slide', () => {
    render(<OnboardingPage />);
    
    expect(screen.getByText('Choose Your Preferred Language:')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Swahili')).toBeInTheDocument();
    expect(screen.getByText('Amharic')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();
  });

  it('should allow language selection', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    const englishCheckbox = screen.getByRole('checkbox', { name: /english/i });
    expect(englishCheckbox).not.toBeChecked();
    
    await user.click(englishCheckbox);
    expect(englishCheckbox).toBeChecked();
  });

  it('should navigate to next slide when continue is clicked', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    expect(screen.getByText(/Which Country Are You From?/)).toBeInTheDocument();
  });

  it('should show country selection on second slide', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    expect(screen.getByText('Which Country Are You From?')).toBeInTheDocument();
    expect(screen.getByText('Select your country')).toBeInTheDocument();
  });

  it('should show back button on second slide', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('should navigate back to first slide when back is clicked', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    
    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);
    
    expect(screen.getByText('Choose Your Preferred Language:')).toBeInTheDocument();
  });

  it('should open mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    await user.click(menuButton);
    
    
    expect(screen.getAllByText('Home')).toHaveLength(2); 
  });

  it('should navigate to landing page when continue is clicked on last slide', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    
    const finalContinueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(finalContinueButton);
    
    expect(mockPush).toHaveBeenCalledWith('/LandingPage');
  });

  it('should show progress bar with correct percentage', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);
    
    
    const progressBar = document.querySelector('.bg-blue-900');
    expect(progressBar).toHaveStyle('width: 50%');
    
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    await user.click(continueButton);
    
    
    expect(progressBar).toHaveStyle('width: 100%');
  });
});
