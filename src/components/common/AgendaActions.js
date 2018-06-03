import React from 'react'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/OndemandVideo'
import Delete from '@material-ui/icons/Delete'
import Undo from '@material-ui/icons/Undo'
import ContentCopy from '@material-ui/icons/ContentCopy'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function AgendaActions(props) {
  const {
    type,
    anchorEl,
    onOpenMenu,
    onCloseMenu,
    onActionLogicDel,
    onActionLogicDelUndo,
    onActionDel,
    onActionCopy,
    onActionPlay,
    onActionDetail
  } = props


  const styles = {
    root: {
      display: 'flex'
    },
    iconButton: { width: 40, height: 40 }
  }

  return (
    <div style={styles.root} >
      <Tooltip title="Start the meeting">
        <IconButton
          style={styles.iconButton}
          aria-label="Play/pause"
          onClick={onActionPlay}>
          <PlayArrowIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="More">
        <IconButton
          style={styles.iconButton}
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={onOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="agenda-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onCloseMenu}
      >
        <MenuItem onClick={onActionDetail}>{`${type === 'template' ? '' : 'Edit / '}Display`}</MenuItem>
        <MenuItem onClick={onActionCopy}>Copy</MenuItem>
        {type === 'agenda' && <MenuItem onClick={onActionLogicDel}>Remove to trash</MenuItem>}
        {type === 'trash' && <MenuItem onClick={onActionLogicDelUndo}>Move back to agenda</MenuItem>}
        {type === 'trash' && <MenuItem onClick={onActionDel}>Delete</MenuItem>}
      </Menu>
    </div>
  )
}

export default AgendaActions