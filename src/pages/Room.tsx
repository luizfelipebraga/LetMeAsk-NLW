import styles from '../styles/room.module.scss';

import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import RoomCode from '../components/RoomCode';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../services/firebase';


type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type FirebaseQuestions = Record<string, {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type RoomParams = {
    id: string
}

export default function Room() {
    const { user } = useAuth();

    const params = useParams<RoomParams>();

    const [newQuestion, setNewQuestion] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState<string>('');

    const roomId = params.id;

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])

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
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className={styles.roomTitle}>
                    <h1>Sala {title}</h1>
                    {questions.length> 0 && <span>{questions.length} Pergunta(s)</span> }
                </div>


                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className={styles.formFooter}>
                        {user ? (
                            <div className={styles.userInfo}>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>Faça seu Login</button></span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
    )
}
