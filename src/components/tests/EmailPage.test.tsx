import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import EmailPage from '../EmailPage';

describe('EmailPage', () => {

  it('should render the email input form', () => {
    render(<EmailPage />);
    expect(screen.getByTestId("reset-password-email-form")).toBeInTheDocument();
    expect(screen.getByTestId("reset-password-email-input")).toBeInTheDocument();
    expect(screen.getByText("Send Reset Link")).toBeInTheDocument();
  });

  it('should show an error for invalid email', async () => {
    render(<EmailPage />);
    const emailInput = screen.getByTestId("reset-password-email-input");
    const submitButton = screen.getByTestId("reset-password-email-submit-btn");

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(await screen.findByTestId("reset-password-email-errorText")).toHaveTextContent('Please enter a valid email address');
  });
});
