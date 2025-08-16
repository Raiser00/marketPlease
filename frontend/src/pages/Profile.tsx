import { useEffect, useState } from 'react';
import { Container, Button, Text, Title, Paper, SimpleGrid, Card, Badge } from '@mantine/core';
import api from '../services/api';

interface Market {
  _id: string;
  title: string;
  description: string;
}

interface User {
  firstName: string;
  lastName: string;
  role: string;
  markets: Market[];
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get('/users/me').then(res => {
      setUser(res.data);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  const supprimer = async () => {
    if (confirm('Supprimer votre compte ?')) {
      await api.delete('/users/me');
      alert('Compte supprimé avec succès !');
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  if (!user) return null;

  return (
    <Container size="md" style={{ textAlign: 'center' }}>
      <Paper shadow="md" radius="md" p="xl" mt="lg">
        <Title order={2} mb="md">Mon compte</Title>
        
        <Text size="lg" fw={500}>
          {user.firstName} {user.lastName}
        </Text>
        <Badge 
          mt="xs" 
          color={user.role === "admin" ? "red" : "blue"} 
          size="lg"
        >
          {user.role}
        </Badge>

        <Title order={3} mt="xl" mb="md">Mes marchés attribués</Title>
        {user.markets.length === 0 ? (
          <Text c="dimmed">Aucun marché attribué pour le moment.</Text>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {user.markets.map(market => (
              <Card key={market._id} shadow="sm" radius="md" withBorder>
                <Title order={4}>{market.title}</Title>
                <Text size="sm" c="dimmed" mt="xs">{market.description}</Text>
              </Card>
            ))}
          </SimpleGrid>
        )}

        <Button color="red" fullWidth mt="xl" onClick={supprimer}>
          Supprimer mon compte
        </Button>
      </Paper>
    </Container>
  );
}
