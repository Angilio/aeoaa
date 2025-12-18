import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Gestion du thème DaisyUI
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme") || "light";
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="min-h-screen bg-base-100 text-base-content">
            <nav className="navbar border-b shadow-md bg-base-100 px-4">
                <div className="flex-1 flex items-center">
                    <Link href="/">
                        <ApplicationLogo className="h-9 w-auto" />
                    </Link>

                    <div className="hidden sm:flex sm:space-x-4 ml-10">
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="btn btn-ghost btn-sm"
                        >
                            Dashboard
                        </NavLink>
                    </div>
                </div>

                <div className="flex-none flex items-center gap-2">
                    {/* BOUTON LIGHT / DARK */}
                    <button onClick={toggleTheme} className="btn btn-circle btn-ghost">
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    {/* DROPDOWN UTILISATEUR */}
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="btn btn-ghost rounded-btn ml-2">
                                {user.name}
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Déconnexion
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>

                    {/* MENU RESPONSIVE */}
                    <div className="sm:hidden ml-2">
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {showingNavigationDropdown && (
                    <div className="sm:hidden mt-2 p-2 bg-base-200 rounded-box shadow-inner">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="btn btn-ghost w-full"
                        >
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('profile.edit')} className="btn btn-ghost w-full mt-1">
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="btn btn-ghost w-full mt-1"
                        >
                            Déconnexion
                        </ResponsiveNavLink>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-base-200 shadow">
                    <div className="container mx-auto px-4 py-6">{header}</div>
                </header>
            )}

            <main className="container mx-auto px-4 py-6">{children}</main>
        </div>
    );
}
