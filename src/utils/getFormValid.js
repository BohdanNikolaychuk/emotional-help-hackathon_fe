const getIsFormValid = (...isValidInput) => {
    return isValidInput.every((isValid) => isValid);
}

export default getIsFormValid;
