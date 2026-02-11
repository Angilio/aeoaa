import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Finances({ entrees, sorties, ressources }) {
    const [filter, setFilter] = useState('toutes'); // 'entrees' | 'sorties' | 'toutes'
    const [openEntree, setOpenEntree] = useState(false);
    const [openSortie, setOpenSortie] = useState(false);
    const [openRessource, setOpenRessource] = useState(false);

    const entreeForm = useForm({
        montant: '',
        ressource_id: '',
    });

    const sortieForm = useForm({
        montant: '',
        raison: '',
    });

    const ressourceForm = useForm({
        ressource: '',
    });

    // Submission des formulaires
    const submitEntree = (e) => {
        e.preventDefault();
        entreeForm.post(route('tresorier.entrees.store'), {
            onSuccess: () => {
                setOpenEntree(false);
                entreeForm.reset();
            },
        });
    };

    const submitSortie = (e) => {
        e.preventDefault();
        sortieForm.post(route('tresorier.sorties.store'), {
            onSuccess: () => {
                setOpenSortie(false);
                sortieForm.reset();
            },
        });
    };

    const submitRessource = (e) => {
        e.preventDefault();
        ressourceForm.post(route('tresorier.ressources.store'), {
            onSuccess: () => {
                setOpenRessource(false);
                ressourceForm.reset();
            },
        });
    };

    const getFilteredOperations = () => {
        if (filter === 'entrees') 
            return entrees.map(e => ({ ...e, type: 'Entrée' }));
        if (filter === 'sorties') 
            return sorties.map(s => ({ ...s, type: 'Sortie' }));

        // Toutes les opérations
        return [
            ...entrees.map(e => ({ ...e, type: e.type || 'Entrée' })),
            ...sorties.map(s => ({ ...s, type: s.type || 'Sortie' })),
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    };

    return (
        <Layout
            header={
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Finances</h1>
                    <button
                        onClick={() => setOpenRessource(true)}
                        className="btn btn-primary"
                    >
                        + Ajouter une ressource
                    </button>
                </div>
            }
        >
            <Head title="Finances" />

            <div className="p-6 bg-base-100 rounded shadow">

                {/* TOP CONTROLS SOUS HEADER */}
                <div className="flex justify-between items-center mb-4">
                    {/* 1. Texte opérations */}
                    <span className="font-semibold">Opérations</span>

                    {/* 2. Boutons filtre */}
                    <div className="flex gap-2">
                        <button
                            className={`btn ${filter === 'toutes' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setFilter('toutes')}
                        >
                            Toutes
                        </button>
                        <button
                            className={`btn ${filter === 'entrees' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setFilter('entrees')}
                        >
                            Entrées
                        </button>
                        <button
                            className={`btn ${filter === 'sorties' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setFilter('sorties')}
                        >
                            Sorties
                        </button>
                    </div>

                    {/* 3. Boutons ajout */}
                    <div className="flex gap-2">
                        <button onClick={() => setOpenEntree(true)} className="btn btn-primary">
                            + Entrée
                        </button>
                        <button onClick={() => setOpenSortie(true)} className="btn btn-secondary">
                            + Sortie
                        </button>
                    </div>
                </div>

                {/* LISTE DES OPERATIONS */}
                <div className="card bg-base-100 shadow p-4">
                    {getFilteredOperations().length === 0 ? (
                        <p className="text-gray-500">Aucune opération.</p>
                    ) : (
                        <ul className="space-y-2">
                            {getFilteredOperations().map((op) => (
                                <li
                                    key={op.id}
                                    className="p-2 border rounded flex justify-between items-center"
                                >
                                    <span>
                                        {op.type} - {op.ressource ? op.ressource.ressource : op.raison || ''}
                                    </span>
                                    <span>{op.montant} Ar</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* MODAL AJOUT ENTREE */}
            {openEntree && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Ajouter une Entrée</h2>
                        <form onSubmit={submitEntree} className="flex flex-col gap-3">
                            <select
                                className="input input-bordered w-full"
                                value={entreeForm.data.ressource_id}
                                onChange={e => entreeForm.setData('ressource_id', e.target.value)}
                                required
                            >
                                <option value="">Choisir une ressource</option>
                                {ressources.map(r => (
                                    <option key={r.id} value={r.id}>
                                        {r.ressource}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Montant"
                                className="input input-bordered w-full"
                                value={entreeForm.data.montant}
                                onChange={e => entreeForm.setData('montant', e.target.value)}
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setOpenEntree(false)} className="btn btn-ghost">
                                    Annuler
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={entreeForm.processing}>
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL AJOUT SORTIE */}
            {openSortie && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Ajouter une Sortie</h2>
                        <form onSubmit={submitSortie} className="flex flex-col gap-3">
                            <input
                                type="number"
                                placeholder="Montant"
                                className="input input-bordered w-full"
                                value={sortieForm.data.montant}
                                onChange={e => sortieForm.setData('montant', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Raison"
                                className="input input-bordered w-full"
                                value={sortieForm.data.raison}
                                onChange={e => sortieForm.setData('raison', e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setOpenSortie(false)} className="btn btn-ghost">
                                    Annuler
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={sortieForm.processing}>
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL AJOUT RESSOURCE */}
            {openRessource && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Ajouter une ressource</h2>
                        <form onSubmit={submitRessource} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Nom de la ressource"
                                className="input input-bordered w-full"
                                value={ressourceForm.data.ressource}
                                onChange={e => ressourceForm.setData('ressource', e.target.value)}
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setOpenRessource(false)} className="btn btn-ghost">
                                    Annuler
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={ressourceForm.processing}>
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
