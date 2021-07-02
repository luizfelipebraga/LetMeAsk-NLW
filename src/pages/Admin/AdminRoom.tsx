import styles from '../../styles/pages/room.module.scss';

import { useParams } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import RoomCode from '../../components/RoomCode';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../../services/firebase';
import Question from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';

type RoomParams = {
    id: string
}

export default function AdminRoom() {

    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState<string>('');

    const { questions, title } = useRoom(roomId)

    async function handleSendQuestion(event: FormEvent) {

        event.preventDefault();

        if (newQuestion.trim() === '') {
            toast.error("You must fill the white space")
            return;
        }

        if (!user) {
            toast.error("You must be logged in")
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user?.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

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
