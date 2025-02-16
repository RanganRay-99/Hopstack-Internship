const processErrors = (err) => {
  const errors = [];

  const processErrorsObject = (errorObj, parentKey = null) => {
    for (const key in errorObj) {
      if (Array.isArray(errorObj[key])) {
        errorObj[key].forEach((errorDetail) => {
          if (typeof errorDetail === 'string') {
            // Handle simple error messages
            errors.push({
              message: errorDetail,
              object: parentKey || key,
              key: '__all__',
            });
          } else if (typeof errorDetail === 'object') {
            for (const field in errorDetail) {
              errorDetail[field].forEach((errorMessage) => {
                errors.push({
                  message: errorMessage,
                  object: key,
                  key: field,
                });
              });
            }
          }
        });
      } else if (typeof errorObj[key] === 'object') {
        processErrorsObject(errorObj[key], key);
      }
    }
  };

  if (err.response && err.response.data) {
    const errorResponse = err.response.data;
    processErrorsObject(errorResponse);
  } else {
    errors.push({
      message: 'An error occurred, couldn\'t know error from shippo.',
      object: null,
      key: null,
    });
  }

  return errors;
};

module.exports = processErrors;
