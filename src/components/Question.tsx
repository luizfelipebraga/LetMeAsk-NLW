import { ReactNode } from 'react';
import styles from '../styles/components/question.module.scss';
import cx from 'classnames';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    },
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export default function Question({ content, author, children, isAnswered = false, isHighlighted = false }: QuestionProps) {
    return (
        <div className={cx(styles.question,
            { questionAwsered: isAnswered },
            { questionHighlighted: isHighlighted && !isAnswered},
        )}>
            <p>{content}</p>

            <footer>
                <div className={styles.userInfo}>
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}
