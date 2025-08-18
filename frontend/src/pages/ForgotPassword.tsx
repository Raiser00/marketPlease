import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Title } from "@mantine/core";
import api from "../services/api";
import { useState } from "react";

export default function ForgotPassword() {
  const form = useForm({ initialValues: { email: "" } });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await api.post("/auth/forgot-password", values);
      setMsg(res.data.message || "Un email a été envoyé si l'adresse existe.");
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Erreur lors de l'envoi de l'email");
    }
  };

  return (
    <Container size="sm" style={{ textAlign: "center" }}>
      <Title>Mot de passe oublié</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="Votre email"
          {...form.getInputProps("email")}
          required
        />
        <Button type="submit" fullWidth mt="md">Envoyer</Button>
      </form>
      {msg && <p>{msg}</p>}
    </Container>
  );
}
