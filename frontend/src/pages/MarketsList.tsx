import { Table, Button, Container, Title, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

interface Market {
    _id: string;
    name: string;
    description: string;
    eventDate: string;
    status: "open" | "closed";
}

export default function MarketsList() {
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/markets")
      .then((res) => setMarkets(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Title order={2} mb="lg" ta="center" c="blue">
        📋 Gestion des Marchés
      </Title>

      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Statut</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {markets.map((m) => (
            <Table.Tr key={m._id}>
              <Table.Td>{m.name}</Table.Td>
              <Table.Td>{m.description}</Table.Td>
              <Table.Td>{new Date(m.eventDate).toLocaleDateString()}</Table.Td>
              <Table.Td>{m.status}</Table.Td>
              <Table.Td>
                <Group gap="sm">
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => window.location.href = `/admin/markets/${m._id}/edit`}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => axios.delete(`http://localhost:5000/api/markets/${m._id}`)
                      .then(() => setMarkets((prev) => prev.filter(x => x._id !== m._id)))
                    }
                  >
                    Supprimer
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}
