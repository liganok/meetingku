import React from 'react'
import PropTypes from 'prop-types';
import { SLink } from '../common/StyledComponents'
import { connect } from 'react-redux'
import agent from '../../agent'
import Add from 'material-ui-icons/Add'
import styled from 'styled-components'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'

import AgendaList from '../common/AgendaList'


import * as types from '../../constants/actionTypes'
import { SECOND_TEXT_COLOR } from '../../constants/globalSetting'

const mapStateToProps = state => ({
  ...state.agendaList,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => {
    dispatch({ type: types.GET_LIST_AGENDA, payload }),
    dispatch({ type: types.UPDATE_APP_NAME, payload: 'Agenda' })
  },
  onCreate: () => dispatch({ type: types.AGENDA_CREATE }),
})

function AddAgenda(props) {
  const styles = {
    root: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      display: 'flex',
      alignItems: 'center'
    },
    addIcon: {
      height: 25,
      width: 25,
      padding: 10,
      color: '#838c91',
    }

  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <SLink to="/agenda/new" style={{ flex: 1 }}>
        <div style={styles.root} className={props.className} onClick={props.onCreate}>
          <Add style={styles.addIcon} />
          <Typography type="subheading" style={{ color: SECOND_TEXT_COLOR }}>Add new agenda</Typography>
        </div>
      </SLink>
      <SLink to="/template" style={{ flex: 1 }}>
        <div style={styles.root} className={props.className} onClick={props.onCreate}>
          <Add style={styles.addIcon} />
          <Typography type="subheading" style={{ color: SECOND_TEXT_COLOR }}>Copy from template</Typography>
        </div>
      </SLink>
    </div>
  )
}

const SAddAgenda = styled(AddAgenda) `
  transition: background-color 1.5s;
  &:hover {
          background-color: white;
      }
`
class Agenda extends React.Component {

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.onLoad(agent.Agenda.getAgendas(this.props.currentPage))
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.props.currentUser) {
      this.props.onLoad(agent.Agenda.all())
    }
  }
  render() {
    return (
      <div>
        <SAddAgenda onCreate={this.props.onCreate} />
        {this.props.agendas && this.props.agendas.length > 0 ?
          <AgendaList items={this.props.agendas} type="agenda" /> :
          <div>
            <Typography type="subheading" style={{ color: SECOND_TEXT_COLOR }}>No agenda found</Typography>
            <Divider />
          </div>}
      </div>
    )
  }
}

Agenda.propTypes = {
  onLoad: PropTypes.func,
  currentPage: PropTypes.number,
  agendas: PropTypes.array,
  currentUser: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda)