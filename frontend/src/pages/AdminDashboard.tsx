import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Select } from '@mantine/core';

export default function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([]);
    const [markets, setMarkets] = useState<any[]>([]);
    const [candidats, setCandidats] = useState<any[]>([]);

    useEffect(() => {
        api.get('/users').then(res => setUsers(res.data));
        api.get('/markets').then(res => setMarkets(res.data));

    }, []);

    const voirCandidats = async (marketId: string) => {
        const res = await api.get(`/applications/for-market/${marketId}`);
        setCandidats(res.data);
    };

    const attribuer = async (appId: string) => {
        await api.put(`/applications/${appId}/assign`);
        alert('Candidature attribuee !');
        setCandidats([]);
};

    return (
        <>
            <h2>Utilisateurs</h2>
            {users.map(u => (
                <Card key={u._id} mt="md">
                    {u.firstName} {u.lastName} - {u.email} ({u.role})
                </Card>
            ))}

            <h2>Attributions</h2>
            <Select
                data={markets.map(m => ({ value: m._id, label: m.name}))}
                placeholder="Selectionner un marché"
                onChange={id => voirCandidats(id!)}
            />
            {candidats.map(app => (
                <Card key={app._id} mt="md">
                    {app.userId?.firstName} {app.userId?.lastName} - {app.status}
                    <Button color="green" mt="md" onClick={() => attribuer(app._id)}>
                        Attribuer
                    </Button>
                </Card>
            ))}

        </>
    );
}

