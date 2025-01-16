import { render, screen, fireEvent } from '@testing-library/react';
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
    (usePathname as jest.Mock).mockReturnValue('/search');
  });

  it('renders the input element with the correct placeholder', () => {
    render(<SearchBar placeholder="Search movies or TV shows..." />);
    const input = screen.getByPlaceholderText('Search movies or TV shows...');
    expect(input).toBeInTheDocument();
  });

  it('updates the query param when input changes', async () => {
    render(<SearchBar placeholder="Search movies or TV shows..." />);
    const input = screen.getByPlaceholderText('Search movies or TV shows...');

    fireEvent.change(input, { target: { value: 'Inception' } });
    expect(replaceMock).toHaveBeenCalledWith(
      '/search?query=Inception',
      { scroll: false }
    );
  });

  it('removes the query param when input is cleared', async () => {
    render(<SearchBar placeholder="Search movies or TV shows..." />);
    const input = screen.getByPlaceholderText('Search movies or TV shows...');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.change(input, { target: { value: '' } });

    expect(replaceMock).toHaveBeenCalledWith('/search', { scroll: false });
  });

  it('debounces the search input changes', async () => {
    jest.useFakeTimers();
    render(<SearchBar placeholder="Search movies or TV shows..." />);
    const input = screen.getByPlaceholderText('Search movies or TV shows...');

    fireEvent.change(input, { target: { value: 'Incep' } });
    fireEvent.change(input, { target: { value: 'Inception' } });

    // Simulate debounce timeout
    jest.advanceTimersByTime(350);

    expect(replaceMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith(
      '/search?query=Inception',
      { scroll: false }
    );

    jest.useRealTimers();
  });
});
