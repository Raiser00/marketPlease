import { useEffect, useState } from 'react';
import { TextInput, Button, Container, Card, Grid, Stack, Title, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import api from '../services/api';

interface Market {
  _id: string;
  title: string;
  description: string;
  deadline: string;
}

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [markets, setMarkets] = useState<Market[]>([]);

  const form = useForm({
    initialValues: { firstName: '', lastName: '', phone: '' },
  });

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await api.get('/users/me');
      setUser(userRes.data);
      form.setValues({
        firstName: userRes.data.firstName,
        lastName: userRes.data.lastName,
        phone: userRes.data.phone,
      });

      const marketsRes = await api.get('/markets/my');
      setMarkets(marketsRes.data);
    };
    fetchData();
  }, []);

  const update = async () => {
    await api.put('/users/me', form.values);
    alert('Profil mis à jour !');
  };

  const supprimer = async () => {
    if (confirm('Supprimer votre compte ?')) {
      await api.delete('/users/me');
      alert('Compte supprimé avec succès !');
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <Container size="md" mt="lg" mx="auto" style={{ maxWidth: 700 }}>
  <Stack gap="md" align="center">
    <Title order={2}>Mon compte</Title>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <form onSubmit={form.onSubmit(update)}>
            <TextInput label="Prénom" placeholder="Votre prénom" {...form.getInputProps('firstName')} required />
            <TextInput label="Nom" placeholder="Votre nom" mt="md" {...form.getInputProps('lastName')} required />
            <TextInput label="Téléphone" placeholder="Votre téléphone" mt="md" {...form.getInputProps('phone')} required />
            <Button type="submit" fullWidth mt="md">Mettre à jour</Button>
            <Button color="red" fullWidth mt="md" onClick={supprimer}>Supprimer mon compte</Button>
          </form>
        </Card>

        <div>
          <Title order={3}>Mes marchés attribués</Title>
          {markets.length === 0 && <Text color="dimmed">Vous n'avez pas encore de marchés attribués.</Text>}
          <Grid mt="md">
            {markets.map((market) => (
              <Grid.Col key={market._id} span={12} w="50%">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4}>{market.title}</Title>
                  <Text size="sm" color="dimmed" mb="sm">{market.description}</Text>
                  <Text size="xs" color="dimmed">Date limite : {new Date(market.deadline).toLocaleDateString()}</Text>
                  <Button fullWidth mt="md" variant="light">Voir le marché</Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </Stack>
    </Container>
  );
}
