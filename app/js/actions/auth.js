var Token = require('../api/token');
var constants = require('../constants/auth');

function login(username, password) {
  this.dispatch(constants.LOGIN);
  Token
    .request(username, password)
    .then(() => {
      this.dispatch(constants.LOGIN_SUCCESS, { username });
    })
    .catch((err) => {
      this.dispatch(constants.LOGIN_FAILURE, { err });
    })
}

function logout() {
  Token.remove();
  this.dispatch(constants.LOGOUT);
}

module.exports = {
  login,
  logout
};