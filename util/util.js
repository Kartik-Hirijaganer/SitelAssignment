const buildErrorObject = (error, message) => {
    return {
        message,
        errorDetails: error
    }
}

module.exports = {
    buildErrorObject
}