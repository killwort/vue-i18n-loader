export default function (content) {
  if (this.version && this.version >= 2) {
    try {
      this.cacheable && this.cacheable()
      this.callback(null, `module.exports = ${generateCode(content, msg=>this.emitError(message))}`)
    } catch (err) {
      this.emitError(err.message)
      this.callback(err)
    }
  } else {
    const message = 'support webpack 2 later'
    this.emitError(message)
    this.callback(new Error(message, msg=>this.emitError(message)))
  }
}

function generateCode (content) {
  let code = ''

  let value = typeof content === 'string'
    ? JSON.parse(content)
    : content
  value = JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/\\/g, '\\\\')
  let langs=Object.keys(value);
  let def=value[langs[0]];
  let defKeys=Object.keys(def);
  for(var i=0;i<defKeys.length;i++){
    for(var l=1;l<langs.length;l++){
      if(!value[langs[l]][defKeys[i]])
        warn(defKeys[i]+' is not defined for language '+langs[l]);
    }
  }

  code += `function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('${value.replace(/\u0027/g, '\\u0027')}')
  delete Component.options._Ctor
}\n`
  return code
}
