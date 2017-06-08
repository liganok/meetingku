import React from 'react';
import { connect } from 'react-redux';
import agent from '../agent';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

import {
  GET_AGENDALIST,
} from '../constants/actionTypes';

const styles = {
  main: {
    paddingLeft:20,
    paddingRight:20
  },
  card: {

  },
  avatar: {
    margin: '1em',
    textAlign: 'center ',
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    display: 'flex',
  },
};

const mapStateToProps = state => ({ ...state.agendaList });

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: GET_AGENDALIST, payload })
});

const CardItem = props => {
  if (!props.agenda) {
    return (
      <div>
        <Card>
          <CardHeader
            title={props.agenda.name}
            actAsExpander={true}
            showExpandableButton={true}
          />
        </Card>
      </div>
    );
  }
  return null;
}

class AgendaList extends React.Component{

  componentWillMount() {
    this.props.onLoad(agent.Agenda.all());
  }

  render(){
    if(!this.props.agendas) return(<div></div>);
    let list = this.props.agendas.map((item,index)=>{
      return(
        <ListItem style={styles.card} key={index} primaryText={item.name}/>
      );
    });
    return(
      <div>
        <List style={styles.main}>
          {list}
        </List>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList);