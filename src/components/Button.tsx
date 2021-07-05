import { ButtonHTMLAttributes } from 'react';

import styles from '../styles/components/button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutline?: boolean
};


export function Button(props: ButtonProps) {
    return (
        <button className={styles.button} {...props}/>
    )
}