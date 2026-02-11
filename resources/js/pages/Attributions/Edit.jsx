import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Edit({ attribution, users, logements }) {
    const [values, setValues] = useState({
        user_id: attribution.user_id || '',
        logement_id: attribution.logement_id || '',
        date_debut: attribution.date_debut || '',
        date_fin: attribution.date_fin || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/attributions/${attribution.id}`, values);
    };

    return (
        <Layout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight">Modifier Attribution</h2>
                    <Link href="/attributions" className="btn btn-primary">Retour</Link>
                </div>
            }
        >
            <Head title="Modifier Attribution" />

            <div className="px-4 py-6 bg-base-100 rounded-lg shadow max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {/* Utilisateur + Logement côte à côte */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Utilisateur */}
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Utilisateur</label>
                            <select
                                name="user_id"
                                value={values.user_id}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">-- Sélectionner un utilisateur --</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Logement */}
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Logement</label>
                            <select
                                name="logement_id"
                                value={values.logement_id}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">-- Sélectionner un logement --</option>
                                {logements.map(log => (
                                    <option key={log.id} value={log.id}>{log.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date début + Date fin côte à côte */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Date début</label>
                            <input
                                type="date"
                                name="date_debut"
                                value={values.date_debut}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium mb-1">Date fin</label>
                            <input
                                type="date"
                                name="date_fin"
                                value={values.date_fin}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <Link href="/attributions" className="btn btn-outline">Annuler</Link>
                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
