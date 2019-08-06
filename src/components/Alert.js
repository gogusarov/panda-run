import React, { PureComponent } from 'react';
import cn from 'classnames';
import connect from 'storeon/react/connect';
import styles from './Alert.module.css';
import { scheduleFrame } from '../utils/scheduleFrame';
import { HIDE_TIMEOUT } from '../constants/alerts';

class PureAlert extends PureComponent {
    componentDidMount() {
        scheduleFrame(() => {
            this.setState({
                visible: true,
            });
        });

        if (this.props.autoHide) {
            setTimeout(() => {
                this.setState({
                    visible: false,
                });
            }, HIDE_TIMEOUT);
        }
    }

    state = {
        visible: false,
    };

    handleTransitionEnd = () => {
        const { dispatch, id } = this.props;

        if (!this.state.visible) {
            dispatch('hideAlert', id);
        }
    };

    render() {
        const { type, text, isLast } = this.props;
        const { visible } = this.state;

        return (
            <div
                className={cn({
                    [styles.alert]: true,
                    [styles[type]]: true,
                    [styles.visible]: visible,
                    [styles.last]: isLast,
                })}
                onTransitionEnd={this.handleTransitionEnd}>
                {text}
            </div>
        )
    }
}

export const Alert = connect(PureAlert);