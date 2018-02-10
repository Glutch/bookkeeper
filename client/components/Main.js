import React from 'react'
import injectSheet from 'react-jss'
import Transactions from './Transactions/Transactions'
import Header from './Header'
import Sidebar from './Sidebar'

@injectSheet({
  box: {
  }
})
class Main extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.box}>
        <Header/>
        <Sidebar/>
        <Transactions/>
      </div>
    )
  }
}

export default Main