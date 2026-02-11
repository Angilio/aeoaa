import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Create({ users = [], logements = [] }) {

  const [attributions, setAttributions] = useState([
    { logement_id: '', user_ids: [], date_debut: '', date_fin: '' }
  ]);

  const handleChange = (index, e) => {
    const { name, value, multiple, options } = e.target;

    setAttributions(prev => {
      const newAttribs = [...prev];

      if (multiple) {
        newAttribs[index][name] = Array.from(options)
          .filter(o => o.selected)
          .map(o => o.value);
      } else {
        newAttribs[index][name] = value;
      }

      return newAttribs;
    });
  };

  const addLine = () => {
    setAttributions(prev => [
      ...prev,
      { logement_id: '', user_ids: [], date_debut: '', date_fin: '' }
    ]);
  };

  const removeLine = (index) => {
    setAttributions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/attributions', { attributions });
  };

  return (
    <Layout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Attribuer un logement</h2>
          <a href="/attributions" className="btn btn-primary btn-sm">
            Toutes les attributions
          </a>
        </div>
      }
    >
      <Head title="Attribuer" />

      <div className="p-6 bg-base-100 text-base-content rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">

          {attributions.map((attr, index) => (
            <div key={index} className="border rounded-lg p-4">

              {/* GRID RESPONSIVE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* COLONNE GAUCHE — UTILISATEURS */}
                <div>
                  <label className="block mb-2 font-semibold">
                    Utilisateurs
                  </label>
                  <select
                    name="user_ids"
                    multiple
                    value={attr.user_ids}
                    onChange={(e) => handleChange(index, e)}
                    className="select select-bordered w-full min-h-[150px]"
                    required
                  >
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>

                {/* COLONNE DROITE — LOGEMENT + DATES */}
                <div className="space-y-4">

                  <div>
                    <label className="block mb-1 font-semibold">Logement</label>
                    <select
                      name="logement_id"
                      value={attr.logement_id}
                      onChange={(e) => handleChange(index, e)}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Choisir un logement</option>
                      {logements.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label>Date début</label>
                      <input
                        type="date"
                        name="date_debut"
                        value={attr.date_debut}
                        onChange={(e) => handleChange(index, e)}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    <div className="flex-1">
                      <label>Date fin</label>
                      <input
                        type="date"
                        name="date_fin"
                        value={attr.date_fin}
                        onChange={(e) => handleChange(index, e)}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* SUPPRIMER */}
              {attributions.length > 1 && (
                <div className="text-right mt-4">
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => removeLine(index)}
                  >
                    Supprimer cette attribution
                  </button>
                </div>
              )}

            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addLine}
            >
              Ajouter une ligne
            </button>

            <button type="submit" className="btn btn-primary">
              Attribuer
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
}
