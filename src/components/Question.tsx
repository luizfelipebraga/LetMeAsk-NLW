import styles from '../styles/components/question.module.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
}

export default function Question({content, author}: QuestionProps) {
    return (
        <div className={styles.question}>
            <p>{content}</p>

            <footer>
                <div className={styles.userInfo}>
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div></div>
            </footer>
        </div>
    )
}
