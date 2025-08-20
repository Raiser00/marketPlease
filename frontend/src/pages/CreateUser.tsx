import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Button, Group, Select } from "@mantine/core";
import api from "../services/api";

export default function CreateUser() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "gestionnaire",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password) {
      alert("Merci de remplir tous les champs requis");
      return;
    }

    try {
      setLoading(true);
      await api.post(
        "/users",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Utilisateur créé avec succès");
      navigate("/admin/users");
    } catch (err: any) {
      console.error("Erreur création utilisateur :", err);
      alert("Impossible de créer l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Créer un utilisateur</h2>

      <TextInput
        label="Prénom"
        placeholder="Prénom"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.currentTarget.value })}
        required
        mt="md"
      />

      <TextInput
        label="Nom"
        placeholder="Nom"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.currentTarget.value })}
        required
        mt="md"
      />

      <TextInput
        label="Email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
        required
        mt="md"
      />

      <TextInput
        label="Téléphone"
        placeholder="Téléphone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        mb="sm"
        />

      <TextInput
        type="password"
        label="Mot de passe"
        placeholder="Mot de passe"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.currentTarget.value })}
        required
        mt="md"
      />

      <Select
        label="Rôle"
        data={[
          { value: "gestionnaire", label: "Gestionnaire" },
          { value: "admin", label: "Admin" },
        ]}
        value={form.role}
        onChange={(value) => setForm({ ...form, role: value || "gestionnaire" })}
        mt="md"
      />

      <Group justify="flex-end" mt="xl">
        <Button variant="outline" onClick={() => navigate("/admin/users")}>
          Annuler
        </Button>
        <Button loading={loading} onClick={handleSubmit}>
          Créer
        </Button>
      </Group>
    </div>
  );
}
