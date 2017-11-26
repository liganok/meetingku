import { PropTypes } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PlayArrowIcon from 'material-ui-icons/PlayArrow'
import Delete from 'material-ui-icons/Delete'
import Undo from 'material-ui-icons/Undo'
import ContentCopy from 'material-ui-icons/ContentCopy'

import Description from 'material-ui-icons/Description'
import Flag from 'material-ui-icons/Flag'
import Alarm from 'material-ui-icons/Alarm'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'

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
  onActionCopy: value =>
    dispatch({ type: types.AI_ACTION_COPY, payload: agent.Agenda.getAgendaDetail(value) }),
  onOffDialog: value =>
    dispatch({ type: types.AI_ACTION_ONOFF_DIALOG, payload:value }),
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
                <Grid container alignItems="center" spacing={0}>
                  <Flag style={{ width: 20, height: 20, paddingRight: 5 }} />
                  {new Date(startedAt).toLocaleString()}
                </Grid>
              </Typography>
              <Typography color="secondary" type="body2" gutterBottom>
                <Grid container alignItems="center" spacing={0}>
                  <Alarm style={{ width: 20, height: 20, paddingRight: 5 }} />
                  <span style={{ paddingRight: 5 }}>{duration}</span>
                  mins
            </Grid>
              </Typography>
            </Grid>
            <Grid item xs={5} container spacing={0} justify="flex-end"
              style={{ visibility: !(isShowActions && (id === mouseOverId)) && "display" }}>
              <IconButton
                style={styles.iconButton}
                aria-label="Play/pause"
                onClick={() => onRedirect(`/agenda/play/${id}`)}>
                <PlayArrowIcon />
              </IconButton>
              {type === 'agenda' &&
                <IconButton aria-label="Delete"
                  style={styles.iconButton}
                  onClick={() => onActionLogicDel(id)}>
                  <Delete />
                </IconButton>}
              {type === 'template' &&
                <IconButton aria-label="Delete"
                  style={styles.iconButton}
                  onClick={() => onActionCopy(id)}>
                  <ContentCopy />
                </IconButton>}
              {type === 'trash' &&
                <div>
                  <IconButton aria-label="Undo"
                    style={styles.iconButton}
                    onClick={() => onActionLogicDelUndo(id)}>
                    <Undo />
                  </IconButton>
                  <IconButton aria-label="Delete"
                    style={styles.iconButton}
                    onClick={() => onOffDialog(id)}>
                    <Delete />
                  </IconButton>
                </div>}
              <IconButton
                style={styles.iconButton}
                aria-label="Detail"
                onClick={() => onRedirect(`/agenda/detail/${id}`)}>
                <Description />
              </IconButton>
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
