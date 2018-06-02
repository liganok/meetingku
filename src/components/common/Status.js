import React from 'react'
import Typography from '@material-ui/core/Typography';

function Status(props) {
  const {
    status = 'todo'
  } = props

  const statusBar={
    todo:{
      color:'#b6bbbf',
      text:'Not start'
    },
    done: {
      color: '#60be4f',
      text: 'Finished'
    },
    inProcess: {
      color: '#ff9900',
      text: 'In process'
    },
    pause: {
      color: '#b6bbbf',
      text: 'Pause'
    }
  }

  const style = {
    root: {
      backgroundColor: statusBar[status].color,
      padding: 2,
      paddingLeft: 5,
      paddingRight: 5,
      display: 'inline',
      color: 'white',
      // fontSize: '0.01rem'
    }
  }

  return (
    <Typography style={style.root} variant='caption' >
      {statusBar[status].text}
    </Typography>
  )
}

export default Status