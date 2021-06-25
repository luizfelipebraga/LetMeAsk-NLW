import {Link} from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import styles from '../styles/auth.module.scss';
import { Button } from '../components/Button';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function NewRoom() {
    const {user} = useContext(AuthContext)

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
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova Sala</h2>
                    <form>
                        <input 
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
