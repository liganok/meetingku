import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button';

import agent from '../../agent'
import ItemList from './ItemList'

import {
  AGENDA_UPDATE_FIELD,
  AGENDA_SAVE,
  AGENDA_MENU_ITEM_TAP,
  AGENDA_GET_DETAIL,
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
} from '../../constants/actionTypes'

const mapStateToProps = state => ({ ...state.agendaDetail, inProgress: state.common.inProgress })
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: AGENDA_GET_DETAIL, payload }),
  onSaveAgenda: agenda => {
    let ISOStartedAt = new Date(agenda.startedAt).toISOString()
    let savedAgenda = { ...agenda, startedAt: ISOStartedAt }
    dispatch({ type: AGENDA_SAVE, payload: agent.Agenda.save(savedAgenda) })
  },
  onChangeField: (id, key, value) => {
    dispatch({ type: AGENDA_UPDATE_FIELD, id: id, key: key, value: value })
  },
  onMenuItemTap: (id, value) => dispatch({ type: AGENDA_MENU_ITEM_TAP, id: id, value: value }),
  onActionMouseOver: value => dispatch({ type: AI_ACTION_MOUSE_OVER, payload: value }),
  onActionMouseOut: value => dispatch({ type: AI_ACTION_MOUSE_OUT, payload: value }),

})

class AgendaDetail extends React.Component {

  componentWillMount() {
    const { match, onLoad } = this.props
    if (match.params.id) {
      if (match.path.indexOf('template') > 0) {
        onLoad(agent.Template.get(match.params.id))
      } else {
        onLoad(agent.Agenda.getAgendaDetail(match.params.id))
      }
    }
  }

  componentWillUnmount(){
    //alert('hello')
  }

  render() {

    const {
      currentAgenda,
      mouseOverId,
      isShowActions,
      onChangeField,
      onActionMouseOver,
      onActionMouseOut,
      onMenuItemTap,
      onSaveAgenda,
      inProgress
    } = this.props

    return (
      <div>
        <ItemList
          agenda={currentAgenda}
          mouseOverId={mouseOverId}
          isShowActions={isShowActions}
          onChangeField={onChangeField}
          onActionMouseOver={onActionMouseOver}
          onActionMouseOut={onActionMouseOut}
          onMenuItemTap={onMenuItemTap}
        />
        <Grid container spacing={0} justify="flex-end" style={{ marginTop: 10 }}>
          <Button
            style={{ margin: 5 }}
            disabled={inProgress}
            raised dense color="primary"
            onClick={() => onSaveAgenda(currentAgenda)}>
            Save
          </Button>
          <Button dense style={{ margin: 5 }} >
            Delete
          </Button>
        </Grid>
      </div>
    )
  }
}
AgendaDetail.propTypes = {
  match: PropTypes.object,
  currentAgenda: PropTypes.object,
  mouseOverId: PropTypes.string,
  isShowActions: PropTypes.bool,
  onLoad: PropTypes.func,
  onChangeField: PropTypes.func,
  onActionMouseOver: PropTypes.func,
  onActionMouseOut: PropTypes.func,
  onMenuItemTap: PropTypes.func,
  onSaveAgenda: PropTypes.func

}
export default connect(mapStateToProps, mapDispatchToProps)(AgendaDetail)