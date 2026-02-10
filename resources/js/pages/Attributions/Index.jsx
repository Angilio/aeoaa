import React from 'react';
import { router } from '@inertiajs/react';
import { Link, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Trash2, FileText } from 'lucide-react';

export default function Index({ attributions }) {

    const handleDelete = (id) => {
        if (confirm('Supprimer cette attribution ?')) {
            Inertia.delete(`/attributions/${id}`);
        }
    };

    return (
        <Layout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight">Attributions</h2>
                    <Link
                        href="/attributions/create"
                        className="btn btn-primary"
                    >
                        Nouvelle attribution
                    </Link>
                </div>
            }
        >
            <Head title="Les attributions"/>
            <div className="px-4 py-6 bg-base-100 rounded-lg shadow">
                <div className="flex justify-end mb-4">
                    <Link
                        href="/attributions/export-pdf"
                        className="btn btn-outline btn-primary flex items-center gap-2"
                    >
                        <FileText size={16} /> Exporter PDF
                    </Link>
                </div>

                <table className="table w-full table-zebra">
                    <thead>
                        <tr>
                            <th className="text-center">Utilisateur</th>
                            <th className="text-center">Rôle</th>
                            <th className="text-center">Logement</th>
                            <th className="text-center">Date début</th>
                            <th className="text-center">Date fin</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributions.map(attr => (
                            <tr key={attr.id}>
                                <td className="text-center">{attr.user.name}</td>
                                <td className="text-center">{attr.user.roles.map(r => r.name).join(', ')}</td>
                                <td className="text-center">{attr.logement.name}</td>
                                <td className="text-center">{attr.date_debut}</td>
                                <td className="text-center">{attr.date_fin || '-'}</td>
                                <td className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleDelete(attr.id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {attributions.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    Aucune attribution trouvée.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
