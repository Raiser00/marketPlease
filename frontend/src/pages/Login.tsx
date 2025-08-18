import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Container, Title } from "@mantine/core";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const form = useForm({ initialValues: { email: "", password: "" } });
  const resetForm = useForm({ initialValues: { email: "" } });
  const { login } = useAuth();
  const navigate = useNavigate();

  const [resetMode, setResetMode] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", values);

      const { token } = res.data; // user est dans le token, pas besoin de res.data.user
      login(token);

      // redirection selon rôle (décodé dans AuthContext ou backend)
      navigate("/profile");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Erreur de connexion");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (values: typeof resetForm.values) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", values);
      setMessage(res.data.message || "Un lien a été envoyé à votre email");
      setMessageType("success");
      setResetMode(false);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Erreur lors de l'envoi");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" style={{ textAlign: "center" }}>
      {!resetMode ? (
        <>
          <Title>Connexion</Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="Votre email"
              {...form.getInputProps("email")}
              required
            />
            <PasswordInput
              label="Mot de passe"
              placeholder="Votre mot de passe"
              {...form.getInputProps("password")}
              required
            />
            <Button type="submit" fullWidth mt="md" loading={loading}>
              Se connecter
            </Button>
          </form>
          <Button
            variant="subtle"
            fullWidth
            mt="sm"
            onClick={() => setResetMode(true)}
          >
            Mot de passe oublié ?
          </Button>
        </>
      ) : (
        <>
          <Title>Réinitialiser le mot de passe</Title>
          <form onSubmit={resetForm.onSubmit(handleForgotPassword)}>
            <TextInput
              label="Email"
              placeholder="Votre email"
              {...resetForm.getInputProps("email")}
              required
            />
            <Button type="submit" fullWidth mt="md" loading={loading}>
              Envoyer le lien
            </Button>
            <Button
              variant="subtle"
              fullWidth
              mt="sm"
              onClick={() => setResetMode(false)}
            >
              Retour
            </Button>
          </form>
        </>
      )}

      {message && (
        <p style={{ color: messageType === "error" ? "red" : "green" }}>
          {message}
        </p>
      )}
    </Container>
  );
}
