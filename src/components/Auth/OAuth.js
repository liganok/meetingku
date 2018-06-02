import React from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'

import * as types from '../../constants/actionTypes'
import { getOAuthURL } from '../../utils/oAuth'
import Save from '@material-ui/icons/Save'
import GoogleIcon from '../../svg/GoogleIcon'

const mapStateToProps = state => ({ ...state.common })

const mapDispatchToProps = dispatch => ({
  onOAuthRegister: (oauth_name, oauth_access_token, oauth_expires) => {
    const payload = agent.Auth.oAuthRegister(oauth_name, oauth_access_token, oauth_expires)
    dispatch({ type: types.REGISTER, payload }
    )
  },
  onRedirect: (value = null) => dispatch({ type: types.REDIRECT, value: value })
})

class OAuth extends React.Component {
  componentWillMount() {
    let queryString = window.location.hash.substring(1)
    if (queryString) {
      let params = {};
      let regex = /([^&=]+)=([^&]*)/g, m;
      while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      let oauth_name = this.props.match.params.name
      let oauth_access_token = params['access_token']
      let oauth_expires = params['expires_in']
      this.props.onOAuthRegister(oauth_name, oauth_access_token, oauth_expires)
      this.props.history.push('/auth')
    }
  }

  render() {
    return (
      <div style={this.props.style}>
        <Button raised href={getOAuthURL('google')}
          style={{ width: '100%', textTransform: 'none', backgroundColor: 'white',  }}>
          <GoogleIcon style={{width:18,height:18,paddingRight:5}}/>
          Google
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth)
