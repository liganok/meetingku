import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import agent from '../../agent'
import AgendaList from '../common/AgendaList'

import {GET_LIST_TRASH} from '../../constants/actionTypes'

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
      this.props.onLoad(agent.Agenda.getTrash(this.props.currentPage))
    }
  }

  render () {
    return (
        <div >
          {this.props.trash && <AgendaList items={this.props.trash} type="trash"/>}
        </div>
    )
  }

}
Trash.propTypes = {
  currentUser: PropTypes.object,
  onLoad: PropTypes.func,
  currentPage: PropTypes.number,
  trash: PropTypes.array
}
export default connect(mapStateToProps, mapDispatchToProps)(Trash)