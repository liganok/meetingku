import React from 'react'

function Progress (props) {
  const {
    completed = 0,
    animation = 2000,
    backgroundColor = 'green',
    opacity = 0.2,
    height=0,
  } = props
  const styles = {
    root: {
      position: 'absolute',
      backgroundColor: backgroundColor,
      height:height,
      width: completed + '%',
      transition: `width ${animation}ms linear`,
      opacity: opacity,
      zIndex: 1,
    }
  }
  return (
    <div style={styles.root}/>
  )
}

class PlayItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {height:0};
  }

  componentDidMount(){
    this.setState({
      height:this.refs.ref.offsetHeight
    })
  }

  render(){
    const styles = {
      root: {
        position: 'relative',
      },
    }

    return (
      <div ref="ref" style={Object.assign(styles.root, this.props.style)}>
        <Progress backgroundColor={this.props.backgroundColor} height={this.state.height} completed={this.props.completed}>{this.props.children}</Progress>
        <div style={{background:'white'}} elevation={this.props.elevation}>{this.props.children}</div>
      </div>
    )
  }
}

export default PlayItem