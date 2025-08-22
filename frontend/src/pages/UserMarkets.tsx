import { useEffect, useState } from 'react';
import { Container, Button, Text, Title, SimpleGrid, Card, Group, Badge } from '@mantine/core';
import api from '../services/api';

interface Market {
  _id: string;
  title: string;
  description: string;
  eventDate?: string;
  status?: string;
}

export default function UserMarkets() {
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    api.get('/users/me')
      .then(res => {
        console.log("DEBUG user markets:", res.data.markets);
        setMarkets(res.data.markets || []);
      })
      .catch(err => {
        console.error("Erreur récupération marchés :", err);
      });
  }, []);

  const leave = async (id: string) => {
    try {
      await api.post(`/applications/leave/${id}`);
      setMarkets(markets.filter(m => m._id !== id));
    } catch (error) {
      console.error("Erreur quitter marché :", error);
    }
  };

  return (
    <Container size="lg" mt="xl">
      <Title order={2} mb="lg">📋 Mes marchés attribués</Title>

      {markets.length === 0 ? (
        <Text c="dimmed" ta="center" mt="lg">
          Aucun marché attribué pour le moment.
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {markets.map((market) => (
            <Card key={market._id} shadow="md" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="sm">
                <Title order={4}>{market.title}</Title>
                <Badge color="blue" variant="light" size="sm">
                  {market.status || "Attribué"}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed">
                {market.description}
              </Text>

              {market.eventDate && (
                <Text size="sm" mt="xs">
                  📅 <strong>Date :</strong> {new Date(market.eventDate).toLocaleDateString()}
                </Text>
              )}

              <Button 
                color="red" 
                fullWidth 
                mt="md" 
                radius="md"
                onClick={() => leave(market._id)}
              >
                Quitter ce marché
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
