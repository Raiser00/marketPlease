import { Button, Container, TextInput, PasswordInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import api from '../services/api';

export default function Register() {
    const form = useForm({
        initialValues: { firstName: '', lastName: '', email: '', phone: '', password: '',
        }, });

        const handleSubmit = async (values: typeof form.values) => {
            await api.post('/auth/signup', values);
            alert("Inscription réussie !");
        };

    return (
        <Container size={420} my={40}>
            <Title>Inscription</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Prénom"
                    placeholder="Votre prénom"
                    {...form.getInputProps('firstName')} required
                />
                <TextInput
                    label="Nom"
                    placeholder="Votre nom"
                    mt="md"
                    {...form.getInputProps('lastName')} required
                />
                <TextInput
                    label="Email"
                    placeholder="Votre email"
                    mt="md"
                    {...form.getInputProps('email')} required
                />
                <TextInput
                    label="Téléphone"
                    placeholder="Votre téléphone"
                    mt="md"
                    {...form.getInputProps('phone')} required
                />
                <PasswordInput
                    label="Mot de passe"
                    placeholder="Votre mot de passe"
                    mt="md"
                    {...form.getInputProps('password')} required
                />
                <Button fullWidth mt="xl" type="submit">S'inscrire</Button>
            </form>
        </Container>
    );
}