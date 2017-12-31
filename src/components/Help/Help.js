import React from 'react'
import { connect } from 'react-redux'
import * as types from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch({ type: types.UPDATE_APP_NAME, payload: 'Help' })
})

class Help extends React.Component {
  componentWillMount() {
    this.props.onLoad()
  }
  render() {
    const { currentUser, onClickLogout } = this.props
    return (
      <a href='https://github.com/liganok/meetingku'>github</a>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)