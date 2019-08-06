import React, { PureComponent } from 'react';
import connect from 'storeon/react/connect';
import logo from '../../assets/runcity.jpg';
import styles from './StartScreen.module.css';
import { Button } from '../Button';
import { GAME_SCREEN } from '../../constants/screens';

class PureStartScreen extends PureComponent {
    onStartClick = () => {
        this.props.dispatch('changeScreen', GAME_SCREEN)
    };

    render() {
        return (
            <div className={styles.startBlock}>
                <img src={logo} className={styles.logo} alt="Бегущий город" />

                <p className={styles.introText}>
                    Категория &laquo;<b>Панда</b>&raquo; <br/>Все КП даны загадками. Пешком (бегом) и на общественном транспорте. Время прохождения не учитывается.
                </p>

                <div className={styles.startBtn}>
                    <Button  onClick={this.onStartClick}>На старт!</Button>
                </div>
            </div>
        );
    }
}

export default connect(PureStartScreen);