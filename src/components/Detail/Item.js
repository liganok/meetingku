import React from 'react'
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Flag from '@material-ui/icons/Flag'
import Alarm from '@material-ui/icons/Alarm'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import DateRange from '@material-ui/icons/DateRange'
import AccessTime from '@material-ui/icons/AccessTime'

import Add from '@material-ui/icons/Add'
import LocationOn from '@material-ui/icons/LocationOn'
import Remove from '@material-ui/icons/Remove'
import IconButton from 'material-ui/IconButton'
import Input, { InputAdornment } from 'material-ui/Input';
import Tooltip from 'material-ui/Tooltip'
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";

function Item(props) {
  const {
    id,
    name,
    startedAt,
    duration,
    isHasSubItem,
    location,
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
            placeholder={isRoot ? 'Input your agenda name' : 'Add agenda item'}
            value={name}
            fullWidth
            margin="normal"
            onChange={(ev) => { onChangeField(id, 'name', ev.target.value) }}
          />
          <Grid item container align="center" spacing={0} style={{ display: `${isRoot ? '' : 'none'}`, paddingBottom: 10 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div style={{ paddingRight: 20 }}>
                <DateTimePicker
                  autoOk
                  ampm={false}
                  style={styles.startedAt}
                  id={`startedAt${startedAt}`}
                  value={startedAt}
                  leftArrowIcon={<KeyboardArrowLeft />}
                  rightArrowIcon={<KeyboardArrowRight />}
                  dateRangeIcon={<DateRange />}
                  timeIcon={<AccessTime />}
                  onChange={(time) => { onChangeField(id, 'startedAt', time) }}
                  InputProps={{
                    style: styles.startedAt,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Tooltip title="Start time">
                          <Flag style={styles.icon} />
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>

            <Input
              style={{ ...styles.duration }}
              id={`location${location}`}
              value={location}
              inputProps={{
              }}
              margin="dense"
              startAdornment={
                <InputAdornment position="start">
                  <Tooltip title="Location">
                    <LocationOn style={styles.icon} />
                  </Tooltip>
                </InputAdornment>}
              onChange={(ev) => { onChangeField(id, 'location', ev.target.value) }}
            />
          </Grid>
        </Grid>
        <Grid item xs={4} container direction="column" spacing={0} alignItems="flex-end" style={{ padding: 5 }}>
          <Grid item
            style={{ visibility: isShowActions && (id === mouseOverId) ? '' : 'hidden' }}>
            <Tooltip title="Add sub-item">
              <IconButton style={{ ...styles.actionButton, marginRight: 15 }} onClick={() => { onMenuItemTap(id, 'ADD') }}>
                <Add />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove">
              <IconButton style={{ ...styles.actionButton, display: isRoot && 'none' }} onClick={() => { onMenuItemTap(id, 'DEL') }}>
                <Remove />
              </IconButton>
            </Tooltip>
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
            startAdornment={<InputAdornment position="start">
              <Tooltip title="Duration">
                <Alarm style={styles.icon} />
              </Tooltip>
            </InputAdornment>}
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