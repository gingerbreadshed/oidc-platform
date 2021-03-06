var Boom = require('boom');

module.exports = function(error) {
  if (! error.data.details) {
    return Boom.badImplementation(error);
  }

  error.output.payload.validationErrors = error.data.details.map(failure => ({
    message : failure.message,
    type : failure.type,
    key : failure.path
  }));

  return error;
};
