import { Button, Container, TextInput, PasswordInput, Title, Paper, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import api from '../services/api';

export default function Register() {
    const [step, setStep] = useState<'signup' | 'verify'>('signup');
    const [email, setEmail] = useState('');

    const form = useForm({
        initialValues: { firstName: '', lastName: '', email: '', phone: '', password: '', code: '',
        }, });

        const handleSubmit = async (values: typeof form.values) => {
    if (step === 'signup') {
      await api.post('/auth/signup', values);
      setEmail(values.email);
      setStep('verify');
    } else {
      await api.post('/auth/verify', { email, code: values.code });
      alert('Compte vérifié ! Vous pouvez maintenant vous connecter.');
      form.reset();
      setStep('signup');
    }
  };


    return (
    <Container size={420} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper shadow="xs" p="xl" style={{ width: '100%' }}>
        <Title style={{ textAlign: 'center'}} mb="md">
          {step === 'signup' ? 'Inscription' : 'Vérification'}
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {step === 'signup' ? (
              <>
                <TextInput
                  label="Prénom"
                  placeholder="Votre prénom"
                  {...form.getInputProps('firstName')}
                  required
                />
                <TextInput
                  label="Nom"
                  placeholder="Votre nom"
                  {...form.getInputProps('lastName')}
                  required
                />
                <TextInput
                  label="Email"
                  placeholder="Votre email"
                  {...form.getInputProps('email')}
                  required
                />
                <TextInput
                  label="Téléphone"
                  placeholder="Votre téléphone"
                  {...form.getInputProps('phone')}
                  required
                />
                <PasswordInput
                  label="Mot de passe"
                  placeholder="Votre mot de passe"
                  {...form.getInputProps('password')}
                  required
                />
                <Button fullWidth mt="md" type="submit">S'inscrire</Button>
              </>
            ) : (
              <>
                <TextInput
                  label="Code de vérification"
                  placeholder="Entrez le code reçu par email"
                  {...form.getInputProps('code')}
                  required
                />
                <Button fullWidth mt="md" type="submit">Vérifier</Button>
              </>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}