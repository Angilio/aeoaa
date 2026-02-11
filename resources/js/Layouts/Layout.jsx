import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from './AuthenticatedLayout';
import { roleSidebarMap } from './RoleSidebarMap';

export default function Layout({ children, header = null }) {
    const { auth } = usePage().props;
    const roleName = auth?.user?.roles?.[0]?.name;

    const SidebarComponent = roleSidebarMap[roleName];

    return (
        <AuthenticatedLayout>
            <div className="flex min-h-screen w-full overflow-hidden bg-base-100">

                {/* SIDEBAR */}
                {SidebarComponent && (
                    <aside className="hidden md:block w-64 bg-base-200 border-r border-base-300 rounded-xl">
                        <SidebarComponent />
                    </aside>
                )}

                {/* CONTENU */}
                <div className="flex-1 flex flex-col min-w-0">

                    {/* HEADER OPTIONNEL */}
                    {header && (
                        <header className="shadow border-b border-base-300">
                            <div className="mx-auto max-w-7xl px-4 py-6 text-base-content">
                                {header}
                            </div>
                        </header>
                    )}

                    {/* MAIN */}
                    <main className="flex-1 text-base-content overflow-x-auto">
                        {children}
                    </main>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
