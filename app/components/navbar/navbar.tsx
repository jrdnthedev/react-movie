import Link from 'next/link';

export function NavBar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold dark:text-white">Movie Search App</h1>
            <ul className="flex space-x-4">
            <li><Link href='/dashboard'>Dashboard</Link></li>
            </ul>
        </nav>
    )
}