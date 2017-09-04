import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import agent from '../agent'
import Progress from './Progress'
import { Div } from './StyledComponent'

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
const HeaderWapper = Div.extend`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 100px;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  align-items: center;
`

function renderComponent (agenda, width, timer) {
  let componentArr = []
  let isHasSubItem = agenda.subItems.length
  let endPlayTime = agenda.duration * 60 + agenda.startedPlayAt

  let completed = timer < agenda.startedPlayAt ? 0
    : (timer > endPlayTime ? 100 : (timer - agenda.startedPlayAt+1) / 60 / agenda.duration * 100)
  const item = (
    <Wrapper position="relative" marginTop={10} key={agenda.id}>
      <Progress height="60px" completed={completed}/>
      <Wrapper display="flex" height={60}
               backgroundColor="white" justifyContent="space-between" alignItems="center">
        <h4>{agenda.name}</h4>
        <span>{agenda.duration}-{parseInt(completed)}</span>
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
      if (this.props.clock) {
        clearInterval(this.props.clock)
      }
      var clock = setInterval(() => {
        let timer = parseInt((new Date().getTime() - startTime) / 1000)
        if (timer > this.props.currentAgenda.duration * 60) {
          clearInterval(clock)
        }
        this.props.onUpdateTimer(timer)
      }, 100)
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
    let completed = (this.props.timer-1) / 60 / currentAgenda.duration * 100;
    return (
      <Div display="flex" flexDirection="column" width="700px" margin="0 auto">
        <Div position="relative" >
          <Progress animation={1000} height="100px" marginTop="10px"
                    completed={parseInt(completed)}/>
        </Div>
        <Div position="relative" marginTop="10px">
          <HeaderWapper>
            <h2>{currentAgenda.name}</h2>
            <Div display="flex" flexDirection="column" justifyContent="space-around" alignItems="flex-end">
              <h2>{`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}</h2>
              <h5>{timer}/{duration}-{parseInt(completed)}</h5>
            </Div>
          </HeaderWapper>

        </Div>
        {list}

      </Div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaPlay)