import React from 'react'
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import PlayItem from './PlayItem'
import Paper from 'material-ui/Paper'
import { withTheme } from 'material-ui/styles';

function BodyItem(props) {
  const {
    name,
    duration = 1,
    spend = 0,
    spacing = 10,
    theme
  } = props

  const styles = {
    root: {
      display: 'flex',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop: spacing,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15
    }
  }
  let completed = parseInt(spend / 60 / duration * 100)
  let spendText = `${parseInt(spend / 60)}:${spend % 60 < 10 ? ('0' + spend % 60) : spend % 60}`
  return (
    <Paper>
      <PlayItem completed={completed} backgroundColor={theme.palette.primary.main}>
        <div  style={styles.root}>
          <Typography style={{ fontSize: '1.1rem' }} noWrap>{name}</Typography>
          <Typography style={{ backgroundColor: theme.palette.grey[200], padding: 5 }} color="textSecondary"  noWrap>{spendText} / {duration}:00</Typography>
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