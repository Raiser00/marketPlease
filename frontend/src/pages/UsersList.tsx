import { Table, Button, Container, Title, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:5000/api/users", 
            {
                headers: { Authorization: `Bearer ${token}`}
            })
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, [token]);

    return (
    <Container>
      <Title order={2} mb="lg" ta="center" c="blue">
        👥 Gestion des Utilisateurs
      </Title>

      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Prénom</Table.Th>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Téléphone</Table.Th>
            <Table.Th>Rôle</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {users.map((u) => (
            <Table.Tr key={u._id}>
              <Table.Td>{u.firstName}</Table.Td>
              <Table.Td>{u.lastName}</Table.Td>
              <Table.Td>{u.email}</Table.Td>
              <Table.Td>{u.phone}</Table.Td>
              <Table.Td>{u.role}</Table.Td>
              <Table.Td>
                <Group gap="sm">
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => window.location.href = `/admin/users/${u._id}/edit`}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => axios.delete(`http://localhost:5000/api/users/${u._id}`)
                      .then(() => setUsers((prev) => prev.filter(x => x._id !== u._id)))
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