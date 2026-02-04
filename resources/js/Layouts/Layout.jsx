import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from './AuthenticatedLayout';
import AdminSidebar from '@/Components/AdminSidebar';
import ReceptionSidebar from '@/Components/ReceptionSidebar';

export default function Layout({ children, header = null }) {
    const { auth } = usePage().props;
    const role = auth?.user?.roles?.[0]?.name; // Admin | Receptioniste | Client

    return (
        <AuthenticatedLayout>
            <div className="flex min-h-screen w-full overflow-hidden">
                
                {/* SIDEBAR */}
                {(role === 'Admin' || role === 'Receptioniste') && (
                    <aside className="hidden md:block w-64 bg-white border-r flex-shrink-0">
                        {role === 'Admin' && <AdminSidebar />}
                        {role === 'Receptioniste' && <ReceptionSidebar />}
                    </aside>
                )}

                {/* CONTENU */}
                <div className="flex-1 flex flex-col min-w-0">

                    {/* HEADER OPTIONNEL */}
                    {header && (
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    {/* MAIN → SCROLL HORIZONTAL AUTORISÉ */}
                    <main className="flex-1 p-6 overflow-x-auto">
                        {children}
                    </main>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
