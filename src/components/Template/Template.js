import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import agent from '../../agent'
import AgendaList from '../common/AgendaList'
import { GET_LIST_TEMPLATE, } from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.agendaList,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({
    type: GET_LIST_TEMPLATE,
    payload
  }),
})

class Template extends React.Component {

  componentWillMount() {
    this.props.onLoad(agent.Template.all(this.props.currentPage))
  }

  render() {
    return (
        <div>
          {this.props.templates && <AgendaList items={this.props.templates} type="template"/>}
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