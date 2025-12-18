import { Link } from '@inertiajs/react';
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavBar({ auth }) {

    const [theme, setTheme] = useState("light");

    // Charger le thème
    useEffect(() => {
        const saved = localStorage.getItem("theme") || "light";
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved); // ← DAISYUI OBLIGATOIRE
    }, []);

    // Changeur de thème
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme); // ← DAISYUI
        localStorage.setItem("theme", newTheme);
    };

    return (
        <nav className="w-full flex justify-end items-center gap-4 bg-base-100 px-6 py-4 shadow-lg">

            {/* BOUTON LIGHT / DARK */}
            <button
                onClick={toggleTheme}
                className="btn btn-circle btn-ghost"
            >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* AUTH */}
            {auth?.user ? (
                <Link
                    href={route('dashboard')}
                    className="px-3 py-2"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href={route('login')}
                        className='px-3 py-2'
                    >
                        Connecter
                    </Link>
                </>
            )}
        </nav>
    );
}
