
import React from 'react';
import PropTypes from 'prop-types';

class Progress extends React.Component {

  static propTypes = {
    completed: ((props, propName) => {
      if (typeof props[propName] !== 'number')
        return Progress.throwError('Invalid Props: "completed" should ∈ ℝ ');
      if( props[propName] < 0 || props[propName] > 100) {
        return Progress.throwError('Invalid Props: "completed" should be between 0 and 100' );
      }
    }),
    color: PropTypes.string,
    animation: PropTypes.number,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  static defaultProps = {
    completed: 0,
    color: '#0BD318',
    animation: 2000,
    height: 10
  }

  static throwError() {
    return new Error(...arguments);
  }

  render () {
    const {completed, animation, style, children, ...rest} = this.props;
    const styles = {
      root:{
        position: 'absolute',
        backgroundColor: 'green',
        width: completed + '%',
        transition: `width ${animation}ms linear`,
        height: '60px',
        opacity: 0.2,
        zIndex:1,
      }
    };

    return (
        <div className="progressbar-progress" style={Object.assign(styles.root,style)}>{children}</div>
    );
  }
}

export default Progress;