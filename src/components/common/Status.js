import React from 'react'
import Typography from 'material-ui/Typography';

function Status(props) {
  const {
    status = 'todo'
  } = props

  const statusBar={
    todo:{
      color:'gray',
      text:'Not start'
    },
    done: {
      color: 'gray',
      text: 'Finished'
    },
    inProcess: {
      color: 'green',
      text: 'In process'
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
      fontSize: '0.1rem'
    }
  }

  return (
    <Typography variant="caption" style={style.root}>
      {statusBar[status].text}
    </Typography>
  )
}

export default Status