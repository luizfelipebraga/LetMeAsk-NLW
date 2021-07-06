import styles from '../../styles/pages/room.module.scss';

import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import { Button } from '../../components/Button';
import RoomCode from '../../components/RoomCode';
import { Toaster } from 'react-hot-toast';
import Question from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

type RoomParams = {
    id: string
}

export default function AdminRoom() {

    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return (
        <div className={styles.pageRoom}>
            <Toaster />
            <header>
                <div className={styles.content}>
                    <img src={logoImg} alt="Logo LetmeAsk" />

                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
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
                                    author={question.author}
                                    isAnswered={question.isAnswered}
                                    isHighlighted={question.isHighlighted}
                                >
                                    <div className={styles.boxButtons}>

                                        {question.isAnswered ? (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteQuestion(question.id)}>
                                                <img src={deleteImg} alt="Deletar pegunta" />
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                                    <img src={checkImg} alt="Marcar pergunta respondida" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleHighlightQuestion(question.id)}>
                                                    <img src={answerImg} alt="Dar destaque a pergunta" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteQuestion(question.id)}>
                                                    <img src={deleteImg} alt="Deletar pegunta" />
                                                </button>
                                            </>
                                        )}

                                    </div>
                                </Question>
                            )
                        })
                    }
                </div>
            </main>
        </div>
    )
}
