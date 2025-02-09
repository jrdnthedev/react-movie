import { render, screen } from '@testing-library/react';
import { RatingBadge } from './rating-badge';
import React from 'react';

describe("RatingBadge", () => {
    it("renders the rounded rating correctly", () => {
        const rating = 8.6789;
        render(<RatingBadge rating={rating} />);

        // Ensure the fixed rating is rounded to two decimal places
        const expectedRating = Math.round((rating + Number.EPSILON) * 100) / 100;

        // Check if the rounded rating is rendered correctly
        const badge = screen.getByText(expectedRating.toString());
        expect(badge).toBeInTheDocument();
    });
});