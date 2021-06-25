import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';

import styles from '../styles/auth.module.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';


export default function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()

    async function handleCreateRoom() {
        if(!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')
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
                    <button className={styles.createRoom} onClick={handleCreateRoom}>
                        <img src={googleImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className={styles.separator}>ou entre em alguma outra sala</div>
                    <form>
                        <input
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
