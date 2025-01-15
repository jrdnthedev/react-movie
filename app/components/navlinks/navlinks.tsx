"use client";
import Link from "next/link";

export function NavLinks () {
    return (
        <>
        <li><Link href='/movies'>Movies</Link></li>
        <li><Link href='/tvshows'>Tv Shows</Link></li>
        </>
    )
}