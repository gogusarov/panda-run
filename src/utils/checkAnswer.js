const normalizeString = (str) => str.trim().toLowerCase();
const toArray = (value) => Array.isArray(value) ? value : [value];

export const isCorrectAnswer = (userInput, questionAnswer) => {
    const userAnswer = normalizeString(userInput);
    const expectedAnswers = toArray(questionAnswer).map(normalizeString);

    return expectedAnswers.indexOf(userAnswer) > -1;
};