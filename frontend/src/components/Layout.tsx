import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppShell, Group, Button, Container } from "@mantine/core";

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Container size="sm" style={{ textAlign: "center" }}>
        <Group justify="space-between" align="center" h={60} px="md">
          <Group gap="md" align="center">
            <Link to="/">🏠 Accueil</Link>
            <Link to="/market">🛒 Marchés</Link>
            {token && <Link to="/profile">👤 Profil</Link>}
            {role === "admin" && <Link to="/admin">🛠️ Admin</Link>}
          </Group>

          <Group gap="sm">
            {!token ? (
              <>
                <Button variant="light" onClick={() => navigate("/login")}>
                  Connexion
                </Button>
                <Button onClick={() => navigate("/register")}>
                  S'inscrire
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={logout}>
                Se déconnecter
              </Button>
            )}
          </Group>
        </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" mt="md">
        <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
