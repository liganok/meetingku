import React from 'react'
import Paper from 'material-ui/Paper'
import Progress from './Progress'

function PlayItem (props) {
  const {
    completed,
    style,
    styleProcess,
    elevation,
    ...others
  } = props

  const styles = {
    root: {
      position: 'relative',
      marginTop: '10px'
    },
    item: {
      height: '60px'
    }
  }

  return (
    <div>
      <div style={styles.root}>
        <Progress style={Object.assign(styles.item, styleProcess)} completed={completed}/>
        <Paper style={Object.assign(styles.item, style)} elevation={elevation}  {...others}/>
      </div>
    </div>)
}

PlayItem.defaultProps = {
  completed: 0,
  elevation: 3,
}

export default PlayItem