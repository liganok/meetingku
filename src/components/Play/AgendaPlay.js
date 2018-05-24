import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import agent from '../../agent'
import HeaderItem from './HeaderItem'
import BodyItems from './BodyItems'

import * as types from '../../constants/actionTypes'
import Typography from 'material-ui/Typography'

const mapStateToProps = state => ({ ...state.agendaPlay, inProgress: state.common.inProgress })
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: types.AP_ACTION_GET_DETAIL, payload }),
  onUpdateTimer: (payload) => dispatch({ type: types.AP_ACTION_UPDATE_TIMER, payload }),
  onUpdateStatus: (payload) => dispatch({ type: types.AP_ACTION_UPDATE_STATUS, payload }),
  onAddTimer: (payload) => dispatch({ type: types.AP_ACTION_ADD_TIMER, payload }),
  onActionMouseOver: value => dispatch({ type: types.AP_ACTION_MOUSE_OVER, payload: value }),
  onActionMouseOut: value => dispatch({ type: types.AP_ACTION_MOUSE_OUT, payload: value }),
  onActionLocalStart: value => dispatch({ type: types.AP_ACTION_LOCAL_START }),
})

class AgendaPlay extends React.Component {
  constructor() {
    super()
    this.clock = null
    this.type = 'agenda'
  }

  componentWillMount() {
    const { match, onLoad } = this.props
    if (match.params.id) {
      if (match.path.indexOf('template') > 0) {
        onLoad(agent.Agenda.getTemplateDetail(match.params.id))
        this.agenda = 'template'
      } else {
        onLoad(agent.Agenda.getAgendaDetail(match.params.id))
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentAgenda, onUpdateTimer } = nextProps
    if (currentAgenda && !this.clock) {
      this.clock = setInterval(() => {
        onUpdateTimer()
      }, 1000)
    }
  }

  componentWillUnmount() {
    if (this.clock) {
      clearInterval(this.clock)
    }
  }

  render() {
    const { currentAgenda, timer, status, mouseOverId = '', onActionMouseOver, onActionMouseOut, onActionLocalStart, onAddTimer, onUpdateStatus, inProgress } = this.props
    if (!currentAgenda) {
      return (
        <div style={{ display: inProgress ? '' : 'none', textAlign: 'center', padding: '10px' }}>
          <Typography>loading ...</Typography>
        </div>
      )
    }
    let isMouseOver = mouseOverId === currentAgenda.id
    if (status == 'done') {
      clearInterval(this.clock)
    }
    return (
      <div>
        <HeaderItem
          onMouseOver={() => onActionMouseOver(currentAgenda.id)}
          onMouseOut={() => onActionMouseOut(currentAgenda.id)}
          onClick={() => void (0)}
          onAddTimer={(value) => onAddTimer(value)}
          onUpdateStatus={(value) => onUpdateStatus(value)}
          onActionLocalStart={() => { onActionLocalStart(); clearInterval(this.clock); this.clock = null }}
          isMouseOver={isMouseOver}
          name={currentAgenda.name}
          location={currentAgenda.location}
          startedAt={currentAgenda.startedAt}
          duration={currentAgenda.duration}
          type={this.agenda}
          id={currentAgenda.id}
          status={status}
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