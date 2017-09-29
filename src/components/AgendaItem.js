import React from 'react'
import { connect } from 'react-redux'
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import PlayArrowIcon from 'material-ui-icons/PlayArrow'
import Delete from 'material-ui-icons/Delete'
import Description from 'material-ui-icons/Description'

import { SLink } from './common/StyledComponents'

import {
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
} from '../constants/actionTypes'

const mapStateToProps = state => ({ ...state.agendaItem })
const mapDispatchToProps = dispatch => ({
  onActionMouseOver: value =>
    dispatch({ type: AI_ACTION_MOUSE_OVER, payload: value }),
  onActionMouseOut: value =>
    dispatch({ type: AI_ACTION_MOUSE_OUT, payload: value }),

})

function AgendaItem(props) {
  const {
    id,
    name,
    startedAt,
    updatedAt,
    duration,
    mouseOverId,
    isShowActions,
    onActionMouseOver,
    onActionMouseOut,
    type
  } = props

  const styles = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  }

  return (
    <Card
      elevation={isShowActions && (id === mouseOverId) ? 4 : 1}
      onMouseOver={() => onActionMouseOver(id)}
      onMouseOut={() => onActionMouseOut(id)}
      style={styles.root}
    >
      <SLink to={`/${type}/detail/${id}`}>
        <CardHeader
          title={name}
          subheader={`${startedAt}/${duration} min`} />
      </SLink>
      <CardActions>
        <SLink to={`/${type}/play/${id}`}>
          <IconButton aria-label="Play/pause">
            <PlayArrowIcon />
          </IconButton>
        </SLink>
        <IconButton aria-label="Delete">
          <Delete />
        </IconButton>
        <SLink to={`/${type}/detail/${id}`}>
          <IconButton aria-label="Detail">
            <Description />
          </IconButton>
        </SLink>
      </CardActions>
    </Card>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaItem)