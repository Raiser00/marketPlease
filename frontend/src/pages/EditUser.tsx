import { TextInput, Button, Container, Title, Select, PasswordInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



export default function EditUser() {
  const { id } = useParams();
  console.log("EditUser id:", id);
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", role: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.put(`http://localhost:5000/api/users/${id}`, user, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/admin/users");
  };

  return (
    <Container>
      <Title order={2} mb="lg" c="blue">✏️ Modifier un Utilisateur</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Prénom"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          mb="sm"
        />
        <TextInput
          label="Nom"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          mb="sm"
        />
        <TextInput
          label="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          mb="sm"
        />
        <TextInput
            label="Téléphone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            mb="sm"
        />
        <Select
          label="Rôle"
          data={[
            { value: "gestionnaire", label: "Gestionnaire" },
            { value: "admin", label: "Admin" },
          ]}
          value={user.role}
          onChange={(value) => setUser({ ...user, role: value || "gestionnaire" })}
          mb="sm"
        />
        <Button type="submit" mt="md">✅ Sauvegarder</Button>
      </form>
    </Container>
  );
}
