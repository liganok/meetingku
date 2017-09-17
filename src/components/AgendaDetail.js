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
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
} from '../constants/actionTypes'

function Item (props) {
  const{
    id,
    name,
    startedAt,
    duration,
    isHasSubItem,
    isRoot=false,
    mouseOverId,
    isShowActions,
    onChangeField,
    onActionMouseOver,
    onActionMouseOut,
  }=props

  const styles = {
    root: {
      marginTop: 15,
      paddingLeft: 10
    },
    name: {
      fontSize: 15
    },
    startedAt: {
      fontSize: 8
    },
    duration: {
      fontSize: 8,
      width: 30,
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

  return(
    <Paper
      key={id}
      style={styles.root}
      onMouseOver={() => onActionMouseOver(id)}
      onMouseOut={() => onActionMouseOut(id)}>
      <Grid container align="center">
        <Grid item xs={8} container direction="column">
          <Grid item>
            <TextField
              style={styles.name}
              id={`name${id}`}
              placeholder="Name"
              value={name}
              fullWidth
              margin="normal"
              onChange={(ev) => {onChangeField(id, 'name', ev.target.value)}}
            />
          </Grid>
          <Grid item container align="center" spacing={8} style={{display: `${isRoot ? '' : 'none'}`}}>
            <Grid item>
              <Flag style={styles.icon}/>
            </Grid>
            <Grid item>
              <TextField
                style={styles.startedAt}
                id={`startedAt${startedAt}`}
                step="300"
                type="datetime-local"
                value={startedAt}
                onChange={(ev) => {onChangeField(id, 'startedAt', ev.target.value)}}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} container>
          <Grid item container justify="flex-end"
                style={{display: isShowActions && (id === mouseOverId) ? '':'none'}}>
            <IconButton style={styles.actionButton}>
              <Add/>
            </IconButton>
            <IconButton style={styles.actionButton}>
              <Remove/>
            </IconButton>
          </Grid>
          <Grid item container justify="flex-end" align="center">
            <Alarm style={styles.icon}/>
            <TextField
              style={styles.duration}
              disabled={isHasSubItem ? true : false}
              id={`duration${duration}`}
              value={duration}
              placeholder="Duration"
              dir="rtl"
              onChange={(ev) => {onChangeField(id, 'duration', ev.target.value)}}
            />
            <Typography type="caption" style={{paddingLeft:'1px'}}>min</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )

}

function ItemList (props) {
  const {
    agenda,
    onChangeField,
    onActionMouseOver,
    onActionMouseOut,
    mouseOverId,
    isShowActions,
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
      width: 30,
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

  if (!agenda || agenda.subItems.length === 0) {
    return null
  }

  function renderComponent (payload) {
    const {
      agenda,
      isRoot = false,
    } = payload

    let componentArr = []
    let isHasSubItem = agenda.subItems.length
    const item = (
      <Item
        id={agenda.id}
        startedAt={agenda.startedAt}
        duration={agenda.duration}
        isHasSubItem={isHasSubItem}
        name={agenda.name}
        isRoot={isRoot}
        mouseOverId={mouseOverId}
        isShowActions={isShowActions}
        onChangeField={onChangeField}
        onActionMouseOver={onActionMouseOver}
        onActionMouseOut={onActionMouseOut}
      />
    )
    if (!isHasSubItem) {
      componentArr.push(item)
      return componentArr
    } else {

      componentArr.push(item)

      agenda.subItems.forEach(item => {
        componentArr.push(
          <div style={{paddingLeft: '15px'}} key={`subItem${item.id}`}>
            {renderComponent({agenda: item})}
          </div>
        )
      })

      return componentArr
    }
  }

  return (
    <div style={styles.root}>
      {renderComponent({agenda: agenda, isRoot: true})}
    </div>
  )
}

const mapStateToProps = state => ({...state.agendaDetail})
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({type: AGENDA_GET_DETAIL, payload}),
  onSaveAgenda: agenda => dispatch({type: AGENDA_SAVE, payload: agent.Agenda.save(agenda)}),
  onChangeField: (id, key, value) => dispatch({type: AGENDA_UPDATE_FIELD, id: id, key: key, value: value}),
  onMenuItemTap: (id, value) => dispatch({type: AGENDA_MENU_ITEM_TAP, id: id, value: value}),
  onActionMouseOver: value => dispatch({type: AI_ACTION_MOUSE_OVER, payload: value}),
  onActionMouseOut: value => dispatch({type: AI_ACTION_MOUSE_OUT, payload: value}),

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
    return (
      <Grid container justify="center">
        <Grid item xs={8}>
          <ItemList
            agenda={agenda}
            mouseOverId={this.props.mouseOverId}
            isShowActions={this.props.isShowActions}
            onChangeField={this.props.onChangeField}
            onActionMouseOver={this.props.onActionMouseOver}
            onActionMouseOut={this.props.onActionMouseOut}
          />
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaDetail)