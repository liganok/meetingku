import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import agent from '../agent'
import Add from 'material-ui-icons/Add'
import Grid from 'material-ui/Grid'

import AgendaItem from './AgendaItem'

import {
  GET_AGENDALIST,
} from '../constants/actionTypes'

const mapStateToProps = state => ({...state.agendaList})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({type: GET_AGENDALIST, payload}),
})

function AddAgenda (props) {
  const styles = {
    root: {
      '&:hover': {
        backgroundColor: 'red',
      },
      marginTop:10,
      marginBottom:10
    },
    addIcon: {
      height: 25,
      width: 25,
      padding: 10,
    }

  }

  return (
    <Link to="/new">
      <Grid container >
        <Grid item xs={12} style={styles.root}>
          <Add style={styles.addIcon}/>
        </Grid>
      </Grid>
    </Link>

  )
}

function ItemList (props) {
  const {
    items = []
  } = props

  const list = items.map((item, index) => {
    return (
      <Grid item xs={12} key={index}>
        <AgendaItem
          id={item.id}
          name={item.name}
          startedAt={item.startedAt}
          updatedAt={item.updatedAt}
          duration={item.duration}
        />
      </Grid>
    )
  })

  return (
    <Grid container>
      {list}
    </Grid>
  )
}

class AgendaList extends React.Component {

  componentWillMount () {
    this.props.onLoad(agent.Agenda.all())
  }

  render () {
    return (
      <Grid container align="center" justify="center">
        <Grid item xs={9}>
          <AddAgenda/>
          <ItemList items={this.props.agendas ? this.props.agendas : []}/>
        </Grid>
      </Grid>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList)