import React from 'react'
import { SLink } from './common/StyledComponents'
import { connect } from 'react-redux'
import agent from '../agent'
import Add from 'material-ui-icons/Add'
import Grid from 'material-ui/Grid'
import styled from 'styled-components'

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
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
    },
    addIcon: {
      height: 25,
      width: 25,
      padding: 10,
    }

  }

  return (
    <SLink to="/new">
        <div style={styles.root} className={props.className}>
          <Add style={styles.addIcon}/>
        </div>
    </SLink>

  )
}

const SAddAgenda = styled(AddAgenda)`
  transition: background-color 1s;
  &:hover {
          background-color: white;
      }
`

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
          <SAddAgenda/>
          <ItemList items={this.props.agendas ? this.props.agendas : []}/>
        </Grid>
      </Grid>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList)