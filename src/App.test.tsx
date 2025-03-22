import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Amoo App', () => {
  test('renders all navigation buttons', () => {
    render(<App />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
    expect(buttons[0]).toHaveTextContent('Discover');
    expect(buttons[1]).toHaveTextContent('Map');
    expect(buttons[2]).toHaveTextContent('Profile');
    expect(buttons[3]).toHaveTextContent('Chats');
    expect(buttons[4]).toHaveTextContent('Live');
  });

  test('shows Discover screen by default', () => {
    render(<App />);
    
    expect(screen.getByText('Find your perfect match')).toBeInTheDocument();
  });

  test('can navigate between screens', () => {
    render(<App />);
    
    // Click Map button and check if Map screen is shown
    fireEvent.click(screen.getByRole('button', { name: 'Map' }));
    expect(screen.getByText('Explore people nearby')).toBeInTheDocument();
    
    // Click Profile button and check if Profile screen is shown
    fireEvent.click(screen.getByRole('button', { name: 'Profile' }));
    expect(screen.getByText('Edit your profile')).toBeInTheDocument();
    
    // Click Chats button and check if Chats screen is shown
    fireEvent.click(screen.getByRole('button', { name: 'Chats' }));
    expect(screen.getByText('Your conversations')).toBeInTheDocument();
    
    // Click Live button and check if Live screen is shown
    fireEvent.click(screen.getByRole('button', { name: 'Live' }));
    expect(screen.getByText('Watch and stream live')).toBeInTheDocument();
    
    // Return to Discover screen
    fireEvent.click(screen.getByRole('button', { name: 'Discover' }));
    expect(screen.getByText('Find your perfect match')).toBeInTheDocument();
  });

  test('maintains correct screen state after navigation', () => {
    render(<App />);
    
    // Navigate to Profile
    fireEvent.click(screen.getByRole('button', { name: 'Profile' }));
    expect(screen.getByText('Edit your profile')).toBeInTheDocument();
    
    // Navigate to Chats and back to Profile
    fireEvent.click(screen.getByRole('button', { name: 'Chats' }));
    fireEvent.click(screen.getByRole('button', { name: 'Profile' }));
    expect(screen.getByText('Edit your profile')).toBeInTheDocument();
  });
});
