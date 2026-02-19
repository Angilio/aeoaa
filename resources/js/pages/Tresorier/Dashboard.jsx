import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Head, router } from '@inertiajs/react';
import { ArrowUpCircle, ArrowDownCircle, CreditCard } from 'lucide-react';

export default function Dashboard({ annees, annee_selectionnee, totauxMois }) {
    const [annee, setAnnee] = useState(annee_selectionnee);
    const [mois, setMois] = useState(new Date().getMonth() + 1); // mois courant

    const moisLabels = [
        'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
        'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
    ];

    const moisActuel = totauxMois[mois] || { entrees: 0, sorties: 0, solde: 0 };

    const changerAnnee = (newAnnee) => {
        setAnnee(newAnnee);
        router.get(route('tresorier.dashboard'), { annee: newAnnee }, { preserveState: true });
    };

    return (
        <Layout
            header={<h2 className="text-xl font-semibold leading-tight">Tableau de bord - Trésorier</h2>}
        >
            <Head title="Dashboard Trésorier" />

            <div className="p-6 rounded shadow space-y-4">

                {/* 🔹 Années */}
                <div className="flex gap-2 flex-wrap mb-4">
                    {annees.map(a => (
                        <button
                            key={a}
                            className={`btn ${a === annee ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => changerAnnee(a)}
                        >
                            {a}
                        </button>
                    ))}
                </div>

                {/* 🔹 Mois */}
                <div className="flex gap-2 flex-wrap mb-6">
                    {moisLabels.map((label, idx) => {
                        const numMois = idx + 1;
                        return (
                            <button
                                key={numMois}
                                className={`btn ${mois === numMois ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setMois(numMois)}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                {/* 🔹 Cartes Totaux du mois */}
                <div className="grid md:grid-cols-3 gap-4">
                    {/* Entrées */}
                    <div className="card bg-green-500 shadow p-4 text-white flex items-center gap-4">
                        <ArrowDownCircle size={48} />
                        <div>
                            <h2 className="card-title">Total Entrées</h2>
                            <p className="text-xl font-bold">{moisActuel.entrees} Ar</p>
                        </div>
                    </div>

                    {/* Sorties */}
                    <div className="card bg-red-500 shadow p-4 text-white flex items-center gap-4">
                        <ArrowUpCircle size={48} />
                        <div>
                            <h2 className="card-title">Total Sorties</h2>
                            <p className="text-xl font-bold">{moisActuel.sorties} Ar</p>
                        </div>
                    </div>

                    {/* Solde */}
                    <div className="card bg-blue-500 shadow p-4 text-white flex items-center gap-4">
                        <CreditCard size={48} />
                        <div>
                            <h2 className="card-title">Solde du mois</h2>
                            <p className="text-xl font-bold">
                                {moisActuel.solde} Ar
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
