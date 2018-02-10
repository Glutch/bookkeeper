import React from 'react'
import injectSheet from 'react-jss'

@injectSheet({
  skeleton: {
    height: 14,
    background: '#f1f1f1',
    marginTop: 10,
    borderRadius: 2,
  }
})
class Skeleton extends React.Component {
  render() {
    const { classes, width } = this.props
    return <div style={{width: width + '%'}} className={classes.skeleton}></div>
  }
}

export default Skeleton