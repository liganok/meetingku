import React from 'react'
import PropTypes from 'prop-types'
import { SLink } from '../common/StyledComponents'
import IconButton from 'material-ui/IconButton'
import AccountCircle from 'material-ui-icons/AccountCircle'

function LoggedInView(props) {
  const {
    isShow = false
  } = props
  return (
    <SLink to={`/setting`}>
      <IconButton
        color="contrast"
        style={{ display: isShow ? null : 'none' }}>
        <AccountCircle style={{ width: 30, height: 30 }} color="contrast" />
      </IconButton>
    </SLink>
  )
}

LoggedInView.propTypes = {
  id: PropTypes.string,
  isShow: PropTypes.bool
}

export default LoggedInView