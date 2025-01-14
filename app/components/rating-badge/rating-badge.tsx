"use client";
import React from 'react';

export function RatingBadge ({rating}: {rating: number}) {
    const fixedRating = Math.round((rating + Number.EPSILON) * 100) / 100;
    return (
        <div className="absolute inline-flex items-center justify-center w-16 h-16 text-xs font-bold text-white bg-gray-700 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{fixedRating}</div>
    )
}