import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import agent from '../agent'
import Progress from './common/Progress'
import { Div } from './StyledComponent'
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


function renderComponent (agenda, width, timer) {
  let componentArr = []
  let isHasSubItem = agenda.subItems.length
  let endPlayTime = agenda.duration * 60 + agenda.startedPlayAt

  let completed = timer < agenda.startedPlayAt ? 0
    : (timer > endPlayTime ? 100 : (timer - agenda.startedPlayAt + 1) / 60 / agenda.duration * 100)
  const item = (
    <Grid container align="center" justify="center">
      <Grid item xs={12} sm={10} md={8}>
        <PlayItem height={80} completed={parseInt(completed)} key={agenda.id}>
          <div display="flex" height={80}
                   backgroundColor="white" justifyContent="space-between" alignItems="center">
            <h4>{agenda.name}</h4>
            <span>{agenda.duration}-{parseInt(completed)}</span>
          </div>
        </PlayItem>
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
        <div style={{paddingLeft: '15px'}} key={`subItem${item.id}`}>
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
      }, 2000)
      this.props.onUpdateClock(clock)

    }
  }

  render () {

    const currentAgenda = this.props.currentAgenda
    const styles = {
      header: {
        height: '140px',
      },

      bodyItem: {
        height: '80px',
      }
    }
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
            <PlayItem height={140} completed={parseInt(completed)}>
              <Grid container align="center" justify="center" style={styles.header}>
                <Grid item xs={9}>
                  <Typography type="headline">{currentAgenda.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    type="display1">{`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}</Typography>
                  <Typography type="subheading">{timer}/{duration}-{parseInt(completed)}</Typography>
                </Grid>
              </Grid>
            </PlayItem>
          </Grid>
        </Grid>
        {list}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaPlay)