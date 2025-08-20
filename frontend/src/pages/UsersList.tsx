import { Table, Button, Container, Title, Group, ScrollArea } from "@mantine/core";
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
    axios.get("http://localhost:5000/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <Container>
      <Title order={2} mb="lg" ta="center" c="blue">
        👥 Gestion des Utilisateurs
      </Title>

      <ScrollArea>
        <Table
          striped
          highlightOnHover
          verticalSpacing="md"
          horizontalSpacing="md"
          style={{
            minWidth: 800,
            border: "1px solid #e0e0e0",
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <thead style={{ backgroundColor: "#3c1a1aff", fontWeight: 600, textAlign: "center" }}>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.role}</td>
                <td>
                  <Group justify="center" gap="sm">
                    <Button
                      size="xs"
                      variant="light"
                      onClick={() => (window.location.href = `/admin/users/${u._id}/edit`)}
                    >
                      Modifier
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      variant="light"
                      onClick={() =>
                        axios.delete(`http://localhost:5000/api/users/${u._id}`)
                          .then(() => setUsers((prev) => prev.filter((x) => x._id !== u._id)))
                      }
                    >
                      Supprimer
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}
