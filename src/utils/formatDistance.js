import { UNITS } from '../constants/units';

export const formatDistance = (distance) => {
    if (distance > 1000) {
        return `${Math.round(distance / 100) / 10}${UNITS.KM}`;
    } else if (distance > 10) {
        return `${Math.round(distance / 10) * 10}${UNITS.M}`;
    } else {
        return `${distance}${UNITS.M}`;
    }
};