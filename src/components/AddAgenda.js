import React from 'react';
import Paper from 'material-ui/Paper';


const styles = {
  root: {},
  hintText: {
    padding: 15,
  },

  doneButton: {
    //float:'right',

  },

  dialog: {}
};


class AddAgenda extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <Paper >
          <div style={styles.hintText}>
            Add an agenda
          </div>
        </Paper>
      </div>
    );
  }
}
;

export default AddAgenda;