import { Container, Title, Text } from '@mantine/core';


export default function HomePage() {
    

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
            
        </Container>
    );
}
