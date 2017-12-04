import React from 'react'
import PropTypes from 'prop-types'
import { SLink } from '../common/StyledComponents'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

function LoggedOutView(props) {
  const {
    isShow = false
  } = props
  return (
    <div style={{ display: isShow ? null : 'none' }}>
      <SLink to="/auth">
        <Button color="contrast">
          <Typography color='inherit'>Log in</Typography>
        </Button></SLink>
    </div>
  )
}

LoggedOutView.propTypes = {
  isShow: PropTypes.bool
}

export default LoggedOutView