import React from 'react'
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Flag from 'material-ui-icons/Flag'
import Alarm from 'material-ui-icons/Alarm'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import Add from 'material-ui-icons/Add'
import Remove from 'material-ui-icons/Remove'
import IconButton from 'material-ui/IconButton'
import Input, { InputAdornment } from 'material-ui/Input';
import { DateTimePicker } from 'material-ui-pickers'
function Item(props) {
  const {
    id,
    name,
    startedAt,
    duration=0,
    isHasSubItem,
    isRoot = false,
    mouseOverId,
    isShowActions,
    onChangeField,
    onActionMouseOver,
    onActionMouseOut,
    onMenuItemTap,
  } = props

  const styles = {
    root: {
      marginTop: 15,
      paddingLeft: 10
    },
    name: {
      fontSize: 25
    },
    startedAt: {
      fontSize: 8
    },
    duration: {
      fontSize: 8,
    },
    icon: {
      width: 15,
      height: 15
    },
    actionButton: {
      width: 20,
      height: 20
    }
  }

  //let localDate = new Date(startedAt)
  //let localStartedAt =  new Date(localDate.valueOf() - localDate.getTimezoneOffset() * 60000).toISOString().substring(0, 16)

  return (
    <Paper
      elevation={1}
      key={id}
      style={styles.root}
      onMouseOver={() => onActionMouseOver(id)}
      onMouseOut={() => onActionMouseOut(id)}>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={8}>
          <TextField
            style={styles.name}
            id={`name${id}`}
            placeholder="Name"
            value={name}
            fullWidth
            margin="normal"
            onChange={(ev) => { onChangeField(id, 'name', ev.target.value) }}
          />
          <Grid item container align="center" spacing={0} style={{ display: `${isRoot ? '' : 'none'}`,paddingBottom:10 }}>
            <DateTimePicker
              style={styles.startedAt}
              id={`startedAt${startedAt}`}
              value={startedAt}
              leftArrowIcon={<KeyboardArrowLeft/>}
              rightArrowIcon={<KeyboardArrowRight />}
              InputProps={{
                style:styles.startedAt,
                startAdornment: (
                  <InputAdornment  position="start">
                    <Flag style={styles.icon}/>
                  </InputAdornment>
                )
              }} 
              onChange={(time) => { onChangeField(id, 'startedAt', time) }}
            />
          </Grid>
        </Grid>
        <Grid item xs={4} container direction="column" spacing={0} alignItems="flex-end" style={{ padding: 5 }}>
          <Grid item
            style={{ visibility: isShowActions && (id === mouseOverId) ? '' : 'hidden' }}>
            <IconButton style={{ ...styles.actionButton,marginRight:15}} onClick={() => { onMenuItemTap(id, 'ADD') }}>
              <Add />
            </IconButton>
            <IconButton style={styles.actionButton} onClick={() => { onMenuItemTap(id, 'DEL') }}>
              <Remove />
            </IconButton>
          </Grid>
          <Input
            style={styles.duration}
            id={`duration${duration}`}
            value={duration}
            type="number"
            inputProps={{
              'min': '0',
              'max': '99',
              'readOnly': isHasSubItem ? true : false
            }}
            margin="dense"
            startAdornment={<InputAdornment position="start"><Alarm style={styles.icon} /></InputAdornment>}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
            onChange={(ev) => { onChangeField(id, 'duration', ev.target.value) }}
          />
        </Grid>
      </Grid>
    </Paper>
  )

}

Item.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  mouseOverId: PropTypes.string,
  startedAt: PropTypes.any,
  duration: PropTypes.number,
  isHasSubItem: PropTypes.bool,
  isRoot: PropTypes.bool,
  isShowActions: PropTypes.bool,
  onChangeField: PropTypes.func,
  onActionMouseOver: PropTypes.func,
  onActionMouseOut: PropTypes.func,
  onMenuItemTap: PropTypes.func,
}

export default Item