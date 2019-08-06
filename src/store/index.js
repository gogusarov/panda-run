import createStore from 'storeon';
import persistState from '@storeon/localstorage'
import { generateId } from '../utils/generateId';
import { isLastQuestion } from '../utils/questions';
import { MESSAGES, TYPES } from '../constants/alerts';
import { FINISH_SCREEN, START_SCREEN } from '../constants/screens';

const handlers = (store) => {
    store.on('@init', () => ({ appScreen: START_SCREEN, questionIndex: 0, radar: false, alerts: [] }));

    store.on('toggleRadar', ({ radar }) => ({ radar: !radar}));

    store.on('incrementQuestion', ({ questionIndex }) => {
        store.dispatch('showAlert', { type: TYPES.SUCCESS, text: MESSAGES.RIGHT_ANSWER });

        if (isLastQuestion(questionIndex)) {
            store.dispatch('changeScreen', FINISH_SCREEN);
        } else {
            return { questionIndex: questionIndex + 1 };
        }
    });

    store.on('changeScreen', (state, screen) => ({ appScreen: screen }));

    store.on('showAlert', ({ alerts }, alert) => {
        const { autoHide = true } = alert;

        return {
            alerts: alerts.concat({ ...alert, id: generateId(), autoHide })
        }
    });

    store.on('hideAlert', ({ alerts }, id) => {
        return {
            alerts: alerts.filter((item) => item.id !== id),
        }
    });
};

export const store = createStore([handlers, persistState(['appScreen', 'questionIndex', 'radar'])]);