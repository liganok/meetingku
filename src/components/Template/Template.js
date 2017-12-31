import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import agent from '../../agent'
import AgendaList from '../common/AgendaList'
import * as types from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.agendaList,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => {
    dispatch({ type: types.GET_LIST_TEMPLATE, payload })
    dispatch({ type: types.UPDATE_APP_NAME, payload: 'Template' })
  },
})

class Template extends React.Component {

  componentWillMount() {
    this.props.onLoad(agent.Agenda.getTemplates(this.props.currentPage))
  }

  render() {
    return (
      <div>
        {this.props.templates && <AgendaList items={this.props.templates} type="template" />}
      </div>
    )
  }
}

Template.propTypes = {
  onLoad: PropTypes.func,
  currentPage: PropTypes.number,
  templates: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Template)