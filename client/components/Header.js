import React from 'react'
import injectSheet from 'react-jss'

@injectSheet({
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: '66px',
    background: '#28cdaa',
    padding: '12px 18px',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    fontSize: '21px',
    fontFamily: 'Ubuntu',
    fontWeight: '700',
    '& img': {
      width: 33,
      marginRight: 4
    }
  }
})
class Header extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.header}>
        <img src="https://app.bokio.se/Content/gphx/logo-green-small.png"/>
        BOKIO
      </div>
    )
  }
}

export default Header