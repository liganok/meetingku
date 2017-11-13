import React from 'react'
import PropTypes from 'prop-types';

import AgendaItem from './AgendaItem'

function AgendaList(props) {
  const {
    items = [],
    type = 'agenda',
  } = props

  const list = items.map((item, index) => {
    return (
      <AgendaItem
        key={index}
        style={{marginTop:15 }}
        type={type}
        id={item.id}
        name={item.name}
        startedAt={item.startedAt}
        updatedAt={item.updatedAt}
        duration={item.duration}
      />
    )
  })

  return (
    <div>
      {list}
    </div>
  )
}

AgendaList.propTypes = {
  type: PropTypes.oneOf(['agenda', 'template', 'trash']),
  items: PropTypes.array
}

export default AgendaList