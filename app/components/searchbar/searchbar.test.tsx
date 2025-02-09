import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SearchBar } from './searchbar';
import React from 'react';

// Mocking next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('SearchBar Component', () => {
  let replaceMock: jest.Mock;

  beforeEach(() => {
    replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (usePathname as jest.Mock).mockReturnValue('/movies');
  });

  it('renders the input element with the correct placeholder', () => {
    render(<SearchBar placeholder="Search movies or TV shows..." />);
    const input = screen.getByPlaceholderText('Search movies or TV shows...');
    expect(input).toBeInTheDocument();
  });

  it('updates the query param when input changes', async () => {
    render(<SearchBar placeholder="Search movies or TV shows..." />);
    const input = screen.getByPlaceholderText('Search movies or TV shows...');

    // Simulate typing 'Inception' in the search input
    fireEvent.change(input, { target: { value: 'Inception' } });

    // Wait for debounce to complete
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(
        '/movies?query=Inception', // Based on the mocked pathname
        { scroll: false }
      );
    });
  });

  it('removes the query param when input is cleared', async () => {
    render(<SearchBar placeholder="Search movies or TV shows..." />);
    const input = screen.getByPlaceholderText('Search movies or TV shows...');

    // Simulate typing 'Inception' in the search input
    fireEvent.change(input, { target: { value: 'Inception' } });

    jest.advanceTimersByTime(350);

    // Simulate clearing the input
    fireEvent.change(input, { target: { value: '' } });

    jest.advanceTimersByTime(350);

    // Wait for debounce to complete
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(
        '/movies', // Ensure the query param is removed and pathname remains
        { scroll: false }
      );
    });
  });

  it('debounces the search input changes', async () => {
    jest.useFakeTimers(); // Mock timers for debouncing

    render(<SearchBar placeholder="Search movies or TV shows..." />);
    const input = screen.getByPlaceholderText('Search movies or TV shows...');

    // Simulate typing 'Incep' and 'Inception' in the search input
    fireEvent.change(input, { target: { value: 'Incep' } });
    fireEvent.change(input, { target: { value: 'Inception' } });

    // Simulate debounce timeout
    jest.advanceTimersByTime(350);

    // Check that replace was called with the correct query parameter
    expect(replaceMock).toHaveBeenCalledWith(
      '/movies?query=Inception',
      { scroll: false }
    );

    jest.useRealTimers(); // Restore real timers
  });

  it('calls replace with different paths when pathname changes', async () => {
    // Mock pathname to simulate a different route, e.g., /tvshows
    (usePathname as jest.Mock).mockReturnValue('/tvshows');

    render(<SearchBar placeholder="Search TV shows..." />);
    const input = screen.getByPlaceholderText('Search TV shows...');

    // Simulate typing 'Breaking Bad' in the search input
    fireEvent.change(input, { target: { value: 'Breaking Bad' } });

    // Wait for debounce to complete
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(
        '/tvshows?query=Breaking+Bad',
        { scroll: false }
      );
    });
  });
});
