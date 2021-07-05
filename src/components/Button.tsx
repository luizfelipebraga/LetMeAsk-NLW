import { ButtonHTMLAttributes } from 'react';

import styles from '../styles/components/button.module.scss';
import cx from 'classnames';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};


export function Button({ isOutlined, ...props }: ButtonProps) {
    return (
        <button className={cx(styles.button, 
            { outlined: isOutlined },
            )} {...props} />
    )
}