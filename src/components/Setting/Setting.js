import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as types from '../../constants/actionTypes'
import UserInfo from './UserInfo'

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({type: types.LOGOUT}),
  onLoad:()=> dispatch({type:types.UPDATE_APP_NAME,payload:'Setting'})
})

class Setting extends React.Component{
  componentWillMount() {
    this.props.onLoad()
  }
  render(){
    const { currentUser, onClickLogout } = this.props
    return (
      <div>
        {currentUser && <UserInfo
          username={currentUser.username}
          email={currentUser.email}
          onClickLogout={onClickLogout} />}
      </div>
    )
  }
}

Setting.propTypes = {
  currentUser: PropTypes.object,
  onClickLogout: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)