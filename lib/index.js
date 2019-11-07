'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (content) {
  var _this = this;

  if (this.version && this.version >= 2) {
    try {
      this.cacheable && this.cacheable();
      this.callback(null, 'module.exports = ' + generateCode(content, function (msg) {
        return _this.emitError(message);
      }));
    } catch (err) {
      this.emitError(err.message);
      this.callback(err);
    }
  } else {
    var _message = 'support webpack 2 later';
    this.emitError(_message);
    this.callback(new Error(_message, function (msg) {
      return _this.emitError(_message);
    }));
  }
};

function generateCode(content) {
  var code = '';

  var value = typeof content === 'string' ? JSON.parse(content) : content;
  value = JSON.stringify(value).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029').replace(/\\/g, '\\\\');
  var langs = Object.keys(value);
  var def = value[langs[0]];
  var defKeys = Object.keys(def);
  for (var i = 0; i < defKeys.length; i++) {
    for (var l = 1; l < langs.length; l++) {
      if (!value[langs[l]][defKeys[i]]) warn(defKeys[i] + ' is not defined for language ' + langs[l]);
    }
  }

  code += 'function (Component) {\n  Component.options.__i18n = Component.options.__i18n || []\n  Component.options.__i18n.push(\'' + value.replace(/\u0027/g, '\\u0027') + '\')\n  delete Component.options._Ctor\n}\n';
  return code;
}