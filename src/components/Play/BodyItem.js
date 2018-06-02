import React from 'react'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PlayItem from './PlayItem'
import Paper from '@material-ui/core/Paper'
import { withTheme } from '@material-ui/core/styles';

function BodyItem(props) {
  const {
    name,
    duration = 1,
    spend = 0,
    spacing = 10,
    theme,
    isHasSubItem = false,
    setting = {
      color: [{ leftTime: 30, color: '#FF4500' },
      { leftTime: 60, color: '#ff9900' },
      { leftTime: 180, color: '#60be4f' }]
    },
  } = props

  const styles = {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15
    }
  }
  let completed = parseInt(spend / 60 / duration * 100)
  let spendText = `${parseInt(spend / 60)}:${spend % 60 < 10 ? ('0' + spend % 60) : spend % 60}`
  let timeText = `${spendText} / ${duration}:00`
  let reminderColor = theme.palette.grey[200];

  let leftTime = duration * 60 - spend;
  if (leftTime > 0 && leftTime < 180 && spend > 0 && !isHasSubItem) {
    timeText = `- ${parseInt(leftTime / 60)}:${leftTime % 60 < 10 ? ('0' + leftTime % 60) : leftTime % 60}`
  }
  for (let i = 0; i < setting.color.length; i++) {
    if (isHasSubItem) { break }
    if (leftTime === 0) {
      reminderColor = theme.palette.grey[200];
      break;
    }
    let test = setting.color[i].leftTime
    if (leftTime <= test) {
      if (leftTime % 2 === 0) {
        reminderColor = theme.palette.grey[200];
      } else {
        reminderColor = setting.color[i].color;
      }
      break;
    }
  }
  return (
    <Paper>
      <PlayItem completed={completed} backgroundColor={theme.palette.primary.main}>
        <div style={styles.root} onClick={() => void (0)}>
          <Typography style={{ fontSize: '1.1rem' }} noWrap>{name}</Typography>
          <Typography style={{ backgroundColor: reminderColor, padding: 5 }} color="textSecondary" noWrap>{timeText}</Typography>
        </div>
      </PlayItem>
    </Paper>
  )
}

BodyItem.propTypes = {
  name: PropTypes.string,
  completed: PropTypes.number,
  spacing: PropTypes.number,
  duration: PropTypes.number,
  timer: PropTypes.number,
  spend: PropTypes.number,
  theme: PropTypes.object
}

export default withTheme()(BodyItem)