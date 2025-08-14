import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button } from '@mantine/core';

export default function MyApplications() {
    const [apps, setApps] = useState<any[]>([]);

    useEffect(() => {
        api.get('/applications/me').then(res => setApps(res.data));
    }, []);

    const retirer = async (id: string) => {
        await api.delete(`/applications/${id}`);
        setApps(apps.filter(app => app._id !== id));
    };

    return (
        <>
            {apps.map(app => (
                <Card key={app._id} me="md">
                    <strong>Marché :</strong> {app.marketId?.name} <br />
                    <strong>Statut :</strong> {app.status}
                    {app.status === 'pending' && (
                        <Button color="red" mt="md" onClick={() => retirer(app._id)}>
                            Retirer candidature
                        </Button>
                    )}
                </Card>
            ))}
        </>
    );

}