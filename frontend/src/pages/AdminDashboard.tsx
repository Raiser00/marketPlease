import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Select, TextInput, Modal, Group } from '@mantine/core';


export default function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([]);
    const [markets, setMarkets] = useState<any[]>([]);
    const [candidats, setCandidats] = useState<any[]>([]);

    // modal
    const [openedUser, setOpenedUser] = useState(false);
    
    
    const [formUser, setFormUser] = useState<any>({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const u = await api.get('/users');
        setUsers(u.data);
    };

    // users 
    const deleteUser = async (id: string) => {
        await api.delete(`/users/${id}`);
        fetchData();
    };

    const saveUser = async () => {
        if (formUser._id) {
            await api.put(`/users/${formUser._id}`, formUser);
        }
        setOpenedUser(false);
        fetchData();
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

        </>
    );
};

