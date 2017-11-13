import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import agent from '../../agent'
import HeaderItem from './HeaderItem'
import BodyItems from './BodyItems'

import {
  AP_ACTION_GET_DETAIL,
  AP_ACTION_UPDATE_TIMER,
} from '../../constants/actionTypes'

const mapStateToProps = state => ({ ...state.agendaPlay })
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: AP_ACTION_GET_DETAIL, payload }),
  onUpdateTimer: (payload) => dispatch({ type: AP_ACTION_UPDATE_TIMER, payload }),
})

class AgendaPlay extends React.Component {
  constructor() {
    super()
    this.clock
  }

  componentWillMount() {
    const { match, onLoad } = this.props
    if (match.params.id) {
      onLoad(agent.Agenda.get(match.params.id))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentAgenda, onUpdateTimer } = nextProps
    if (currentAgenda) {
      let startTime = new Date(currentAgenda.startedAt).getTime()
      this.clock = setInterval(() => {
        let nowTime = new Date().getTime()
        let timer = 0
        if (nowTime >= startTime && nowTime <= (startTime + currentAgenda.duration * 60000 + 20000)) {
          timer = parseInt((nowTime - startTime) / 1000)
          console.log('*****timer****',timer)
          onUpdateTimer(timer)
        }
        if (timer > currentAgenda.duration * 60 + 10) {
          clearInterval(this.clock)
        }
      }, 1000)
    }
  }

  componentWillUnmount() {
    if (this.clock) {
      clearInterval(this.clock)
    }
  }

  render() {
    const { currentAgenda, timer } = this.props
    if (!currentAgenda) { return null }
    return (
      <div>
        <HeaderItem
          name={currentAgenda.name}
          startedAt={currentAgenda.startedAt}
          duration={currentAgenda.duration}
          spend={timer} />
        <BodyItems
          agenda={currentAgenda}
          timer={timer} />
      </div>
    )
  }
}

AgendaPlay.propTypes = {
  currentAgenda: PropTypes.object,
  timer: PropTypes.number,
  match: PropTypes.object,
  onLoad: PropTypes.func,
  onUpdateTimer: PropTypes.func,
  name: PropTypes.string,
  items: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaPlay)