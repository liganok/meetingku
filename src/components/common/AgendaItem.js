import { PropTypes } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

import Description from '@material-ui/icons/Description'
import Flag from '@material-ui/icons/Flag'
import Alarm from '@material-ui/icons/Alarm'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Status from '../common/Status'

import agent from '../../agent'
import AgendaActions from './AgendaActions'
import * as types from '../../constants/actionTypes'

const mapStateToProps = state => ({ ...state.agendaItem })
const mapDispatchToProps = dispatch => ({
  onActionMouseOver: value =>
    dispatch({ type: types.AI_ACTION_MOUSE_OVER, payload: value }),
  onActionMouseOut: value =>
    dispatch({ type: types.AI_ACTION_MOUSE_OUT, payload: value }),
  onActionLogicDel: value =>
    dispatch({ type: types.AI_ACTION_LOGIC_DEL, payload: agent.Agenda.moveToTrash(value) }),
  onActionLogicDelUndo: value =>
    dispatch({ type: types.AI_ACTION_LOGIC_DEL_UNDO, payload: agent.Agenda.moveOutTrash(value) }),
  onActionDel: value => {
    dispatch({ type: types.AI_ACTION_DEL, payload: agent.Agenda.delete(value) })
    dispatch({ type: types.AI_ACTION_ONOFF_DIALOG })
  },
  onActionCopy: (value, isFromTemplate) =>
    dispatch({ type: types.AI_ACTION_COPY, payload: isFromTemplate ? agent.Agenda.getTemplateDetail(value) : agent.Agenda.getAgendaDetail(value) }),
  onOffDialog: value =>
    dispatch({ type: types.AI_ACTION_ONOFF_DIALOG, payload: value }),
  onRedirect: (value = null) =>
    dispatch({ type: types.REDIRECT, value: value }),
  onOpenMenu: (value) =>
    dispatch({ type: types.AI_ACTION_OPEN_MENUITEM, payload: value }),
  onCloseMenu: () =>
    dispatch({ type: types.AI_ACTION_CLOSE_MENUITEM }),
})

function AgendaItem(props) {
  const {
    id,
    name,
    startedAt = new Date(),
    updatedAt,
    duration = 0,
    mouseOverId,
    isShowActions,
    onActionMouseOver,
    onActionMouseOut,
    onActionLogicDel,
    onActionCopy,
    onActionLogicDelUndo,
    onActionDel,
    onRedirect,
    onOffDialog,
    showDialog,
    type,
    style,
    anchorEl,
    onOpenMenu,
    onCloseMenu
  } = props

  const styles = {
    iconButton: { width: 40, height: 40 },
    iconFlag: { width: 15, height: 15, paddingRight: 5, color: "#a4a6b0" }
  }

  let startTime = new Date(startedAt).getTime()
  let nowTime = new Date().getTime()
  let status
  if (startTime > nowTime) {
    status = 'todo'
  } else if (nowTime > (startTime + duration * 60000)) {
    status = 'done'
  } else {
    status = 'inProcess'
  }

  return (
    <Paper
      style={{ ...style, padding: '10px' }}
      elevation={isShowActions && (id === mouseOverId) ? 4 : 1}
      onMouseOver={() => onActionMouseOver(id)}
      onMouseOut={() => onActionMouseOut(id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={() => onRedirect(`/${type}/detail/${id}`)}>
        <Typography variant='title'>{name}</Typography>
        <Status status={status} />
      </div>
      <Grid style={{ paddingTop: 15 }} container spacing={0} justify="space-between" alignItems="center">
        <Grid item xs={7} container spacing={0}>
          <Grid container spacing={0}>
            <Tooltip title="Start time">
              <Flag style={styles.iconFlag} />
            </Tooltip>
            <Typography color="textSecondary" variant="caption" gutterBottom style={{ paddingRight: 15 }}>
              {new Date(startedAt).toLocaleString()}
            </Typography>
          </Grid>
          <Grid container spacing={0}>
            <Tooltip title="Duration">
              <Alarm style={styles.iconFlag} />
            </Tooltip>
            <Typography color="textSecondary" variant="caption" gutterBottom>
              <span style={{ paddingRight: 5 }}>{duration}</span>
              mins
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={5} container spacing={0} direction="column" justify="space-around" alignItems="flex-end"
          style={{ visibility: !(isShowActions && (id === mouseOverId)) && "display" }}>
          <AgendaActions
            type={type}
            anchorEl={anchorEl}
            onActionDetail={() => { onRedirect(`/${type === 'template' ? 'template' : 'agenda'}/detail/${id}`); onCloseMenu() }}
            onActionCopy={() => { onActionCopy(id, type==='template'? true:false); onCloseMenu() }}
            onActionLogicDel={() => { onActionLogicDel(id); onCloseMenu() }}
            onActionDel={() => { onOffDialog(id); onCloseMenu() }}
            onActionLogicDelUndo={() => { onActionLogicDelUndo(id); onCloseMenu() }}
            onOpenMenu={(ev) => onOpenMenu(ev.currentTarget)}
            onCloseMenu={() => onCloseMenu()}
            onActionPlay={() => onRedirect(`/${type === 'template' ? 'template' : 'agenda'}/play/${id}`)}
          />
        </Grid>
      </Grid>
    </Paper>
  )

}

AgendaItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  startedAt: PropTypes.string,
  updatedAt: PropTypes.string,
  mouseOverId: PropTypes.string,
  isShowActions: PropTypes.bool,
  duration: PropTypes.number,
  currentPage: PropTypes.number,
  templates: PropTypes.array,
  onActionMouseOver: PropTypes.func,
  onActionMouseOut: PropTypes.func,
  onActionLogicDel: PropTypes.func,
  onActionLogicDelUndo: PropTypes.func,
  onActionDel: PropTypes.func,
  onRedirect: PropTypes.func,
  type: PropTypes.oneOf(['agenda', 'template', 'trash']),
  style: PropTypes.any
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaItem)
