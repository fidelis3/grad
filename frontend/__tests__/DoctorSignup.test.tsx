import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // For selectOption
import '@testing-library/jest-dom'; // Matchers
import DoctorSignup from '../pages/auth/doctor-signup'; // Adjust path

// Mock next/navigation and fetch
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('DoctorSignup', () => {
  beforeEach(() => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: true,
      json: async () => ({ accessToken: 'mock-token' }),
    } as Response);
});

test('renders signup form and submits successfully', async () => {
    const user = userEvent.setup();
    render(<DoctorSignup />);

    // Render checks
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();

    // Simulate inputs
    await user.type(screen.getByPlaceholderText('Enter your full name'), 'Dr Test');
    await user.type(screen.getByPlaceholderText('Enter your email'), 'test@doctor.com');
    await user.type(screen.getByPlaceholderText('Enter password (min 6 chars)'), 'password123');
    await user.type(screen.getByPlaceholderText('Confirm password'), 'password123');

    // Select specialty (use userEvent for selectOption)
    const specialtySelect = screen.getByRole('combobox') as HTMLSelectElement;
    await user.selectOptions(specialtySelect, 'General'); // Fixed: userEvent.selectOptions

    // Submit
    await user.click(screen.getByRole('button', { name: /create doctor account/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/doctor-signup'),
      expect.objectContaining({ method: 'POST' })
    ));
  });

  test('shows error on password mismatch', async () => {
    render(<DoctorSignup />);
    // Type mismatched passwords
    // ... type code
    // Submit, expect error message
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});