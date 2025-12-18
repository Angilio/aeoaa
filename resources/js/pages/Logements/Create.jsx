import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ types }) {
    const [values, setValues] = useState({
        name: '',
        nbrPlace: '',
        type_logement_id: '',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/logements', values);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-base-100 text-base-content rounded-lg shadow">
                <h1 className="text-2xl mb-4">Ajouter un logement</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1">Nom</label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered w-full"
                            value={values.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Nombre de places</label>
                        <input
                            type="number"
                            name="nbrPlace"
                            className="input input-bordered w-full"
                            value={values.nbrPlace}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Type de logement</label>
                        <select
                            name="type_logement_id"
                            className="select select-bordered w-full"
                            value={values.type_logement_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choisir le type de logement</option>
                            {types.map(t => (
                                <option key={t.id} value={t.id}>{t.type}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Enregistrer
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
