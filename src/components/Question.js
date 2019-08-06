import React, { PureComponent } from 'react';
import { TextInput } from './TextInput';
import { Button } from './Button';

import styles from './Question.module.css'

export class Question extends PureComponent {
    constructor(props) {
        super(props);

        this.input = React.createRef();
    }


    handleClick = () => {
        this.props.onAnswer(this.input.current.state.value);
    };

    render() {
        const { index, text } = this.props;

        return (
            <div className={styles.questionBlock}>
                <p className={styles.questionTitle}>
                    Вопрос № {index + 1}
                </p>
                <p className={styles.questionText}>
                    {text}
                </p>
                <div className={styles.questionControls}>
                    <TextInput key={index} ref={this.input} />
                    <Button onClick={this.handleClick}>Ответить</Button>
                </div>
            </div>
        )
    }
}