import React, { PureComponent } from 'react';

import styles from './TextInput.module.css';

export class TextInput extends PureComponent {
    state = {
        value: ''
    };

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    };

    render() {
        const { value } = this.state;

        return (
            <input className={styles.input} type="text" value={value} onChange={this.handleChange}/>
        );
    }
}
