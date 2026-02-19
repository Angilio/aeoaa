import Layout from '@/Layouts/Layout';
import { Head, router } from '@inertiajs/react';
import { FileDown } from 'lucide-react';

export default function Rapports({ membres, totalMembres, filtre }) {

    const changerFiltre = (valeur) => {
        router.get(route('tresorier.rapports'), { filtre: valeur }, { preserveState: true });
    };

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Rapport des Membres - Droit Annuel
                </h2>
            }
        >
            <Head title="Rapports" />

            <div className="p-6 space-y-6">

                {/* 🔹 Filtres + Export */}
                <div className="flex justify-between items-center flex-wrap gap-4">

                    <div className="flex gap-2">
                        <button
                            onClick={() => changerFiltre('tous')}
                            className={`btn ${filtre === 'tous' ? 'btn-primary' : 'btn-ghost'}`}
                        >
                            Tous
                        </button>

                        <button
                            onClick={() => changerFiltre('actifs')}
                            className={`btn ${filtre === 'actifs' ? 'btn-success' : 'btn-ghost'}`}
                        >
                            Actifs
                        </button>

                        <button
                            onClick={() => changerFiltre('non_actifs')}
                            className={`btn ${filtre === 'non_actifs' ? 'btn-error' : 'btn-ghost'}`}
                        >
                            Non Actifs
                        </button>
                    </div>

                    <a
                        href={route('tresorier.rapports.pdf', { filtre })}
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <FileDown size={18} />
                        Exporter PDF
                    </a>
                </div>

                {/* 🔹 Tableau */}
                <div className="overflow-x-auto bg-base-100 shadow rounded">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Adresse</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {membres.length > 0 ? (
                                membres.map((membre) => (
                                    <tr key={membre.id}>
                                        <td>{membre.name}</td>
                                        <td>{membre.adresse}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    membre.paye
                                                        ? 'badge-success'
                                                        : 'badge-error'
                                                }`}
                                            >
                                                {membre.paye ? 'Payé' : 'Non payé'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">
                                        Aucun membre trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 🔹 Total */}
                <div className="text-right font-bold text-lg">
                    Total des membres : {totalMembres}
                </div>

            </div>
        </Layout>
    );
}
