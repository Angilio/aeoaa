import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Finances({ ressources }) {

    const [open, setOpen] = useState(false);

    const form = useForm({
        ressource: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('tresorier.ressources.store'), {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            }
        });
    };

    return (
        <Layout>
            <Head title="Finances" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Ressources financières
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="btn btn-primary"
                >
                    + Ajouter une ressource
                </button>
            </div>

            {/* LISTE DES RESSOURCES */}
            <div className="card bg-base-100 shadow p-4">
                {ressources.length === 0 ? (
                    <p>Aucune ressource enregistrée.</p>
                ) : (
                    <ul className="space-y-2">
                        {ressources.map((r) => (
                            <li key={r.id} className="p-2 border rounded">
                                {r.ressource}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-bold mb-4">
                            Ajouter une ressource financière
                        </h2>

                        <form onSubmit={submit}>
                            <input
                                type="text"
                                placeholder="Nom de la ressource"
                                className="input input-bordered w-full mb-3"
                                value={form.data.ressource}
                                onChange={(e) =>
                                    form.setData('ressource', e.target.value)
                                }
                            />

                            {form.errors.ressource && (
                                <p className="text-red-500 text-sm mb-2">
                                    {form.errors.ressource}
                                </p>
                            )}

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="btn btn-ghost"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={form.processing}
                                >
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
