import React, { PureComponent } from 'react';
import connect from 'storeon/react/connect';
import calculateDistance from 'dist-two-points';
import Toggle from 'react-toggle'
import { Question } from '../Question';
import { Radar } from '../Radar';
import { locationObserver } from '../../utils/locationObserver';
import { isCorrectAnswer } from '../../utils/checkAnswer';
import { QUESTIONS } from '../../constants/questions';
import { MESSAGES, TYPES } from '../../constants/alerts';

import styles from './GameScreen.module.css';
import 'react-toggle/style.css';
import '../Toggle.css';

class PureGameScreen extends PureComponent {

    componentDidMount() {
        locationObserver.subscribe(this.onLocationChange);
    }

    componentWillUnmount() {
        locationObserver.unsubscribe();
    }

    state = {
        distance: Infinity,
        isRightDirection: true,
    };

    onLocationChange = (curLatitude, curLongitude) => {
        const { questionIndex } = this.props;
        const { latitude: questionLatitude, longitude: questionLongitude } = QUESTIONS[questionIndex].coords;
        const distance = calculateDistance(curLatitude, curLongitude, questionLatitude, questionLongitude);
        const isRightDirection = distance <= this.state.distance;

        this.setState({
            isRightDirection,
            distance
        });
    };

    toggleRadar = () => {
        this.props.dispatch('toggleRadar');
    };

    handleAnswer = (value) => {
        const { questionIndex, dispatch } = this.props;

        if (isCorrectAnswer(value, QUESTIONS[questionIndex].answer)) {
            dispatch('incrementQuestion');
        } else {
            dispatch('showAlert', { type: TYPES.ERROR, text: MESSAGES.WRONG_ANSWER })
        }
    };

    render() {
        const { questionIndex, radar } = this.props;
        const { isRightDirection, distance } = this.state;
        
        return (
            <div className={styles.gameBlock}>
                <div className={styles.toggleBlock}>
                    <label className={styles.toggleLabel} htmlFor='radarToggle'>Радар</label>
                    <Toggle
                        id='radarToggle'
                        checked={radar}
                        icons={false}
                        onChange={this.toggleRadar}/>
                </div>

                {radar ?
                    <Radar isRightDirection={isRightDirection} distance={distance} /> :
                    <Question index={questionIndex} onAnswer={this.handleAnswer} {...QUESTIONS[questionIndex]} />
                }
            </div>
        );
    }
}

export default connect('radar', 'questionIndex', PureGameScreen);