import React from 'react'

function VDivider (props) {
  const {
    style,
    height=30
  }=props
  const styles={
    root:{
      paddingLeft:10,
      paddingRight:10,
    },
    divider:{
      width:1,
      height:height,
      backgroundColor:'#e2e2e2'
    }
  }
  return(
    <div style={Object.assign(styles.root,style)}>
      <div style={styles.divider}/>
    </div>
  )
}

export default VDivider