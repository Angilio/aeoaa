import Layout from '@/Layouts/Layout';
import { Head, router, Link } from '@inertiajs/react';
import { Trash2, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function Index({ membres, filters, niveaux, logements, classes, etablissements, roles, typesLogements }) {

    const [deleteId, setDeleteId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState(filters.search || '');

    // Met à jour un filtre et conserve la recherche actuelle
    const updateFilter = (key, value) => {
        router.get(
            route('membres.index'),
            { ...filters, [key]: value, search },
            { preserveState: true, replace: true }
        );
    };

    // Met à jour la recherche et conserve les autres filtres
    const updateSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        router.get(
            route('membres.index'),
            { ...filters, search: value },
            { preserveState: true, replace: true }
        );
    };

    // Réinitialise tous les filtres et la recherche
    const resetFilters = () => {
        setSearch('');
        router.get(
            route('membres.index'),
            {},
            { preserveState: true, replace: true }
        );
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    };

    const deleteMember = () => {
        if (!deleteId) return;
        router.delete(route('membres.destroy', deleteId), {
            preserveState: true,
            onSuccess: () => {
                setModalOpen(false);
                setDeleteId(null);
            }
        });
    };

    return (
        <Layout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight">
                        Gestion des membres
                    </h2>
                    <Link
                        href={route('register')}
                        className="btn btn-primary"
                    >
                        Ajouter un membre
                    </Link>
                </div>
            }
        >
            <Head title="Membres" />

            <div className="p-6 bg-base-100 rounded shadow">          

                {/* RECHERCHE PAR NOM */}
               <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                    {/* Champ de recherche */}
                    <input
                        type="text"
                        placeholder="Rechercher par nom..."
                        value={search}
                        onChange={updateSearch}
                        className="input input-bordered w-full md:w-3/4"
                    />

                    {/* Bouton Réinitialiser */}
                    <button
                        onClick={resetFilters}
                        className="btn btn-ghost bg-blue-600 w-full md:w-1/4 flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} /> Reafficher tous
                    </button>
                </div>


                {/* FILTRES */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                    {/* Rôle */}
                    <select
                        className="select select-bordered"
                        onChange={e => updateFilter('role', e.target.value)}
                        value={filters.role || ''}
                    >
                        <option value="">Tous les rôles</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                    </select>

                    {/* Niveau */}
                    <select
                        className="select select-bordered"
                        onChange={e => updateFilter('niveau', e.target.value)}
                        value={filters.niveau || ''}
                    >
                        <option value="">Tous les niveaux</option>
                        {niveaux.map(n => (
                            <option key={n.id} value={n.id}>{n.name}</option>
                        ))}
                    </select>

                    {/* Logement */}
                    <select
                        className="select select-bordered"
                        onChange={e => updateFilter('logement', e.target.value)}
                        value={filters.logement || ''}
                    >
                        <option value="">Tous les logements</option>
                        {logements.map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                    </select>

                    {/* Classe */}
                    <select
                        className="select select-bordered"
                        onChange={e => updateFilter('classe', e.target.value)}
                        value={filters.classe || ''}
                    >
                        <option value="">Toutes les classes</option>
                        {classes.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    {/* Établissement */}
                    <select
                        className="select select-bordered"
                        onChange={e => updateFilter('etablissement', e.target.value)}
                        value={filters.etablissement || ''}
                    >
                        <option value="">Tous les établissements</option>
                        {etablissements.map(e => (
                            <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                    </select>

                    {/* Type de logement */}
                    <select
                        className="select select-bordered"
                        onChange={e => updateFilter('type_logement', e.target.value)}
                        value={filters.type_logement || ''}
                    >
                        <option value="">Tous les types</option>
                        {typesLogements.map(type => (
                            <option key={type.id} value={type.id}>{type.type}</option>
                        ))}
                    </select>
                </div>

                {/* TABLE */}
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th>Niveau</th>
                            <th>Logement</th>
                            <th>Classe</th>
                            <th>Établissement</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {membres.data.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.roles?.[0]?.name}</td>
                                <td>{user.niveau?.name}</td>
                                <td>{user.logement?.name}</td>
                                <td>{user.classe?.name}</td>
                                <td>{user.etablissement?.name}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => confirmDelete(user.id)}
                                        className="btn btn-sm btn-ghost tooltip tooltip-right"
                                        data-tip="Supprimer"
                                    >
                                        <Trash2 size={20} className="text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODALE DE CONFIRMATION */}
            {modalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirmation</h3>
                        <p className="py-4">
                            Êtes-vous sûr de vouloir supprimer ce membre ? Cette action est irréversible.
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error"
                                onClick={deleteMember}
                            >
                                Supprimer
                            </button>
                            <button
                                className="btn"
                                onClick={() => setModalOpen(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
