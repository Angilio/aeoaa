import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import GuestLayout from '@/Layouts/GuestLayout';

export default function Register({ etablissements, niveaux, classes, logements }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        contact: '',
        image: null,
        password: '',
        password_confirmation: '',
        etablissement_id: '',
        niveau_id: '',
        classe_id: '',
        logement_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription" />

            <div className="max-w-3xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">
                    Page d'inscription
                </h1>

                <form
                    onSubmit={submit}
                    className="card bg-base-100 shadow-2xl p-6 space-y-6"
                >

                    {/* Groupe : Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Nom */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nom</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                            <InputError message={errors.name} className="text-error mt-1" />
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                            <InputError message={errors.email} className="text-error mt-1" />
                        </div>
                    </div>

                    {/* Groupe : Contact + Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Téléphone */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contact</span>
                            </label>

                            <div className="input input-bordered p-0 overflow-hidden">
                                <PhoneInput
                                    defaultCountry="MG"
                                    international
                                    value={data.contact}
                                    onChange={(value) => setData('contact', value)}
                                    className="w-full px-3 py-2 bg-transparent text-base-content"
                                />
                            </div>

                            <InputError message={errors.contact} className="text-error mt-1" />
                        </div>

                        {/* Image */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image (optionnel)</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('image', e.target.files[0])}
                                className="file-input file-input-bordered w-full"
                            />
                            <InputError message={errors.image} className="text-error mt-1" />
                        </div>
                    </div>

                    {/* Sélecteurs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Établissement */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Établissement</span>
                            </label>
                            <select
                                value={data.etablissement_id}
                                onChange={(e) => setData('etablissement_id', e.target.value)}
                                className="select select-bordered w-full bg-base-100 text-base-content"
                                required
                            >
                                <option value="">Sélectionner</option>
                                {etablissements.map((etab) => (
                                    <option key={etab.id} value={etab.id}>
                                        {etab.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.etablissement_id} className="text-error mt-1" />
                        </div>

                        {/* Niveau */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Niveau</span>
                            </label>
                            <select
                                value={data.niveau_id}
                                onChange={(e) => setData('niveau_id', e.target.value)}
                                className="select select-bordered w-full bg-base-100 text-base-content"
                                required
                            >
                                <option value="">Sélectionner</option>
                                {niveaux.map((niv) => (
                                    <option key={niv.id} value={niv.id}>
                                        {niv.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.niveau_id} className="text-error mt-1" />
                        </div>

                        {/* Classe */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Classe</span>
                            </label>
                            <select
                                value={data.classe_id}
                                onChange={(e) => setData('classe_id', e.target.value)}
                                className="select select-bordered w-full bg-base-100 text-base-content"
                                required
                            >
                                <option value="">Sélectionner</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.classe_id} className="text-error mt-1" />
                        </div>

                        {/* Logement */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Logement</span>
                            </label>
                            <select
                                value={data.logement_id}
                                onChange={(e) => setData('logement_id', e.target.value)}
                                className="select select-bordered w-full bg-base-100 text-base-content"
                            >
                                <option value="">Sélectionner</option>
                                {logements.map((log) => (
                                    <option key={log.id} value={log.id}>
                                        {log.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.logement_id} className="text-error mt-1" />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mot de passe</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                            <InputError message={errors.password} className="text-error mt-1" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirmer le mot de passe</span>
                            </label>
                            <input
                                type="password"
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="form-control mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={processing}
                        >
                            S'inscrire
                        </button>
                    </div>

                </form>
            </div>
        </GuestLayout>
    );
}
