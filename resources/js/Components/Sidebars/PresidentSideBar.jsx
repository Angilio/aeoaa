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
                        href={route('dashboard')}
                        className={linkClass(isActive('dashboard'))}
                    >
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        href={route('membres.index')}
                        className={linkClass(isActive('membres.index'))}
                    >
                        Gestion des membres
                    </Link>
                </li>
                

                {/*
                <li>
                    <Link
                        href={route('finances.index')}
                        className={linkClass(isActive('finances.index'))}
                    >
                        Finances
                    </Link>
                </li>
                */}
            </ul>
        </div>
    );
}
