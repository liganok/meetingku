import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import PlayItem from './common/PlayItem'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Chip from 'material-ui/Chip';

import {
  AP_ACTION_GET_DETAIL,
  AP_ACTION_UPDATE_TIMER,
} from '../constants/actionTypes'

function convertTime (time,short) {
  let h = parseInt(time / 3600)
  let m1 = parseInt((time - h * 3600) / 600)
  let m2 = parseInt((time - h * 3600 - m1 * 600) / 60)
  let s1 = parseInt(time % 60 / 10)
  let s2 = parseInt(time % 60 % 10)
  if(short){return `${m1}${m2}:${s1}${s2}`}
  return `${h}:${m1}${m2}:${s1}${s2}`
}

function HeaderItem (props) {
  const {
    completed,
    name,
    duration,
    timer,
  } = props

  return (
    <PlayItem completed={completed}>
      <Grid container align="center" justify="center" style={{padding: 10}}>
        <Grid item xs={8}>
          <Typography color="inherit" type="display1">{name}</Typography>
        </Grid>
        <Grid item xs={4} container align="flex-end" direction="column">
          <Typography type="display1">{new Date().toLocaleTimeString()}</Typography>
          <Typography color="secondary" type="subheading">{timer} / {duration}</Typography>
        </Grid>
      </Grid>
    </PlayItem>
  )
}

function BodyItem (props) {
  const {
    completed,
    name,
    duration,
    timer
  } = props

  const styles = {
    root: {
      marginTop: 15,
      padding: 10
    }
  }

  return (
    <PlayItem completed={completed}>
      <Grid container align="center" justify="center" style={styles.root}>
        <Grid item xs={8}>
          <Typography color="secondary" type="title">{name}</Typography>
        </Grid>
        <Grid item xs={4} container align="flex-end" direction="column">
          <Chip label={duration}/>
        </Grid>
      </Grid>
    </PlayItem>
  )
}

function renderComponent (agenda, width, timer) {
  let componentArr = []
  let isHasSubItem = agenda.subItems.length
  let endPlayTime = agenda.duration * 60 + agenda.startedPlayAt

  let completed = timer < agenda.startedPlayAt ? 0
    : (timer >= endPlayTime ? 100 : (timer - agenda.startedPlayAt+1) / 60 / agenda.duration * 100)
  const item = (
    <Grid container align="center" justify="center" key={agenda.id} spacing={0}>
      <Grid item xs={12}>
        <BodyItem
          name={agenda.name}
          completed={parseInt(completed)}
          duration={convertTime(agenda.duration*60,true)}
        />
      </Grid>
    </Grid>
  )

  if (!isHasSubItem) {
    componentArr.push(item)
    return componentArr
  } else {

    componentArr.push(item)
    agenda.subItems.forEach(item => {
      componentArr.push(
        <div style={{paddingLeft: '30px'}} key={`subItem${item.id}`}>
          {renderComponent(item, width, timer)}
        </div>
      )
    })

    return componentArr
  }
}

const mapStateToProps = state => ({...state.agendaPlay})
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({type: AP_ACTION_GET_DETAIL, payload}),
  onUpdateTimer: (payload) => dispatch({type: AP_ACTION_UPDATE_TIMER, payload}),
})

class AgendaPlay extends React.Component {

  constructor () {
    super()
    this.clock
  }

  componentWillMount () {
    if (this.props.match.params.id) {
      this.props.onLoad(agent.Agenda.get(this.props.match.params.id))
    }

    if (this.props.currentAgenda) {
      let startTime = new Date().getTime()
      this.clock = setInterval(() => {
        let timer = parseInt((new Date().getTime() - startTime) / 1000)
        if (timer > this.props.currentAgenda.duration * 60) {
          clearInterval(this.clock)
        }
        this.props.onUpdateTimer(timer)
      }, 1000)
    }

  }

  componentWillUnmount () {
    if (this.clock) {
      clearInterval(this.clock)
    }
  }

  render () {

    const currentAgenda = this.props.currentAgenda

    if (!currentAgenda) {
      return null
    }

    let list = renderComponent(currentAgenda, 700, this.props.timer)
    list.shift()

    let completed = (this.props.timer) / 60 / currentAgenda.duration * 100
    return (
      <Grid container align="center" justify="center" style={{marginTop: 10}}>
        <Grid item xs={11}  style={{maxWidth: 800}}>
          <HeaderItem
            name={currentAgenda.name}
            completed={parseInt(completed)}
            duration={convertTime(this.props.currentAgenda.duration * 60)}
            timer={convertTime(this.props.timer)}/>
          <div style={{marginTop: 5}}>
            {list}
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaPlay)