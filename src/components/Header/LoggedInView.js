import React from 'react'
import PropTypes from 'prop-types'
import { SLink } from '../common/StyledComponents'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar';

function LoggedInView(props) {
  const {
    isShow = false,
    user='',
  } = props
  return (
    <SLink to={`/setting`}>
      <IconButton
        style={{ display: isShow ? null : 'none' }}>
        {/* <AccountCircle style={{ width: 30, height: 30 }} color="contrast" /> */}
        <Avatar style={{ color: 'fff', backgroundColor:'#ff9900'}}>{user.username.substring(0,1)}</Avatar>
      </IconButton>
    </SLink>
  )
}

LoggedInView.propTypes = {
  id: PropTypes.string,
  isShow: PropTypes.bool
}

export default LoggedInView