import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Text } from '@mantine/core';

export default function Markets() {
    const [markets, setMarkets] = useState<any[]>([]);

    useEffect(() => {
        api.get('/markets/open').then(res => setMarkets(res.data));
    }, []);

    const postuler = async (id: string) => {
        await api.post(`/applications/${id}`);
        alert('Candidature envoyée avec succès !');
    };

    return (
        <>
            {markets.map(m => (
                <Card key={m._id} shadow="sm" radius="md" mt="md">
                    <Text>{m.name}</Text>
                    <Text>{m.description}</Text>
                    <Text>{m.location}</Text>
                    <Button onClick={() => postuler(m._id)}>Postuler</Button>
                </Card>
            ))}
        </>
    );
}