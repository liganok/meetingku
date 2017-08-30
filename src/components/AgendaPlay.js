import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import agent from '../agent'
import Paper from 'material-ui/Paper'

import {
  AP_ACTION_GET_DETAIL,
  AP_ACTION_UPDATE_TIMER,
  AP_ACTION_UPDATE_CLOCK,
  AGENDA_GET_DETAIL,
} from '../constants/actionTypes'


const Wrapper = styled.div`
  display: ${props => props.display};
  position: ${props => props.position};
  margin-top: ${props => props.marginTop}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  background-color: ${props => props.backgroundColor};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
`

const BackgroundProgress = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: green;
  transition: ${props => props.duration * 60}s linear;
  opacity: 0.2;
  z-index:1;
`

function renderComponent (agenda, width, timer) {
  let componentArr = []
  let isHasSubItem = agenda.subItems.length
  let width2 = timer > agenda.startedPlayAt ? `${width}px` : '0px'
  const item = (
    <Wrapper position="relative"  marginTop={10}>
      <BackgroundProgress width={timer > agenda.startedPlayAt ? width : 0} height={60} duration={agenda.duration}/>
      <Wrapper display="flex"   height={60}
               backgroundColor="white" justifyContent="space-between" alignItems="center" >
        <h4>{agenda.name}</h4>
        <span>{agenda.duration}</span>
      </Wrapper>
    </Wrapper>
  )

  if (!isHasSubItem) {
    componentArr.push(item)
    return componentArr
  } else {

    componentArr.push(item)
    width = width - 15
    agenda.subItems.forEach(item => {
      componentArr.push(
        <div style={{paddingLeft: '15px', width: `${width}px`}} key={`subItem${item.id}`}>
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
      if(this.props.clock){
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

    return (
      <Wrapper display="flex" flexDirection="column" width={700} margin="0 auto" >
        <Wrapper position="relative" marginTop={10}>
          <BackgroundProgress width={this.props.timer > 1 ? 700 : 0} height={100} duration={currentAgenda.duration}/>
          <Wrapper display="flex"  width={700} height={100} flexDirection="row"
                   backgroundColor="white" justifyContent="space-between" alignItems="center" padding={15}>
              <h2>{currentAgenda.name}</h2>
            <Wrapper display="flex" flexDirection="column" justifyContent="space-around" alignItems="flex-end">
              <h2>{`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}</h2>
              <h5>{timer}/{duration}</h5>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper>
          {list}
        </Wrapper>
      </Wrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaPlay)