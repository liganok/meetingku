import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { LOGOUT } from '../../constants/actionTypes'
import UserInfo from './UserInfo'

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({
    type: LOGOUT
  })
})

function Setting(props) {
  const { currentUser, onClickLogout } = props
  return (
    <div>
      {currentUser && <UserInfo
        username={currentUser.username}
        email={currentUser.email}
        onClickLogout={onClickLogout} />}
    </div>
  )
}

Setting.propTypes = {
  currentUser: PropTypes.object,
  onClickLogout: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)