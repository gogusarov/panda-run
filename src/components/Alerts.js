import React, { PureComponent } from 'react'
import connect from 'storeon/react/connect';
import { Alert } from './Alert';
import styles from './Alerts.module.css';

class PureAlerts extends PureComponent {
    render() {
        const { alerts } = this.props;

        return (
            <div className={styles.alertsBlock}>
                {alerts.map((item, index) => (<Alert key={item.id} isLast={index === alerts.length - 1}  {...item}/>))}
            </div>
        );
    }
}

export const Alerts = connect('alerts', PureAlerts);



