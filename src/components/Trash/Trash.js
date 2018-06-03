import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import agent from '../../agent'
import AgendaList from '../common/AgendaList'
import ConfirmDialog from '../common/ConfirmDialog'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import { SECOND_TEXT_COLOR } from '../../constants/globalSetting'

import * as types from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.agendaList,
  currentUser: state.common.currentUser,
  showDialog: state.agendaItem.showDialog,
  delId: state.agendaItem.delId
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => {
    dispatch({ type: types.GET_LIST_TRASH, payload })
    dispatch({ type: types.UPDATE_APP_NAME, payload:'Trash' })
  },
  onActionDel: value => {
    dispatch({ type: types.AI_ACTION_DEL, payload: agent.Agenda.delete(value) })
    dispatch({ type: types.AI_ACTION_ONOFF_DIALOG })
  },
  onOffDialog: value =>
    dispatch({ type: types.AI_ACTION_ONOFF_DIALOG, payload: value }),
})

class Trash extends React.Component {

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.onLoad(agent.Agenda.getTrash(this.props.currentPage))
    }
  }

  render() {
    const { showDialog, onOffDialog, onActionDel, delId } = this.props
    return (
      <div >
        {this.props.trash && this.props.trash.length > 0 ?
          <AgendaList items={this.props.trash} type="trash" /> :
          <div>
            <Typography type="subheading" style={{ color: SECOND_TEXT_COLOR }}>No trash found</Typography>
            <Divider />
          </div>}
        <ConfirmDialog
          title='Confirm to delete'
          message={'Agenda will be permanently deleted and can not recover'}
          open={showDialog}
          onClose={() => onOffDialog()}
          onConfirm={() => onActionDel(delId)} />
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