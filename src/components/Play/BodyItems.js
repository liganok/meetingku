import React from 'react'
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import PlayItem from './PlayItem'
import Paper from 'material-ui/Paper'
import { withTheme } from 'material-ui/styles';
import Item from './BodyItem'

function renderComponent(agenda, timer) {
  let componentArr = []
  let isHasSubItem = agenda.subItems.length
  let endPlayTime = agenda.duration * 60 + agenda.startedPlayAt

  let spend = timer < agenda.startedPlayAt ? 0
    : (timer >= endPlayTime ? agenda.duration * 60 : (timer - agenda.startedPlayAt))
  const item = (
    <Item
      key={agenda.id}
      name={agenda.name}
      duration={agenda.duration}
      spend={spend}
      isHasSubItem={isHasSubItem}
    />
  )

  if (!isHasSubItem) {
    componentArr.push(item)
    return componentArr
  } else {

    componentArr.push(item)
    agenda.subItems.forEach(item => {
      componentArr.push(
        <div style={{ paddingLeft: 15 }} key={`subItem${item.id}`}>
          {renderComponent(item, timer)}
        </div>
      )
    })

    return componentArr
  }
}

function BodyItems(props) {
  const { agenda, timer, style } = props
  let itemList = renderComponent(agenda, timer)
  itemList.shift()
  return (
    <div style={style}>
      {itemList}
    </div>
  )
}

Item.propTypes = {
  name: PropTypes.string,
  completed: PropTypes.number,
  spacing: PropTypes.number,
  duration: PropTypes.number,
  timer: PropTypes.number,
  spend: PropTypes.number

}

BodyItems.propTypes = {
  style: PropTypes.object,
  agenda: PropTypes.object,
  timer: PropTypes.number
}

export default BodyItems