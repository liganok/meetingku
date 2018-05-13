import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Circle from './CircleProgress'
import { withTheme } from 'material-ui/styles'
import Flag from 'material-ui-icons/Flag'
import LocationOn from 'material-ui-icons/LocationOn'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import Tooltip from 'material-ui/Tooltip'
import Status from '../common/Status'
import IconButton from 'material-ui/IconButton'

import NavigateBefore from 'material-ui-icons/NavigateBefore'
import Edit from 'material-ui-icons/Edit'
import OndemandVideo from 'material-ui-icons/OndemandVideo'


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
    type = 'agenda',
    id,
    status,
    onActionLocalStart,
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
    iconButton: { width: '1rem', height: '1rem', paddingRight: 8 }
  }
  console.log('theme', theme)

  let percent = parseInt(spend / 60 / duration * 100)
  return (
    <Paper {...others} style={{ display: 'flex', flexDirection: 'row',alignItems:'center', flex: 1, marginTop: 10 }}>
      <div style={{ visibility: !isMouseOver && 'hidden', position:'fixed',alignSelf:'flex-start'}}>
        <Link to={`/${type}`}>
          <Tooltip title="Back">
            <IconButton>
              <NavigateBefore />
            </IconButton>
          </Tooltip>
        </Link>
        {type == 'agenda' &&
          <Link to={`/${type}/detail/${id}`}>
            <Tooltip title="Edit">
              <IconButton>
                <Edit />
              </IconButton>
            </Tooltip>
          </Link>}
        <Tooltip title="Start now locally">
          <IconButton onClick={onActionLocalStart}>
            <OndemandVideo />
          </IconButton>
        </Tooltip>
      </div>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column',justifyContent:'space-between', marginLeft: '10px' }}>

        <div style={{ flex:4, display: 'flex', flexDirection: 'column' }}>
          <Typography color="inherit" style={{fontSize:'1.7rem'}}>{name}</Typography>
          <div style={{ paddingTop: 3 }}>
            <Status status = {status}/>
          </div>
        </div>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingTop: '1rem' }}>
          <Typography color="secondary" type="caption">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Start time">
                <Flag style={styles.iconButton} />
              </Tooltip>
              {new Date(startedAt).toLocaleString()}
            </div>
          </Typography>
          <Typography color="secondary" type="caption">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Location">
                <LocationOn style={styles.iconButton} />
              </Tooltip>
              {location}
            </div>
          </Typography>
        </div>
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