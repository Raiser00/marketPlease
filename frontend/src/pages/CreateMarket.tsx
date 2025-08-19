import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Textarea, Button, Group, Select } from "@mantine/core";
import api from "../services/api";

export default function CreateMarket() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    eventDate: "",
    status: "open",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.eventDate) {
      alert("Merci de remplir tous les champs requis");
      return;
    }

    try {
      setLoading(true);
      await api.post(
        "/markets",
        {
          name: form.name,
          description: form.description,
          eventDate: new Date(form.eventDate), // conversion en Date pour Mongo
          status: form.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Marché créé avec succès");
      navigate("/admin/markets");
    } catch (err) {
      console.error("Erreur création marché :", err);
      alert("Impossible de créer le marché");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Créer un marché</h2>

      <TextInput
        label="Nom"
        placeholder="Nom du marché"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
        required
        mt="md"
      />

      <Textarea
        label="Description"
        placeholder="Description du marché"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.currentTarget.value })}
        required
        mt="md"
      />

      <TextInput
        type="date"
        label="Date de l'événement"
        value={form.eventDate}
        onChange={(e) => setForm({ ...form, eventDate: e.currentTarget.value })}
        required
        mt="md"
      />

      <Select
        label="Statut"
        data={[
          { value: "open", label: "Ouvert" },
          { value: "closed", label: "Fermé" },
        ]}
        value={form.status}
        onChange={(value) => setForm({ ...form, status: value || "open" })}
        mt="md"
      />

      <Group justify="flex-end" mt="xl">
        <Button variant="outline" onClick={() => navigate("/admin/markets")}>
          Annuler
        </Button>
        <Button loading={loading} onClick={handleSubmit}>
          Créer
        </Button>
      </Group>
    </div>
  );
}
