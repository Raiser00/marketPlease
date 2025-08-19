import { TextInput, Button, Container, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



export default function EditMarket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [market, setMarket] = useState({ name: "", description: "", eventDate: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/markets/${id}`)
      .then((res) => setMarket(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/markets/${id}`, market);
    navigate("/admin/markets");
  };

  return (
    <Container>
      <Title order={2} mb="lg" c="blue">✏️ Modifier un Marché</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Nom"
          value={market.name}
          onChange={(e) => setMarket({ ...market, name: e.target.value })}
          mb="sm"
        />
        <TextInput
          label="Description"
          value={market.description}
          onChange={(e) => setMarket({ ...market, description: e.target.value })}
          mb="sm"
        />
        <TextInput
          label="Date"
          type="date"
          value={market.eventDate.split("T")[0]}
          onChange={(e) => setMarket({ ...market, eventDate: e.target.value })}
          mb="sm"
        />
        <Button type="submit" mt="md">✅ Sauvegarder</Button>
      </form>
    </Container>
  );
}
