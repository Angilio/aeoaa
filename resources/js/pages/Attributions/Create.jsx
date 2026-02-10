import React, { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Create({ users = [], logements = [] }) {
  // State dynamique pour les lignes d'attribution
  const [attributions, setAttributions] = useState([
    { logement_id: '', user_id: [], date_debut: '', date_fin: '' }
  ]);

  // Gestion du changement par ligne
  const handleChange = (index, e) => {
    const { name, value, options } = e.target;
    setAttributions(prev => {
      const newAttribs = [...prev];
      if (options) {
        const selected = Array.from(options)
          .filter(o => o.selected)
          .map(o => o.value);
        newAttribs[index][name] = selected;
      } else {
        newAttribs[index][name] = value;
      }
      return newAttribs;
    });
  };

  // Ajouter une nouvelle ligne
  const addLine = () => {
    setAttributions(prev => [
      ...prev,
      { logement_id: '', user_id: [], date_debut: '', date_fin: '' }
    ]);
  };

  // Supprimer une ligne
  const removeLine = (index) => {
    setAttributions(prev => prev.filter((_, i) => i !== index));
  };

  // Soumission du formulaire
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
        <form onSubmit={handleSubmit} className="space-y-4">

          {attributions.map((attr, index) => (
            <div
              key={index}
              className="flex md:flex-row flex-col gap-4 items-end border p-4 rounded mb-4"
            >
              {/* Logement */}
              <div className="flex-1">
                <label className="block mb-1">Logement</label>
                <select
                  name="logement_id"
                  value={attr.logement_id}
                  onChange={(e) => handleChange(index, e)}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Choisir un logement</option>
                  {logements?.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>

              {/* Utilisateurs */}
              <div className="flex-1">
                <label className="block mb-1">Utilisateurs</label>
                <select
                  name="user_id"
                  multiple
                  value={attr.user_id}
                  onChange={(e) => handleChange(index, e)}
                  className="select select-bordered w-full"
                  required
                >
                  {users?.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.roles?.map(r => r.name).join(', ') || 'Pas de rôle'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className="flex-1 flex gap-2">
                <div>
                  <label>Date début</label>
                  <input
                    type="date"
                    name="date_debut"
                    value={attr.date_debut}
                    onChange={(e) => handleChange(index, e)}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div>
                  <label>Date fin</label>
                  <input
                    type="date"
                    name="date_fin"
                    value={attr.date_fin}
                    onChange={(e) => handleChange(index, e)}
                    className="input input-bordered"
                  />
                </div>
              </div>

              {/* Bouton supprimer */}
              {attributions.length > 1 && (
                <button
                  type="button"
                  className="btn btn-error btn-sm"
                  onClick={() => removeLine(index)}
                >
                  Supprimer
                </button>
              )}
            </div>
          ))}

          {/* Ajouter une ligne */}
          <button
            type="button"
            className="btn btn-secondary mb-4"
            onClick={addLine}
          >
            Ajouter une ligne
          </button>

          {/* Soumettre */}
          <button type="submit" className="btn btn-primary">
            Attribuer
          </button>
        </form>
      </div>
    </Layout>
  );
}
