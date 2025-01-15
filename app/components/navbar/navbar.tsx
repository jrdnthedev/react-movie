"use client";
import Link from 'next/link';
import { NavLinks } from '../navlinks/navlinks';
import React from 'react';

export function NavBar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold dark:text-white"><Link href='/'>Movie Search App</Link></h1>
            <ul className="flex space-x-4">
                <NavLinks />
            </ul>
        </nav>
    )
}