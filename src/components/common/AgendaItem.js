import { PropTypes } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PlayArrowIcon from 'material-ui-icons/OndemandVideo'
import Delete from 'material-ui-icons/Delete'
import Undo from 'material-ui-icons/Undo'
import ContentCopy from 'material-ui-icons/ContentCopy'

import Description from 'material-ui-icons/Description'
import Flag from 'material-ui-icons/Flag'
import Alarm from 'material-ui-icons/Alarm'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Tooltip from 'material-ui/Tooltip'
import Status from '../common/Status'

import agent from '../../agent'

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
    dispatch({ type: types.REDIRECT, value: value })

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
    style
  } = props

  const styles = {
    iconButton: { width: 40, height: 40 }
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
    <div>
      <Card
        style={style}
        elevation={isShowActions && (id === mouseOverId) ? 4 : 1}
        onMouseOver={() => onActionMouseOver(id)}
        onMouseOut={() => onActionMouseOut(id)}
      >
        <CardHeader
          title={name}
          onClick={() => onRedirect(`/${type}/detail/${id}`)} />
        <CardContent style={{ paddingTop: 5 }}>
          <Grid container spacing={0} justify="space-between" alignItems="center">
            <Grid item xs={7} container spacing={0}>
              <Typography color="secondary" type="body2" gutterBottom style={{ paddingRight: 15 }}>
                <Grid container spacing={0}>
                  <Tooltip title="Start time">
                    <Flag style={{ width: 20, height: 20, paddingRight: 5 }} />
                  </Tooltip>
                  {new Date(startedAt).toLocaleString()}
                </Grid>
              </Typography>
              <Typography color="secondary" type="body2" gutterBottom>
                <Grid container  spacing={0}>
                  <Tooltip title="Duration">
                    <Alarm style={{ width: 20, height: 20, paddingRight: 5 }} />
                  </Tooltip>
                  <span style={{ paddingRight: 5 }}>{duration}</span>
                  mins
            </Grid>
              </Typography>
            </Grid>
            <Grid item xs={5} container spacing={0} direction="column" justify="space-around" alignItems="flex-end"
              style={{ visibility: !(isShowActions && (id === mouseOverId)) && "display" }}>
              <Grid item>
                <Status status={status}/>
              </Grid>
              <Grid item>
                {type === 'agenda' &&
                  <div>
                    <Tooltip title="Move to trash">
                      <IconButton aria-label="Delete"
                        style={styles.iconButton}
                        onClick={() => onActionLogicDel(id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy">
                      <IconButton aria-label="Copy"
                        style={styles.iconButton}
                        onClick={() => onActionCopy(id)}>
                        <ContentCopy />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Detail">
                      <IconButton
                        style={styles.iconButton}
                        aria-label="Detail"
                        onClick={() => onRedirect(`/agenda/detail/${id}`)}>
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Start the meeting">
                      <IconButton
                        style={styles.iconButton}
                        aria-label="Play/pause"
                        onClick={() => onRedirect(`/agenda/play/${id}`)}>
                        <PlayArrowIcon />
                      </IconButton>
                    </Tooltip>
                  </div>}
                {type === 'template' &&
                  <div>
                    <Tooltip title="Copy">
                      <IconButton aria-label="Delete"
                        style={styles.iconButton}
                        onClick={() => onActionCopy(id, true)}>
                        <ContentCopy />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Detail">
                      <IconButton
                        style={styles.iconButton}
                        aria-label="Detail"
                        onClick={() => onRedirect(`/template/detail/${id}`)}>
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Start the meeting">
                      <IconButton
                        style={styles.iconButton}
                        aria-label="Play/pause"
                        onClick={() => onRedirect(`/template/play/${id}`)}>
                        <PlayArrowIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
                {type === 'trash' &&
                  <div>
                    <Tooltip title="Move back to agenda">
                      <IconButton aria-label="Undo"
                        style={styles.iconButton}
                        onClick={() => onActionLogicDelUndo(id)}>
                        <Undo />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton aria-label="Delete"
                        style={styles.iconButton}
                        onClick={() => onOffDialog(id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Detail">
                      <IconButton
                        style={styles.iconButton}
                        aria-label="Detail"
                        onClick={() => onRedirect(`/agenda/detail/${id}`)}>
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Start the meeting">
                      <IconButton
                        style={styles.iconButton}
                        aria-label="Play/pause"
                        onClick={() => onRedirect(`/agenda/play/${id}`)}>
                        <PlayArrowIcon />
                      </IconButton>
                    </Tooltip>
                  </div>}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
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
