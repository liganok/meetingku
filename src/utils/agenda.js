
function deepCopy(agenda){
  agenda.id = 'NEW'+agenda.id
  if(agenda.subItems.length){
    agenda.subItems.forEach((item)=>{
      makeCopy(item)
    })
  }
  return agenda
}

function makeCopy(agenda){
  deepCopy(agenda)
  agenda.startedAt = new Date()
  return agenda
}

export  { 
  makeCopy
}