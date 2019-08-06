import { POSITION_OPTIONS } from '../constants/position';

const { navigator: { geolocation } } = window;

const createLocationObserver = () => {
    let watchId = null;

    const subscribe = (onLocationChange) => {
        watchId = geolocation.watchPosition(
            (position) => {
                onLocationChange(position.coords.latitude, position.coords.longitude);
            },
            (e) => {
                console.warn(e)
            },
            POSITION_OPTIONS
        );
    };

    const unsubscribe = () => {
        geolocation.clearWatch(watchId);
    };

    return {
        subscribe,
        unsubscribe
    }
};

export const locationObserver = createLocationObserver();