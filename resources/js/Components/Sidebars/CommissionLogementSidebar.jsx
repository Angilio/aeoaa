import { Link } from '@inertiajs/react';
import {
    Home,
    Building2,
    ClipboardList,
    CheckCircle,
} from 'lucide-react';

export default function CommissionLogementSidebar() {

    const isActive = (name) => route().current(name);

    const linkClass = (active) =>
        active
            ? 'flex items-center gap-3 rounded bg-primary text-primary-content px-3 py-2 font-semibold'
            : 'flex items-center gap-3 rounded px-3 py-2 hover:bg-base-300 text-base-content';

    return (
        <div className="p-4 min-h-screen flex flex-col bg-base-200">
            
            {/* Titre */}
            <h2 className="font-bold mb-8 text-center text-base-content text-lg">
                Commission de logement
            </h2>

            {/* Menu */}
            <ul className="flex-1 space-y-2">

                {/* Dashboard */}
                <li>
                    <Link
                        href={route('dashboard')}
                        className={linkClass(isActive('dashboard'))}
                    >
                        <Home size={18} />
                        <span>Tableau de bord</span>
                    </Link>
                </li>

                {/* Logements */}
                <li>
                    <Link
                        href={route('logements.index')}
                        className={linkClass(isActive('logements.*'))}
                    >
                        <Building2 size={18} />
                        <span>Logements</span>
                    </Link>
                </li>

                {/* Demandes */}
                {/* <li>
                    <Link
                        href={route('demandes.index')}
                        className={linkClass(isActive('demandes.*'))}
                    >
                        <ClipboardList size={18} />
                        <span>Demandes</span>
                    </Link>
                </li> */}

                {/* Attributions */}
                {/* <li>
                    <Link
                        href={route('attributions.index')}
                        className={linkClass(isActive('attributions.*'))}
                    >
                        <CheckCircle size={18} />
                        <span>Attributions</span>
                    </Link>
                </li> */}

            </ul>

            {/* Footer */}
            <div className="pt-4 border-t border-base-300 text-center text-sm opacity-70">
                Gestion des logements étudiants
            </div>
        </div>
    );
}
