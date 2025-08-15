import { Container, Title, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Container
            size={600}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center'
            }}
        >
            <Title order={1} mb="md">
                Bienvenue sur MarketPlease
            </Title>
            <Text size="lg" mb="xl">
                Gérez vos marchés facilement et rapidement !
            </Text>
            <Group ps="center" grow={false} style={{ gap: 20}}>
                <Button onClick={() => navigate('/register')} size="md">
                    S'inscrire
                </Button>
                <Button onClick={() => navigate('/login')} size="md" variant="outline">
                    Se connecter
                </Button>
            </Group>
        </Container>
    );
}
