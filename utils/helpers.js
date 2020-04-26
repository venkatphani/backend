function isErrorObj(err) {
  return err && err.stack && err.message;
}

function getError(error) {
  if (isErrorObj(error)) return { message: error.message };
  return error;
}
module.exports.getError = getError;
