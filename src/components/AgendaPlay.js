import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import agent from '../agent'
import Paper from 'material-ui/Paper'

import {
  AP_ACTION_GET_DETAIL,
  AP_ACTION_UPDATE_TIMER,
  AGENDA_MENU_ITEM_TAP,
  AGENDA_GET_DETAIL,
} from '../constants/actionTypes'

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;
  paddingTop: 15px;
`;

const ContentWrapper = styled.div`
  position: relative;
  margin-top: ${props=>props.margin_top};

`;

const HeaderContentWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 700px;
  height: 100px;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const PaperItem = styled.div`
  display: flex;
  width: 700px;
  margin: 0 auto;
  paddingTop: 15px;
`;

function getStyles (props, context) {
  return {
    root: {
      display: 'flex',
      width: '700px',
      flexDirection: 'column',
      margin: '0 auto',
      paddingTop: '15px'
    },

    header: {
      display: 'flex',
      position: 'absolute',
      width: '700px',
      height: '100px',
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
    },

    header_time: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },

    header_bg: {
      position: 'absolute',
      height: '100px',
      width: `${props.timer > 1 ? '700px' : '0px'}`,
      flexDirection: 'row',
      backgroundColor: 'green',
      opacity: 0.2,
      transition: `${props.currentAgenda.duration * 60}s linear`,
    },

    body: {
      marginTop: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      opacity: 0.9,
    },

    body_item_root: {
      display: 'flex',
      flexDirection: 'column',
    },

    body_item: {
      marginTop: '10px',
      display: 'flex',
      height: '60px',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
    },

    body_item_bg: {
      marginTop: '10px',
      position: 'absolute',
      height: '60px',
      flexDirection: 'row',
      backgroundColor: 'green',
      opacity: 0.2,
    },

    body_item_text: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    body_item_status: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

  }
}

function renderComponent (agenda, styles, width, timer) {
  let componentArr = []
  let isHasSubItem = agenda.subItems.length
  let width2 = timer > agenda.startedPlayAt ? `${width}px` : '0px'
  const item = (
    <ContentWrapper>
      <Paper style={styles.body_item}>
        <h4>{agenda.name}</h4>
        <span>{agenda.duration}</span>
      </Paper>
      <div style={{...styles.body_item_bg, width: width2, transition: `${agenda.duration * 60}s linear`}}/>
    </ContentWrapper>
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
          {renderComponent(item, styles, width, timer)}
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

  componentWillMount () {
    if (this.props.match.params.id) {
      this.props.onLoad(agent.Agenda.get(this.props.match.params.id))
      let startTime = new Date().getTime()
      if (clock) {
        clearInterval(clock)
      }
      var clock = setInterval(() => {
        let timer = parseInt((new Date().getTime() - startTime) / 1000)
        if (timer > this.props.currentAgenda.duration * 60) {
          clearInterval(clock)
        }
        this.props.onUpdateTimer(timer)
      }, 1000)
    }
  }

  render () {

    const currentAgenda = this.props.currentAgenda
    if (!currentAgenda) {
      return null
    }

    const styles = getStyles(this.props, this.context)
    let list = renderComponent(currentAgenda, styles, 700, this.props.timer)
    list.shift()

    let timer = `${parseInt(this.props.timer / 3600)}:${parseInt(this.props.timer / 60)}:${parseInt(this.props.timer % 60)}`
    let duration = `${parseInt(this.props.currentAgenda.duration / 60)}:${parseInt(this.props.currentAgenda.duration % 60)}:00`

    return (
      <RootWrapper>
        <ContentWrapper margintop="10px">
          <Paper style={styles.header} zDepth={0}>
            <div>
              <h2>{currentAgenda.name}</h2>
            </div>
            <div style={styles.header_time}>
              <h2>{`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}</h2>
              <h5>{timer}/{duration}</h5>
            </div>
          </Paper>
          <div style={styles.header_bg}/>
        </ContentWrapper>

        <ContentWrapper margin_top="100px">
          {list}
        </ContentWrapper>
      </RootWrapper>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AgendaPlay)