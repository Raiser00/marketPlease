import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { PasswordInput, Button, Container, Title } from "@mantine/core";
import api from "../services/api";
import { useState } from "react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const form = useForm({ initialValues: { password: "" } });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await api.post(`/auth/reset-password/${token}`, values);
      setMsg(res.data.message || "Mot de passe changé ✅");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Erreur lors de la réinitialisation");
    }
  };

  return (
    <Container size="sm" style={{ textAlign: "center" }}>
      <Title>Réinitialiser le mot de passe</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          label="Nouveau mot de passe"
          placeholder="••••••••"
          {...form.getInputProps("password")}
          required
        />
        <Button type="submit" fullWidth mt="md">Réinitialiser</Button>
      </form>
      {msg && <p>{msg}</p>}
    </Container>
  );
}
