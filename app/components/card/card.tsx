"use client";
import { Media } from "@/app/lib/types";
import { RatingBadge } from "../rating-badge/rating-badge"

interface CardProps {
    data: Media;
  }
  
export function Card({ data }: CardProps) {
    const isMovie = "title" in data;
    return (
        <div className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={data.id}>
            <a href="#">
                <img className="rounded-t-lg" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={isMovie ? data.title : data.name } />
            </a>
            <RatingBadge rating={data.vote_average} />
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{isMovie ? data.title : data.name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">original title: {isMovie ? data.original_title : data.original_name}</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    )
}