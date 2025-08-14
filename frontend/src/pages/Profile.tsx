import { useEffect, useState } from 'react';
import { TextInput, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import api from '../services/api';
import { de } from 'zod/locales';

export default function Profile() {
    const [user, setUser] = useState<any>(null);

    const form = useForm({
        initialValues: { firstName: '', lastName: '', phone: '',
        }, });

    useEffect(() => {
        api.get('/users/me').then(res => {
            setUser(res.data);
            form.setValues({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                phone: res.data.phone,
            });
        });
    }, []);

    const update = async () => {
        await api.put('/users/me', form.values);
        alert('Profil mis à jour !');
    };

    const supprimer = async () => {
        if (confirm('Supprimer votre compte ?')) {
            await api.delete('/users/me');
            alert('Compte supprimé avec succès !');
            localStorage.clear();
            window.location.href = '/login';
        }
    };

    return (
        <Container>
            <h2>Mon compte</h2>
            <form onSubmit={form.onSubmit(update)}>
                <TextInput label="Prénom" placeholder="Votre prénom" {...form.getInputProps('firstName')} required />
                <TextInput label="Nom" placeholder="Votre nom" mt="md" {...form.getInputProps('lastName')} required />
                <TextInput label="Téléphone" placeholder="Votre téléphone" mt="md" {...form.getInputProps('phone')} required />
                <Button type="submit" fullWidth mt="md">Mettre à jour</Button>
                </form>
            <Button color="red" fullWidth mt="md" onClick={supprimer}>Supprimer mon compte</Button>

        </Container>
    );
}