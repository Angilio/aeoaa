<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Rapport des Membres</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .paye {
            color: green;
            font-weight: bold;
        }
        .non-paye {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <h2>Rapport des Membres</h2>
    <p>Total des membres : {{ $totalMembres }}</p>

    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Statut</th>
            </tr>
        </thead>
        <tbody>
            @foreach($membres as $membre)
                <tr>
                    <td>{{ $membre['name'] }}</td>
                    <td>{{ $membre['adresse'] }}</td>
                    <td>
                        @if($membre['paye'])
                            <span class="paye">Payé</span>
                        @else
                            <span class="non-paye">Non payé</span>
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
