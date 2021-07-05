import styles from '../../styles/pages/room.module.scss';

import { useParams } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import RoomCode from '../../components/RoomCode';
import { Toaster } from 'react-hot-toast';
import Question from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';

type RoomParams = {
    id: string
}

export default function AdminRoom() {

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { questions, title } = useRoom(roomId)

    return (
        <div className={styles.pageRoom}>
            <Toaster />
            <header>
                <div className={styles.content}>
                    <img src={logoImg} alt="Logo LetmeAsk" />

                    <div>
                        <RoomCode code={roomId} />
                        <Button>Encerrar sala</Button>
                    </div>

                </div>
            </header>

            <main>
                <div className={styles.roomTitle}>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>

                <div className={styles.questionList}>
                    {
                        questions.map((question) => {
                            return (
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    author={question.author} />
                            )
                        })
                    }
                </div>
            </main>
        </div>
    )
}
