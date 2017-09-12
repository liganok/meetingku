import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import PlayItem from './common/PlayItem'

import Card, { CardContent, CardMedia } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'

import {
  AP_ACTION_GET_DETAIL,
  AP_ACTION_UPDATE_TIMER,
  AP_ACTION_UPDATE_CLOCK,
  AGENDA_GET_DETAIL,
} from '../constants/actionTypes'


function HeaderItem (props) {
  const {
    completed,
    name,
    duration,
    timer,
  } = props

  const styles = {
    root:{
      height: '120px',
    }
  }

  return (
    <PlayItem style={styles.root} completed={completed}>
      <div>
        <Grid container align="center" justify="center">
          <Grid item xs={9}>
            <Typography type="headline">{name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              type="display1">{`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}</Typography>
            <Typography type="subheading">{timer}/{duration}-{parseInt(completed)}</Typography>
          </Grid>
        </Grid>
      </div>
    </PlayItem>
  )
}

function BodyItem (props) {
  const {
    completed,
    name,
    duration
  } = props

  const styles = {
    root:{
      height: '70px',
    }
  }

  return (
    <PlayItem style={styles.root} completed={completed}>
      <div>
        <span>{name}</span>
        <span>{duration}-{parseInt(completed)}</span>
      </div>
    </PlayItem>
  )
}

function renderComponent (agenda, width, timer) {
  let componentArr = []
  let isHasSubItem = agenda.subItems.length
  let endPlayTime = agenda.duration * 60 + agenda.startedPlayAt

  let completed = timer < agenda.startedPlayAt ? 0
    : (timer > endPlayTime ? 100 : (timer - agenda.startedPlayAt + 1) / 60 / agenda.duration * 100)
  const item = (
    <Grid container align="center" justify="center" key={agenda.id} spacing={0}>
      <Grid item xs={12} sm={10} md={8}>
        <BodyItem name={agenda.name} completed={parseInt(completed)} duration={agenda.duration}/>
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
  onUpdateClock: (payload) => dispatch({type: AP_ACTION_UPDATE_CLOCK, payload}),
})

class AgendaPlay extends React.Component {

  componentWillMount () {
    if (this.props.match.params.id) {
      this.props.onLoad(agent.Agenda.get(this.props.match.params.id))
      let startTime = new Date().getTime()
      if (clock) {
        clearInterval(clock)
      }
      if (this.props.clock) {
        clearInterval(this.props.clock)
      }
      var clock = setInterval(() => {
        let timer = parseInt((new Date().getTime() - startTime) / 1000)
        if (timer > this.props.currentAgenda.duration * 60) {
          clearInterval(clock)
        }
        this.props.onUpdateTimer(timer)
      }, 1000)
      this.props.onUpdateClock(clock)

    }
  }

  render () {

    const currentAgenda = this.props.currentAgenda

    if (!currentAgenda) {
      return null
    }

    let list = renderComponent(currentAgenda, 700, this.props.timer)
    list.shift()

    let timer = `${parseInt(this.props.timer / 3600)}:${parseInt(this.props.timer / 60)}:${parseInt(this.props.timer % 60)}`
    let duration = `${parseInt(this.props.currentAgenda.duration / 60)}:${parseInt(this.props.currentAgenda.duration % 60)}:00`
    let completed = (this.props.timer) / 60 / currentAgenda.duration * 100
    return (
      <div>
        <Grid container align="center" justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <HeaderItem name={currentAgenda.name} completed={parseInt(completed)} duration={duration} timer={timer}/>
          </Grid>
        </Grid>
        {list}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaPlay)