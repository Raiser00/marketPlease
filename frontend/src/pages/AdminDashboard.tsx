import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Select, TextInput, Modal, Group, Drawer } from '@mantine/core';

export default function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([]);
    const [markets, setMarkets] = useState<any[]>([]);
    const [candidats, setCandidats] = useState<any[]>([]);
    const [selectedMarket, setSelectMarket] = useState<string | null>(null);

    // modal
    const [openedUser, setOpenedUser] = useState(false);
    const [openedMarket, setOpenedMarket] = useState(false);

    // form states
    const [formUser, setFormUser] = useState<any>({});
    const [formMarket, setFormMarket] = useState<any>({});

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
    try {
      const u = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(u.data);

      const m = await api.get('/markets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMarkets(m.data);
    } catch (err) {
      console.error("Erreur fetchData :", err);
      alert("Impossible de charger");
    }
  };

    // users
    const deleteUser = async (id: string) => {
    try {
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Utilisateur supprimé");
      fetchData();
    } catch (err) {
      console.error("Erreur suppression utilisateur :", err);
      alert("Erreur lors de la suppression de l'utilisateur");
    }
  };

    const saveUser = async () => {
    try {
      if (formUser._id) {
        await api.put(`/users/${formUser._id}`, formUser, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Utilisateur modifié");
      } else {
        await api.post(`/users`, formUser, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Utilisateur ajouté");
      }
      setOpenedUser(false);
      fetchData();
    } catch (err) {
      console.error("Erreur saveUser :", err);
      alert("Erreur de l'enregistreement de l'utilisateur");
    }
  };

    // markets
    const deleteMarket = async (id: string) => {
    try {
      await api.delete(`/markets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Marché supprimé");
      fetchData();
    } catch (err) {
      console.error("Erreur suppression marché :", err);
      alert("Erreur lors de la suppression d'un marché");
    }
  };

    const saveMarket = async () => {
    try {
      if (formMarket._id) {
        await api.put(`/markets/${formMarket._id}`, formMarket, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Marché modifié");
      } else {
        await api.post(`/markets`, formMarket, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("MArché ajouté");
      }
      setOpenedMarket(false);
      fetchData();
    } catch (err) {
      console.error("Erreur saveMarket :", err);
      alert("Erreur lors de l'enregistrement de marché");
    }
  };

    // application (candidatures)
    const voirCandidats = async (marketId: string) => {
    try {
      setSelectMarket(marketId);
      const res = await api.get(`/applications/for-market/${marketId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCandidats(res.data);
    } catch (err) {
      console.error("Erreur voirCandidats :", err);
      alert("Impossible de charger les candidatures pour ce marché")
    }
  };

    const attribuer = async (appId: string) => {
    try {
      await api.put(`/applications/${appId}/accepter`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Candidature acceptée');
      setCandidats([]);
      setSelectMarket(null);
      fetchData();
    } catch (err) {
      console.error("Erreur attribution candidature :", err);
      alert("Erreur lors de l'atribution de la candidature");
    }
  };

    return (
        <>
            <h2>Utilisateurs</h2>
            {users.map((u) => (
                <Card key={u._id} mt="md" shadow='sm'>
                    <b>{u.firstName} {u.lastName}</b> - {u.email} ({u.role})
                    <Group mt="sm">
                        <Button size="xs" onClick={() => { setFormUser(u); setOpenedUser(true); }}>Modifier</Button>
                        <Button size="xs" color="red" onClick={() => deleteUser(u._id)}>Supprimer</Button>
                    </Group>
                </Card>
            ))}

            <h2>Marchés</h2>
            <Button mt="md" onClick={() => { setFormMarket({}); setOpenedMarket(true); }}>Ajouter un marché</Button>
            {markets.map((m) => (
                <Card key={m._id} mt="md" shadow='sm'>
                    <b>{m.name}</b> - {m.description} ({m.status})
                    <Group mt="sm">
                        <Button size="xs" onClick={() => { setFormMarket(m); setOpenedMarket(true); }}>Modifier</Button>
                        <Button size="xs" color="red" onClick={() => deleteMarket(m._id)}>Supprimer</Button>
                    </Group>
                </Card>
            ))}

            <h2>Candidatures</h2>
            <Select 
                data={markets.map((m) => ({ value: m._id, label: m.name}))}
                placeholder="Selectionner un marché"
                value={selectedMarket}
                onChange={(id) => voirCandidats(id!)}
            />
            {candidats.map((app) => (
                <Card key={app._id} mt="md" shadow="sm">
                    {app.userId?.firstName} {app.userId?.lastName} - {app.status}
                    <Button color="green" mt="md" onClick={() => attribuer(app._id)}>
                        Attribuer
                    </Button>
                </Card>
            ))}

            {/* modal market */}

            {/* modal user */}
            <Modal opened={openedUser} onClose={() => setOpenedUser(false)} title="Modifier l'utilisateur">
                <TextInput
                    label="Prénom"
                    value={formUser.firstName || ''}
                    onChange={(e) => setFormUser({ ...formUser, firstName: e.target.value })}
                />
                <TextInput
                    label="Nom"
                    value={formUser.lastName || ''}
                    onChange={(e) => setFormUser({ ...formUser, lastName: e.target.value })}
                />
                <TextInput
                    label="Email"
                    value={formUser.email || ''}
                    onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                />
                
                <Button mt="md" onClick={saveUser}>Enregistrer</Button>
            </Modal>

            {/* modal market */}
            <Modal opened={openedMarket} onClose={() => setOpenedMarket(false)} title="Modifier le marché">
                <TextInput
                    label="Nom"
                    value={formMarket.name || ''}
                    onChange={(e) => setFormMarket({ ...formMarket, name: e.target.value })}
                />
                <TextInput
                    label="Description"
                    value={formMarket.description || ''}
                    onChange={(e) => setFormMarket({ ...formMarket, description: e.target.value })}
                />
                <Select
                    label="Statut"
                    data={['Ouvert', 'Fermé']}
                    value={formMarket.status || ''}
                    onChange={(value) => setFormMarket({ ...formMarket, status: value })}
                />
                
                <Button mt="md" onClick={saveMarket}>Enregistrer</Button>
            </Modal>

        </>
    );
};

