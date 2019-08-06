import React from 'react';
import styles from './Button.module.css'

export const Button = ({ children, onClick }) => {
    return (
        <button
            className={styles.button}
            type="button"
            onClick={onClick}>
            {children}
        </button>
    )
};