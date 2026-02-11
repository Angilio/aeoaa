import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Tableau de bord - Trésorier
                </h2>
            }
        >
            <Head title="Dashboard Trésorier" />

            <div className="grid md:grid-cols-3 gap-4">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Total des cotisations</h2>
                        <p className="text-xl font-bold">Ar 0</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
