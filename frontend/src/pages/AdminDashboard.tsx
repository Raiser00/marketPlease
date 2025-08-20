import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Card, Button, Select, TextInput, Modal, Group, Drawer } from '@mantine/core';

export default function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([]);
    const [markets, setMarkets] = useState<any[]>([]);
    const [candidats, setCandidats] = useState<any[]>([]);
    const [selectedMarket, setSelectMarket] = useState<string | null>(null);



    const token = localStorage.getItem("token");
    const navigate = useNavigate();

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
            <Group mt="md">
              <Button onClick={() => navigate("/admin/users")}>Voir tous les utilisateurs</Button>
              <Button onClick={() => navigate("/admin/users/create")}>Ajouter un utilisateur</Button>
            </Group>

            <h2>Marchés</h2>
            <Group mt="md">
            <Button onClick={() => navigate("/admin/markets")}>Voir tous les marchés</Button>
            <Button onClick={() => navigate("/admin/markets/create")}>Ajouter un marché</Button>
            </Group>
              

            <h2>Candidatures</h2>
            <Group mt="md">
              <Button onClick={() => navigate("/admin/applications")}>Voir les candidatures en attente</Button>
            </Group>
           

          

            

        </>
    );
};

