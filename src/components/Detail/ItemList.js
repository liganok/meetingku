import React from 'react'
import PropTypes from 'prop-types';
import Item from './Item'

function ItemList(props) {
  const {
    agenda,
    onChangeField,
    mouseOverId,
    isShowActions,
    onActionMouseOver,
    onActionMouseOut,
    onMenuItemTap,
  } = props

  if (!agenda) {
    return null
  }

  function renderComponent(payload) {
    const {
      agenda,
      isRoot = false,
    } = payload

    let componentArr = []
    let isHasSubItem = agenda.subItems.length ? true : false
    const item = (
      <Item
        key={agenda.id}
        id={agenda.id}
        startedAt={agenda.startedAt}
        duration={parseInt(agenda.duration)}
        isHasSubItem={isHasSubItem}
        name={agenda.name}
        location={agenda.location}
        isRoot={isRoot}
        mouseOverId={mouseOverId}
        isShowActions={isShowActions}
        onChangeField={onChangeField}
        onActionMouseOver={onActionMouseOver}
        onActionMouseOut={onActionMouseOut}
        onMenuItemTap={onMenuItemTap}
      />
    )
    if (!isHasSubItem) {
      componentArr.push(item)
      return componentArr
    } else {

      componentArr.push(item)

      agenda.subItems.forEach(item => {
        componentArr.push(
          <div style={{ paddingLeft: '15px' }} key={`subItem${item.id}`}>
            {renderComponent({ agenda: item })}
          </div>
        )
      })

      return componentArr
    }
  }

  return (
    <div>
      {renderComponent({ agenda: agenda, isRoot: true })}
    </div>
  )
}

ItemList.propTypes = {
  agenda: PropTypes.object,
  isShowActions: PropTypes.bool,
  onChangeField: PropTypes.func,
  mouseOverId: PropTypes.string,
  onActionMouseOver: PropTypes.func,
  onActionMouseOut: PropTypes.func,
  onMenuItemTap: PropTypes.func
}
export default ItemList