import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ logements }) {

    const [filterType, setFilterType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleDelete = (id) => {
        if (confirm("Supprimer ce logement ?")) {
            router.delete(`/logements/${id}`);
        }
    };

    const filtered = logements.filter(l =>
        filterType === "all" ? true : l.type_logement?.type === filterType
    );

    // Calculer la pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filtered.slice(startIndex, endIndex);

    // Réinitialiser la page quand le filtre change
    const handleFilterChange = (type) => {
        setFilterType(type);
        setCurrentPage(1);
    };

    const types = ["PV", "PJ", "Bloc", "BM", "BR"]; 

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight">Logements</h2>}
        >
            
            <div className="p-10 bg-base-100 text-base-content rounded-lg shadow">

                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl mb-4">Liste des logements</h1>

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

                    <Link
                        href="/logements/create"
                        className="btn btn-primary"
                    >
                        Ajouter un logement
                    </Link>
                </div>

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
                                    <Link
                                        href={`/logements/${l.id}/edit`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        <Pencil size={16} />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(l.id)}
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

            </div>
        </AuthenticatedLayout>
    );
}