<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des Attributions</title>
    <style>
        /* Police compatible PDF avec accentuation */
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; margin: 20px; }

        /* Tableau */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            page-break-inside: auto;
        }

        th, td {
            border: 1px solid #000;
            padding: 6px 8px;
            text-align: center;
            word-wrap: break-word;
        }

        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        /* Répéter l'entête sur chaque page si tableau trop long */
        thead { display: table-header-group; }
        tfoot { display: table-footer-group; }

        /* Ajuster les lignes pour éviter qu'elles se coupent */
        tr { page-break-inside: avoid; page-break-after: auto; }

        h2 { text-align: center; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h2>Liste des Attributions</h2>

    <table>
        <thead>
            <tr>
                <th>Utilisateur</th>
                <th>Rôle</th>
                <th>Logement</th>
                <th>Date début</th>
                <th>Date fin</th>
            </tr>
        </thead>
        <tbody>
            @forelse($attributions as $attr)
            <tr>
                <td>{{ $attr->user->name ?? '-' }}</td>
                <td>{{ $attr->user->roles->pluck('name')->join(', ') ?? '-' }}</td>
                <td>{{ $attr->logement->name ?? '-' }}</td>
                <td>{{ $attr->date_debut ? \Carbon\Carbon::parse($attr->date_debut)->format('d/m/Y') : '-' }}</td>
                <td>{{ $attr->date_fin ? \Carbon\Carbon::parse($attr->date_fin)->format('d/m/Y') : '-' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="5">Aucune attribution trouvée.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
