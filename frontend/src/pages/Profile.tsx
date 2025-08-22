import { useEffect, useState } from 'react';
import { Container, Button, Text, Title, Paper, Badge, Group } from '@mantine/core';
import api from '../services/api';

interface User {
  firstName: string;
  lastName: string;
  role: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get('/users/me')
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const supprimer = async () => {
    if (confirm('Supprimer votre compte ?')) {
      try {
        await api.delete('/users/me');
        alert('Compte supprimé avec succès !');
        localStorage.clear();
        window.location.href = '/login';
      } catch (err) {
        console.error("Erreur suppression :", err);
      }
    }
  };

  if (!user) return null;

  return (
    <Container size="sm" style={{ textAlign: 'center' }}>
      <Paper shadow="lg" radius="xl" p="xl" mt="lg" withBorder>
        <Title order={2} mb="lg">Mon compte</Title>

        {/* Nom + rôle côte à côte */}
        <Group justify="center" gap="sm" mb="md">
          <Text size="xl" fw={600}>
            {user.firstName} {user.lastName}
          </Text>
          <Badge 
            color={user.role === "admin" ? "red" : "blue"} 
            size="lg"
            radius="md"
          >
            {user.role}
          </Badge>
        </Group>

        <Button 
          color="red" 
          fullWidth 
          mt="xl" 
          radius="md"
          size="md"
          onClick={supprimer}
        >
          Supprimer mon compte
        </Button>
      </Paper>
    </Container>
  );
}
