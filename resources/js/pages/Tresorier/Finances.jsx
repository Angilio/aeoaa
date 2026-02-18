import { useState, useMemo } from 'react';
import { useForm, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Finances({ entrees, sorties, ressources, users }) {
    const [filter, setFilter] = useState('toutes');
    const [openEntree, setOpenEntree] = useState(false);
    const [openSortie, setOpenSortie] = useState(false);
    const [openRessource, setOpenRessource] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const entreeForm = useForm({ montant: '', ressource_id: '', user_id: '' });
    const sortieForm = useForm({ montant: '', raison: '' });
    const ressourceForm = useForm({ ressource: '' });

    // 🔥 Fusion + tri STABLE
    const operations = useMemo(() => {
        const all = [
            ...entrees.map(e => ({ ...e, type: 'Entrée' })),
            ...sorties.map(s => ({ ...s, type: 'Sortie' })),
        ];
        return [...all].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }, [entrees, sorties]);

    // 🔥 Calcul du solde
    const solde = useMemo(() => {
        const totalEntrees = entrees.reduce((sum, e) => sum + Number(e.montant), 0);
        const totalSorties = sorties.reduce((sum, s) => sum + Number(s.montant), 0);
        return totalEntrees - totalSorties;
    }, [entrees, sorties]);

    // 🔥 Soumissions
    const submitEntree = e => {
        e.preventDefault();
        entreeForm.post(route('tresorier.entrees.store'), {
            onSuccess: () => { setOpenEntree(false); entreeForm.reset(); },
        });
    };

    const submitSortie = e => {
        e.preventDefault();
        sortieForm.post(route('tresorier.sorties.store'), {
            onSuccess: () => { setOpenSortie(false); sortieForm.reset(); },
        });
    };

    const submitRessource = e => {
        e.preventDefault();
        ressourceForm.post(route('tresorier.ressources.store'), {
            onSuccess: () => { setOpenRessource(false); ressourceForm.reset(); },
        });
    };

    // 🔥 Pagination
    const filteredOperations = operations.filter(op =>
        filter === 'toutes' ? true : filter === 'entrees' ? op.type === 'Entrée' : op.type === 'Sortie'
    );
    const paginatedOperations = filteredOperations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Layout
            header={
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Finances</h1>
                    <div className="text-lg font-semibold">
                        Solde :
                        <span className={`ml-2 ${solde >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {solde} Ar
                        </span>
                    </div>
                </div>
            }
        >
            <Head title="Finances" />

            <div className="p-6 bg-base-100 rounded shadow">
                {/* CONTROLS */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-1">
                        <button className={`btn ${filter === 'toutes' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('toutes')}>Toutes</button>
                        <button className={`btn ${filter === 'entrees' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('entrees')}>Entrées</button>
                        <button className={`btn ${filter === 'sorties' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('sorties')}>Sorties</button>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => setOpenEntree(true)} className="btn btn-success">+ Entrée</button>
                        <button onClick={() => setOpenSortie(true)} className="btn btn-error">+ Sortie</button>
                        <button onClick={() => setOpenRessource(true)} className="btn btn-primary">+ Ressource</button>
                    </div>
                </div>

                {/* LISTE */}
                <div className="card bg-base-100 shadow p-4">
                    {paginatedOperations.length === 0 ? (
                        <p className="text-gray-500">Aucune opération.</p>
                    ) : (
                        <ul className="space-y-2">
                            {paginatedOperations.map(op => (
                                <li key={`${op.type}-${op.id}`} className="p-3 border rounded flex justify-between items-center hover:bg-base-200 transition">
                                    {/* <div className="flex items-center gap-3">
                                        <span className={`badge ${op.type === 'Entrée' ? 'badge-success' : 'badge-error'}`}>{op.type}</span>
                                        <span>{op.type === 'Entrée' ? op.user?.name : op.raison || ''}</span>
                                    </div> */}
                                    <div className="flex items-center gap-3">
                                        <span className={`badge ${op.type === 'Entrée' ? 'badge-success' : 'badge-error'}`}>
                                            {op.type}
                                        </span>
                                        <span>
                                            {op.ressource ? `${op.ressource.ressource} - ${op.user?.name || ''}` : op.raison || ''}
                                        </span>
                                    </div>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(op.created_at).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span className={`font-semibold ${op.type === 'Entrée' ? 'text-green-600' : 'text-red-600'}`}>
                                        {op.type === 'Entrée' ? '+' : '-'} {op.montant} Ar
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {filteredOperations.length > itemsPerPage && (
                        <div className="flex justify-center gap-2 mt-4">
                            {Array.from({ length: Math.ceil(filteredOperations.length / itemsPerPage) }, (_, i) => (
                                <button key={i} className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 🔥 MODALS */}
            {openEntree && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Ajouter une Entrée</h2>
                        <form onSubmit={submitEntree} className="flex flex-col gap-3">
                            {/* Sélection du membre */}
                            <select className="input input-bordered w-full" value={entreeForm.data.user_id} onChange={e => entreeForm.setData('user_id', e.target.value)} required>
                                <option value="">Choisir un membre</option>
                                {users.map(u => (<option key={u.id} value={u.id}>{u.name}</option>))}
                            </select>
                            {entreeForm.errors.user_id && <span className="text-red-600 text-sm">{entreeForm.errors.user_id}</span>}

                            {/* Ressource */}
                            <select className="input input-bordered w-full" value={entreeForm.data.ressource_id} onChange={e => entreeForm.setData('ressource_id', e.target.value)} required>
                                <option value="">Choisir une ressource</option>
                                {ressources.map(r => (<option key={r.id} value={r.id}>{r.ressource}</option>))}
                            </select>
                            {entreeForm.errors.ressource_id && <span className="text-red-600 text-sm">{entreeForm.errors.ressource_id}</span>}

                            <input type="number" placeholder="Montant" className="input input-bordered w-full" value={entreeForm.data.montant} onChange={e => entreeForm.setData('montant', e.target.value)} required />
                            {entreeForm.errors.montant && <span className="text-red-600 text-sm">{entreeForm.errors.montant}</span>}

                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setOpenEntree(false)} className="btn btn-ghost">Annuler</button>
                                <button type="submit" className="btn btn-primary" disabled={entreeForm.processing}>Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {openSortie && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Ajouter une Sortie</h2>
                        <form onSubmit={submitSortie} className="flex flex-col gap-3">
                            <input type="number" placeholder="Montant" className="input input-bordered w-full" value={sortieForm.data.montant} onChange={e => sortieForm.setData('montant', e.target.value)} required />
                            {sortieForm.errors.montant && <span className="text-red-600 text-sm">{sortieForm.errors.montant}</span>}

                            <input type="text" placeholder="Raison" className="input input-bordered w-full" value={sortieForm.data.raison} onChange={e => sortieForm.setData('raison', e.target.value)} />
                            {sortieForm.errors.raison && <span className="text-red-600 text-sm">{sortieForm.errors.raison}</span>}

                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setOpenSortie(false)} className="btn btn-ghost">Annuler</button>
                                <button type="submit" className="btn btn-primary" disabled={sortieForm.processing}>Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {openRessource && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Ajouter une ressource</h2>
                        <form onSubmit={submitRessource} className="flex flex-col gap-3">
                            <input type="text" placeholder="Nom de la ressource" className="input input-bordered w-full" value={ressourceForm.data.ressource} onChange={e => ressourceForm.setData('ressource', e.target.value)} required />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setOpenRessource(false)} className="btn btn-ghost">Annuler</button>
                                <button type="submit" className="btn btn-primary" disabled={ressourceForm.processing}>Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
