import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Text, Container, Title, SimpleGrid } from '@mantine/core';

interface Market {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    eventDate: string;
    status: string;
}

export default function Markets() {
    const [markets, setMarkets] = useState<Market[]>([]);

    useEffect(() => {
        api.get('/markets').then(res => setMarkets(res.data))
            .catch(err => console.error(err));
    }, []);

    const postuler = async (id: string) => {
        try {
        await api.post(`/markets/${id}/apply`);
        alert('Candidature envoyée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la candidature:', error);
        }
    };

    return (
        <Container>
            <Title order={2} mb="md">Liste des marchés</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {markets.map(market => (
                <Card key={market._id} shadow="sm" radius="md" withBorder>
                    <Title order={4}>{market.title}</Title>
                    <Text size="sm" c="dimmed">{market.description}</Text>
                    <Text size="xs" c="dimmed">Créé le: {new Date(market.createdAt).toLocaleDateString()}</Text>
                    <Text size="xs" c="dimmed">Date de l'événement: {new Date(market.eventDate).toLocaleDateString()}</Text>
                    <Text size="xs" c="dimmed">Statut: {market.status}</Text>
                    <Button onClick={() => postuler(market._id)}>Postuler</Button>
                </Card>
            ))}
            </SimpleGrid>
        </Container>
    );
}