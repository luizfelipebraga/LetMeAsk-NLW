import styles from '../styles/room.module.scss';

import {useParams} from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import RoomCode from '../components/RoomCode';

type RoomParams = {
    id: string
}

export default function Room() {
    
    const params = useParams<RoomParams>();
    
    return (
        <div className={styles.pageRoom}>
            <header>
                <div className={styles.content}>
                    <img src={logoImg} alt="Logo LetmeAsk" />
                    <RoomCode code={params.id}/>
                </div>
            </header>

            <main>
                <div className={styles.roomTitle}>
                    <h1>Sala React</h1>
                    <span>4 Perguntas</span>
                </div>


                <form>
                    <textarea placeholder="O que você quer perguntar?"></textarea>
                    <div className={styles.formFooter}>
                        <span>Para enviar uma pergunta, <button>Faça seu Login</button></span>
                        <Button>Enviar Pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}
