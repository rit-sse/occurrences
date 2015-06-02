var Fluxxor = require('fluxxor');
var constants = require('../constants/auth');

var Auth = Fluxxor.createStore({

  initialize() {
    this.data = {};

    this.bindActions(
      constants.LOGIN, this.onLogin,
      constants.LOGIN_SUCCESS, this.onLoginSuccess,
      constants.LOGIN_FAILURE, this.onLoginFailure);
  },

  onLogin() {
    this.data.loading = true;
    this.data.error = undefined;
    this.emit('change');
  },

  onLoginSuccess(payload) {
    this.data.loading = false;
    this.data.username = payload.username;
    this.emit('change');
  },

  onLoginFailure(payload) {
    this.data.loading = false;
    this.data.error = payload.err.message;
    this.emit('change');
  },

  getState() {
    return this.data;
  }
});

module.exports = Auth;