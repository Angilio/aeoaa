import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ logement, types }) {

    const [values, setValues] = useState({
        name: logement.name,
        nbrPlace: logement.nbrPlace,
        type_logement_id: logement.type_logement_id,
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/logements/${logement.id}`, values);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-base-100 text-base-content rounded-lg shadow">
                <h1 className="text-2xl mb-4">Modifier le logement</h1>

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
                            {types.map(t => (
                                <option key={t.id} value={t.id}>{t.type}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-warning">
                        Mettre à jour
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
