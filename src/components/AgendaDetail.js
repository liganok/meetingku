import React from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Flag from 'material-ui-icons/Flag'
import Alarm from 'material-ui-icons/Alarm'
import Input from 'material-ui/Input'
import PlayArrowIcon from 'material-ui-icons/PlayArrow'
import Add from 'material-ui-icons/Add'
import Remove from 'material-ui-icons/Remove'
import IconButton from 'material-ui/IconButton'

import agent from '../agent'

import {
  AGENDA_UPDATE_FIELD,
  AGENDA_SAVE,
  AGENDA_MENU_ITEM_TAP,
  AGENDA_GET_DETAIL,
} from '../constants/actionTypes'

function HeaderItem (props) {
  const {
    id,
    name,
    duration,
    startedAt,
  } = props

  const styles = {
    root: {
      marginTop: 15,
      paddingLeft: 10
    },
    name: {
      fontSize: 20
    },
    startAt: {
      fontSize: 8
    },
    duration: {
      fontSize: 8,
      width: 40
    },
    icon: {
      width: 15,
      height: 15
    }
  }

  return (
    <Paper style={styles.root}>
      <Grid container>
        <Grid item xs={9} container direction="column">
          <Grid item>
            <TextField
              style={styles.name}
              id={`name${id}`}
              placeholder="Name"
              value={name}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item container align="center" spacing={8}>
            <Grid item>
              <Flag style={styles.icon}/>
            </Grid>
            <Grid item>
              <TextField
                style={styles.startAt}
                id="datetime-local"
                step="300"
                type="datetime-local"
                value={startedAt}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} container direction="column" justify="space-between" align="flex-end">
          <Grid item container justify="flex-end">
            <IconButton>
              <Add/>
            </IconButton>
            <IconButton>
              <Remove/>
            </IconButton>
          </Grid>
          <Grid item container justify="flex-end" align="center" spacing={8}>
            <Grid item>
              <Alarm style={styles.icon}/>
            </Grid>
            <Grid item>
              <TextField
                style={styles.duration}
                id="duration"
                value={duration}
                placeholder="Duration"
                width={5}
              />
            </Grid>
            <Grid item>
              <Typography type="caption">min</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

function SubItem (props) {
  const {
    agenda
  } = props

  const styles = {
    root: {
      marginTop: 15,
      paddingLeft: 10
    },
    name: {
      fontSize: 15
    },
    startAt: {
      fontSize: 8
    },
    duration: {
      fontSize: 8,
      width: 40
    },
    icon: {
      width: 15,
      height: 15
    }
  }

  function renderComponent (agenda) {
    let componentArr = []
    //let isHasStartedAt = (typeof (agenda.startedAt) !== 'undefined');
    let isHasSubItem = agenda.subItems.length

    const item = (
      <Paper key={agenda.id}>
        <Grid container>
          <Grid item xs={9} container direction="column">
            <Grid item>
              <TextField
                style={styles.name}
                id={`name${agenda.id}`}
                placeholder="Name"
                value={name}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid item xs={3} container direction="column" justify="space-between" align="flex-end">
            <Grid item container justify="flex-end">
              <IconButton>
                <Add/>
              </IconButton>
              <IconButton>
                <Remove/>
              </IconButton>
            </Grid>
            <Grid item container justify="flex-end" align="center" spacing={8}>
              <Grid item>
                <Alarm style={styles.icon}/>
              </Grid>
              <Grid item>
                <TextField
                  style={styles.duration}
                  id="duration"
                  value={agenda.duration}
                  placeholder="Duration"
                  width={5}
                />
              </Grid>
              <Grid item>
                <Typography type="caption">min</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
    if (!isHasSubItem) {
      componentArr.push(item)
      return componentArr
    } else {

      componentArr.push(item)

      agenda.subItems.forEach(item => {
        componentArr.push(
          <div style={{paddingLeft: '15px'}} key={`subItem${item.id}`}>
            {this.renderComponent(item)}
          </div>
        )
      })

      return componentArr
    }
  }

  return (
    <div style={styles.root}>
      {agenda? renderComponent(agenda):''}
    </div>
  )
}

const mapStateToProps = state => ({...state.agendaDetail})
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({type: AGENDA_GET_DETAIL, payload}),
  onSaveAgenda: agenda => dispatch({type: AGENDA_SAVE, payload: agent.Agenda.save(agenda)}),
  onChangeField: (id, key, value) => dispatch({type: AGENDA_UPDATE_FIELD, id: id, key: key, value: value}),
  onMenuItemTap: (id, value) => dispatch({type: AGENDA_MENU_ITEM_TAP, id: id, value: value}),

})

class AgendaDetail extends React.Component {

  constructor (props) {
    super()
    this.id = props.match.params.id
    this.onLoad = props.onLoad
    this.onSaveAgenda = props.onSaveAgenda
    this.onChangeField = props.onChangeField

  }

  componentWillMount () {
    if (this.id) {
      this.onLoad(agent.Agenda.get(this.props.match.params.id))
    }
  }

  render () {

    const agenda = this.props.currentAgenda
    if (!agenda) {
      return null
    }

    return (
      <Grid container justify="center">
        <Grid item xs={8} container direction="column">
          <Grid item>
            <HeaderItem id={agenda.id} name={agenda.name} duration={agenda.duration} startedAt={agenda.startedAt}/>
            <SubItem agenda={agenda}/>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaDetail)