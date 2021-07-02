import { Link, useHistory } from 'react-router-dom'

import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import styles from '../styles/auth.module.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export default function NewRoom() {

    const history = useHistory();
    const { user } = useAuth()
    const [newRoom, setNewRoom] = useState<string>('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        }) 

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div className={styles.pageAuth}>
            <aside>
                <img src={illustrationImg} alt="ILustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas.</p>
            </aside>

            <main>
                <div className={styles.mainContent}>
                    <img src={logoImg} alt="Logo LetmeAsk" />
                    <h2>Criar uma nova Sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}
