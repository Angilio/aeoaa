import React from 'react';
import { Home, User2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function PresidentSidebar() {
    const isActive = (name) => route().current(name);

    const linkClass = (active) =>
        active
            ? 'block rounded bg-primary text-primary-content px-3 py-2 font-semibold'
            : 'block rounded px-3 py-2 hover:bg-base-300 text-base-content';

    return (
        <div className="p-4 min-h-screen flex flex-col bg-base-200">
            <h2 className="font-bold mb-6 text-center text-base-content text-lg">
                Président
            </h2>

            <ul className="flex-1 space-y-2">
                <li>
                    <Link
                        href={route('president.dashboard')}
                        className={linkClass(isActive('president.dashboard'))}
                    >
                        <Home size={18} />Tableau de bord
                    </Link>
                </li>

                <li>
                    <Link
                        href={route('membres.index')}
                        className={linkClass(isActive('membres.index'))}
                    >
                        <User2 size={18} />Gestion des membres
                    </Link>
                </li>
            </ul>
        </div>
    );
}
