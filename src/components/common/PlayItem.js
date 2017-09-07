import React from 'react'
import Paper from 'material-ui/Paper'
import Progress from './Progress'
import styled from 'styled-components'


function PlayItem (props) {
  const {
    completed,
    height,
    elevation,
    ...others
  } = props


  const styles = {
      root:{
        height: `${height || 60}px`
    }
  }

  return (
    <div>
      <div style={{position: 'relative',marginTop:'10px'}}>
        <Progress className={styles.root} completed={completed}/>
        <Paper style ={styles.root} elevation={elevation}  {...others}/>
      </div>
    </div>)
}

PlayItem.defaultProps = {
  completed: 0,
  elevation: 3,
}

export default PlayItem