function isNeedLoginCheck(path) {
  let isNeedCheck = true
  let exception = ['/auth', '/template', '/help', '/oauth']
  for(let i=0;i<exception.length;i++){
    if (path.indexOf(exception[i]) === 0) {
      isNeedCheck = false
      break
    }
  }
  return isNeedCheck
}

export {
  isNeedLoginCheck
}