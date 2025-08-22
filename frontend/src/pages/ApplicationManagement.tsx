import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Text, SimpleGrid, Title, Group, Badge, Container } from '@mantine/core';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Market {
  _id: string;
  name: string;
  description: string;
}

interface Application {
  _id: string;
  status: 'pending' | 'accepted' | 'rejected';
  user: User;
  market: Market;
}

export default function ApplicationManagement() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const loadApps = async () => {
    try {
      const res = await api.get('/applications'); // backend : renvoyer toutes les candidatures
      setApps(res.data);
    } catch (err) {
      console.error('Erreur chargement candidatures admin', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id: string, accept: boolean) => {
  try {
    if (accept) {
      await api.post(`/applications/${id}/accept`);
      await loadApps(); // recharge toutes les candidatures pour voir les changements
    } else {
      await api.post(`/applications/${id}/reject`);
      setApps(prev =>
        prev.map(app =>
          app._id === id ? { ...app, status: 'rejected' } : app
        )
      );
    }
  } catch (err) {
    console.error('Erreur décision candidature', err);
  }
};

  useEffect(() => {
    loadApps();
  }, []);

  if (loading) return <Text>Chargement...</Text>;

  return (
    <Container size="md">
      <Title order={2} mb="lg">Gestion des candidatures</Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {apps.map(app => (
          <Card key={app._id} shadow="sm" radius="md" withBorder>
            <Title order={4}>{app.user.firstName} {app.user.lastName}</Title>
            <Text size="sm" c="dimmed">{app.user.email}</Text>
            <Text size="sm" c="dimmed">Marché: {app.market ? app.market.name : 'aucun marché'}</Text>
            <Badge color={app.status === 'accepted' ? 'green' : app.status === 'pending' ? 'yellow' : 'red'}>
              {app.status}
            </Badge>
            {app.status === 'pending' && (
              <Group mt="md" gap="sm">
                <Button size="xs" color="green" onClick={() => handleDecision(app._id, true)}>
                  Accepter
                </Button>
                <Button size="xs" color="red" onClick={() => handleDecision(app._id, false)}>
                  Refuser
                </Button>
              </Group>
            )}
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
