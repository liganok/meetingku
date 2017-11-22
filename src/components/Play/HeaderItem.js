import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Circle from './CircleProgress'
import { withTheme } from 'material-ui/styles'
import Flag from 'material-ui-icons/Flag'
import LocationOn from 'material-ui-icons/LocationOn'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'


import * as types from '../../constants/actionTypes'

function HeaderItem(props) {
  const {
    name = '',
    host = 'Bob',
    location = 'New york tower building',
    startedAt,
    duration = 300,
    spend = 180,
    theme,
    isMouseOver,
    ...others
  } = props

  const circleContainerStyle = {
    width: '100%',
    height: '100%',
    maxWidth: '180px',
    maxHeight: '180px',
    padding: '8px'
  }
  const styles = {
    iconButton: { width: 18, height: 18, paddingRight: 8 }
  }
  console.log('theme', theme)

  let percent = parseInt(spend / 60 / duration * 100)
  return (
    <Paper {...others} style={{ display: 'flex', flexDirection: 'row', flex: 1,marginTop:10 }}>
      <Link to="/agenda" style={{ position: 'absolute', display: 'flex', justifyContent: 'center', visibility:!isMouseOver && 'hidden' }}>
        <KeyboardArrowLeft stype={{margin:0}} /> Back
      </Link>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
        <div style={{ flex: 0.5 }} />

        <div style={{ flex: 4, display: 'flex', alignItems: 'center' }}>
          <Typography color="inherit" type="display1">{name}</Typography>
        </div>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Typography color="secondary" type="body2">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn style={styles.iconButton} />
              {location}
            </div>
          </Typography>
          <div>
            <Typography color="secondary" type="body2">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Flag style={styles.iconButton} />
                {new Date(startedAt).toLocaleString()}
              </div>
            </Typography>
          </div>
        </div>
        <div style={{ flex: 0.5 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <div style={circleContainerStyle}>
          <Circle
            percent={percent}
            strokeWidth="6"
            strokeLinecap="square"
            strokeColor={theme.palette.primary[700]}
            spend={spend}
            duration={duration}
          />
        </div>
      </div>
    </Paper>
  )
}

HeaderItem.propTypes = {
  percent: PropTypes.number,
  name: PropTypes.string,
  host: PropTypes.string,
  location: PropTypes.string,
  startedAt: PropTypes.string,
  duration: PropTypes.number,
  spend: PropTypes.number,
  theme: PropTypes.object
}

export default withTheme()(HeaderItem)