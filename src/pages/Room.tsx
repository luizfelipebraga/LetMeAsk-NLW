import styles from '../styles/room.module.scss';

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

export default function Room() {
    return (
        <div className={styles.pageRoom}>
            <header>
                <div className={styles.content}>
                    <img src={logoImg} alt="Logo LetmeAsk" />
                    <div>codigo</div>
                </div>
            </header>

            <main className={styles.content}>
                <div className={styles.roomTitle}>
                    <h1>Sala React</h1>
                    <span>4 Perguntas</span>
                </div>
            </main>

            <form >
                <textarea placeholder="O que você quer perguntar?"/>

                <div className={styles.formFooter}>
                    <span>Para enviar uma pergunta, <button>Faça seu Login</button></span>
                    <Button>Enviar Pergunta</Button>
                </div>
            </form>
        </div>
    )
}
