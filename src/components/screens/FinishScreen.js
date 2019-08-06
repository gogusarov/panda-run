import React from 'react'
import styles from './FinishScreen.module.css';
import pic from '../../assets/panda.jpeg';

export default function() {
    return (
        <div className={styles.finishBlock}>
            <img className={styles.pandaPic} src={pic} alt="Ура!" />
            <span className={styles.greeting}>Ура!</span>
        </div>
    )
}