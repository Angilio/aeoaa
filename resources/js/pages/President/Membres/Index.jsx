import Layout from '@/Layouts/Layout';
import { Head, router, Link } from '@inertiajs/react';

export default function Index({ membres, filters, niveaux, logements, classes, etablissements }) {

    const updateFilter = (key, value) => {
        router.get(
            route('membres.index'),
            { ...filters, [key]: value },
            { preserveState: true, replace: true }
        );
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

                {/* FILTRES */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

                    {/* Rôle */}
                    <select
                        className="select select-bordered"
                        onChange={e => updateFilter('role', e.target.value)}
                        value={filters.role || ''}
                    >
                        <option value="">Tous les rôles</option>
                        <option value="President">Président</option>
                        <option value="Secretaire">Secrétaire</option>
                        <option value="Membre">Membre</option>
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
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </Layout>
    );
}
