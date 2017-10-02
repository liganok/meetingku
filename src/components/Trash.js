import React from 'react'
import { connect } from 'react-redux'
import agent from '../agent'
import Grid from 'material-ui/Grid'

import AgendaList from './AgendaList'


import {
  GET_LIST_TRASH,
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.agendaList,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({type: GET_LIST_TRASH, payload}),
})

class Trash extends React.Component {

  componentWillMount () {
    if(this.props.currentUser){
      this.props.onLoad(agent.Agenda.all(this.props.currentPage,1))
    }
  }

  render () {
    return (
      <Grid container align="center" justify="center">
        <Grid item xs={11} style={{maxWidth: 800,minWidth:600}}>
          {this.props.trash && <AgendaList items={this.props.trash} type="trash"/>}
        </Grid>
      </Grid>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Trash)