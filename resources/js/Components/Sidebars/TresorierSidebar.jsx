import React from 'react';
import { Home, DollarSign, FileText } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function TresorierSidebar() {
    const isActive = (name) => route().current(name);

    const linkClass = (active) =>
        active
            ? 'flex items-center gap-2 rounded bg-primary text-primary-content px-3 py-2 font-semibold'
            : 'flex items-center gap-2 rounded px-3 py-2 hover:bg-base-300 text-base-content';

    return (
        <div className="p-4 min-h-screen flex flex-col bg-base-200">
            <h2 className="font-bold mb-6 text-center text-base-content text-lg">
                Trésorier
            </h2>

            <ul className="flex-1 space-y-2">
                <li>
                    <Link
                        href={route('tresorier.dashboard')}
                        className={linkClass(isActive('tresorier.dashboard'))}
                    >
                        <Home size={18} />
                        Tableau de bord
                    </Link>
                </li>

                <li>
                    <Link
                        href={route('tresorier.finances')}
                        className={linkClass(isActive('tresorier.finances'))}
                    >
                        <DollarSign size={18} />
                        Gestion des finances
                    </Link>
                </li>

                <li>
                    <Link
                        href={route('tresorier.rapports')}
                        className={linkClass(isActive('tresorier.rapports'))}
                    >
                        <FileText size={18} />
                        Rapports
                    </Link>
                </li>
            </ul>
        </div>
    );
}
