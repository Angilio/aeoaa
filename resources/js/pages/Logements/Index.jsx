import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";
import Layout from '@/Layouts/Layout';

export default function Index({ logements }) {
    const [filterType, setFilterType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [toDeleteId, setToDeleteId] = useState(null);

    const itemsPerPage = 5;
    const types = ["PV", "PJ", "Bloc", "BM", "BR"]; 

    const handleDelete = (id) => {
        router.delete(`/logements/${id}`);
        setModalOpen(false);
        setToDeleteId(null);
    };

    const confirmDelete = (id) => {
        setToDeleteId(id);
        setModalOpen(true);
    };

    const filtered = logements.filter(l =>
        filterType === "all" ? true : l.type_logement?.type === filterType
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filtered.slice(startIndex, endIndex);

    const handleFilterChange = (type) => {
        setFilterType(type);
        setCurrentPage(1);
    };

    return (
        <Layout header={<h2 className="text-xl font-semibold leading-tight">Logements</h2>}>
            <Head title="Les logements" />
            <div className="px-4 bg-base-100 text-base-content rounded-lg shadow p-4">

                {/* Header: filtres + bouton ajouter */}
                <div className="flex justify-between mb-4 items-center">
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleFilterChange("all")}
                            className={`btn btn-sm ${filterType === "all" ? "btn-primary" : ""}`}
                        >
                            Tous
                        </button>
                        {types.map(t => (
                            <button
                                key={t}
                                onClick={() => handleFilterChange(t)}
                                className={`btn btn-sm ${filterType === t ? "btn-primary" : ""}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <Link href="/logements/create" className="btn btn-primary">
                        Ajouter un logement
                    </Link>
                </div>

                {/* Tableau */}
                <table className="table w-full table-zebra">
                    <thead>
                        <tr>
                            <th className="text-center">Nom</th>
                            <th className="text-center">Nombre de places</th>
                            <th className="text-center">Type</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(l => (
                            <tr key={l.id}>
                                <td className="text-center">{l.name}</td>
                                <td className="text-center">{l.nbrPlace}</td>
                                <td className="text-center">{l.type_logement?.type}</td>
                                <td className="flex gap-2 justify-center">
                                    <Link href={`/logements/${l.id}/edit`} className="btn btn-primary btn-sm">
                                        <Pencil size={16} />
                                    </Link>
                                    <button
                                        onClick={() => confirmDelete(l.id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-end items-center gap-2 mt-4">
                    <span className="text-sm">
                        Page {currentPage} sur {totalPages} ({filtered.length} logement{filtered.length > 1 ? 's' : ''})
                    </span>
                    
                    <div className="join">
                        <button 
                            className="join-item btn btn-sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        
                        <button 
                            className="join-item btn btn-sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Modal de confirmation */}
                {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Confirmer la suppression</h3>
                                <button onClick={() => setModalOpen(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="mb-4">Voulez-vous vraiment supprimer ce logement ?</p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="btn btn-ghost"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={() => handleDelete(toDeleteId)}
                                    className="btn btn-error"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
}
