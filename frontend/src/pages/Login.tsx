import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Container, Title } from '@mantine/core';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const form = useForm({ initialValues: { email: '', password: '' } });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values: typeof form.values) => {
        const res = await api.post('/auth/login', values);
        login(res.data.token);
        navigate('/profile');

    };

    return (
        <Container size="sm" style={{ textAlign: "center" }}>
            <Title>Connexion</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label="Email" placeholder="Votre email" {...form.getInputProps('email')} required />
            <PasswordInput label="Mot de passe" placeholder="Votre mot de passe" {...form.getInputProps('password')} required />
            <Button type="submit" fullWidth mt="md">Se connecter</Button>
            </form>
        </Container>
    );
}