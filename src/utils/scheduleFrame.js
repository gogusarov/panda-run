export const scheduleFrame = (callback, ...args) => {
    requestAnimationFrame(() => requestAnimationFrame(() => callback(...args)));
};