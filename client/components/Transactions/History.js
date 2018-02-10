import React from 'react'
import injectSheet from 'react-jss'
import Transaction from './Transaction'
import style from '../../style'

@injectSheet({
  header: {
    fontSize: '25px',
    color: '#6f6f6f',
    padding: 15,
    display: 'inline-block',
    marginTop: 50
  },
  columnBox: {
    padding: '0px 15px',
    display: 'flex'
  },
  column: {
    flex: '1 1 0',
    color: '#6f6f6f',
    padding: '10px 15px 15px 0px',
    fontWeight: 600,
    color: '#5f5f5f'
  }
})
class Transactions extends React.Component {
  state = {transactions: []}

  componentWillMount() {
    fetch('https://bokiotestbankapi.azurewebsites.net/api/oliverjohansson/Transactions').then(res => {
      return res.json()
    }).then(res => {
      this.setState({transactions: res})
    })
  }

  render() {
    const { classes } = this.props
    const { transactions } = this.state

    return (
      <div className={classes.box}>
        {transactions.length > 0 && <div className={classes.header}>History</div>}
        {transactions.length > 0 &&
          <div className={classes.columnBox}>
            <span className={classes.column}>Date</span>
            <span className={classes.column}>Text</span>
            <span className={classes.column}>Amount</span>
          </div>
        }
        {transactions.map((transaction, i) => {
          return <Transaction historyTransaction={transaction} key={i}/>
        })}
      </div>
    )
  }
}

export default Transactions