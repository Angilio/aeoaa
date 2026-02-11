import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Link, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Trash2, FileText, X, Edit2 } from 'lucide-react';

export default function Index({ attributions }) {
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        router.delete(`/attributions/${id}`);
        setDeleteId(null); // fermer le modal
    };

    return (
        <Layout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight">Attributions</h2>
                    <Link href="/attributions/create" className="btn btn-primary">
                        Nouvelle attribution
                    </Link>
                </div>
            }
        >
            <Head title="Les attributions"/>
            <div className="px-4 py-6 bg-base-100 rounded-lg shadow">
                <div className="flex justify-end mb-4">
                    <Link
                        href={route('attributions.export.pdf')}
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
                                <td className="text-center">{attr.user?.name || '-'}</td>
                                <td className="text-center">
                                    {attr.user?.roles?.length > 0 
                                        ? attr.user.roles.map(r => r.name).join(', ') 
                                        : '-'}
                                </td>
                                <td className="text-center">{attr.logement?.name || '-'}</td>
                                <td className="text-center">{attr.date_debut || '-'}</td>
                                <td className="text-center">{attr.date_fin || '-'}</td>
                                <td className="flex gap-2 justify-center">
                                    {/* Bouton Modifier */}
                                    <Link
                                        href={route('attributions.edit', attr.id)} // <-- ici on met l'ID
                                        className="btn btn-primary btn-sm flex items-center gap-1"
                                    >
                                        <Edit2 size={18} />
                                    </Link>

                                    {/* Bouton Supprimer */}
                                    <button
                                        onClick={() => setDeleteId(attr.id)}
                                        className="btn btn-error btn-sm flex items-center gap-1"
                                    >
                                        <Trash2 size={18} />
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

            {/* Modal DaisyUI */}
            {deleteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Confirmer la suppression</h3>
                            <button onClick={() => setDeleteId(null)}><X size={20} /></button>
                        </div>
                        <p>Voulez-vous vraiment supprimer cette attribution ?</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="btn btn-outline"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => handleDelete(deleteId)}
                                className="btn btn-error"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
