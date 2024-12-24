/**
 * Validates whether a given timestamp is a positive integer.
 *
 * @function
 * @param {number} timestamp - The timestamp to validate.
 * @returns {boolean} `true` if the timestamp is a positive integer; otherwise, `false`.
 */
const isValidDate = (timestamp: number): boolean => {
    return Number.isInteger(timestamp) && timestamp > 0; 
};

export default isValidDate;
