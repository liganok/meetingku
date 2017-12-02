
function generateGoogleUrl() {
  let CLIENT_ID = '741761109516-i26a0o3l2hjbtp80q4rh4385deq62b33.apps.googleusercontent.com'
  let REDIRECT_URI = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/oauth/google' : 'https://www.meetingku.com/oauth/google'
  let SCOPE = 'https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email'
  let STATE = ''
  let RESPONSE_TYPE = 'token'
  let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth?'

  let paraArr = [
    'client_id='+CLIENT_ID,
    'scope=' + SCOPE,
    'state=' + STATE,
    'include_granted_scopes='+true,
    'redirect_uri=' + REDIRECT_URI,
    'response_type=' + RESPONSE_TYPE
  ]

  return oauth2Endpoint+paraArr.join('&')
}

function getOAuthURL(type) {
  let url = ''
  if (type === 'google') {
    url = generateGoogleUrl()
  }
  return url
}

export {
  getOAuthURL
}