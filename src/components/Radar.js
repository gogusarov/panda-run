import React from 'react';
import cn from 'classnames';
import { formatDistance } from '../utils/formatDistance';

import styles from './Radar.module.css';

export const Radar = ({ isRightDirection, distance }) => {
    return (
        <div className={styles.radarBlock}>
            <div className={cn({
                [styles.radar]: true,
                [styles.rightDirection]: isRightDirection
            })}>
                <div className={styles.distance}>
                    <span className={styles.distanceText}>{formatDistance(distance)}</span>
                </div>
            </div>
        </div>
    );
};