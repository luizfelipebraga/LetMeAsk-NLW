import { useHistory } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleImg from '../../assets/images/google-icon.svg';

import styles from '../../styles/pages/auth.module.scss';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState<string>('')

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.')
            return;
        }

        if (roomRef.val().endedAt) {
            toast.error('Room already closed!', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                },
            })
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    return (
        <div className={styles.pageAuth}>
            <Toaster />
            <aside>
                <img src={illustrationImg} alt="ILustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas.</p>
            </aside>

            <main>
                <div className={styles.mainContent}>
                    <img src={logoImg} alt="Logo LetmeAsk" />
                    <button className={styles.createRoom} onClick={handleCreateRoom}>
                        <img src={googleImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className={styles.separator}>ou entre em alguma outra sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
