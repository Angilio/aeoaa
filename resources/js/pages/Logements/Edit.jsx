import React, { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

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
        <Layout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl leading-tight">
                        Modifier un logement
                    </h2>
                    <Link
                        href={route('logements.index')}
                        className="btn btn-primary"
                    >
                        Tous les logements
                    </Link>
                </div>
            }
        >
            <Head title="Modifier un logements"/>
            <div className="px-10 bg-base-100 text-base-content rounded-lg shadow mx-12">
                <h1 className="text-2xl mb-4 text-center">Modifier le logement</h1>

                <form onSubmit={handleSubmit} className="space-y-4 pb-5 px-12">

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

                    <div className="text-end">
                        <button type="submit" className="btn btn-warning">
                            Mettre à jour
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
