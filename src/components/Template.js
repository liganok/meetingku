import React from 'react'
import { connect } from 'react-redux'
import agent from '../agent'
import Grid from 'material-ui/Grid'

import AgendaList from './AgendaList'


import {
  GET_LIST_TEMPLATE,
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.agendaList,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({type: GET_LIST_TEMPLATE, payload}),
})

class Template extends React.Component {

  componentWillMount () {
      this.props.onLoad(agent.Agenda.getTemplate(this.props.currentPage,1))
  }
  componentWillReceiveProps(nextProps){

  }
  render () {
    return (
      <Grid container align="center" justify="center">
        <Grid item xs={11} style={{maxWidth: 800,minWidth:600}}>
          {this.props.templates && <AgendaList items={this.props.templates}/>}
        </Grid>
      </Grid>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Template)