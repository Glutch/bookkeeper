import React from 'react'
import injectSheet from 'react-jss'
import style from '../../style'

@injectSheet({
  transaction: {
    padding: 15,
    borderTop: '2px solid #f1f1f1',
    cursor: 'pointer',
    display: 'flex',
    '&:hover': {
      background: '#fafafa'
    },
    '& span': {
      color: '#6f6f6f',
      flex: '1 1 0',
      '&:nth-child(2), &:nth-child(5)': {
        display: 'none'
      },
      [style.DESKTOP]: {
        '&:nth-child(2), &:nth-child(5)': {
          display: 'inherit'
        },
      }
    }
  },
  completed: {
    extend: 'transaction',
    borderTop: '2px solid #ffffff4f',
    background: '#28cdaa',
    '&:hover': {
      background: '#34dcb8'
    },
    '& span': {
      color: '#fff'
    }
  },
  selected: {
    extend: 'transaction',
    background: '#f1f1f1',
    '&:hover': {
      background: '#f1f1f1'
    }
  },
  historyTransaction: {
    padding: 15,
    borderTop: '2px solid #f1f1f1',
    display: 'flex',
    '& span': {
      color: '#6f6f6f',
      flex: '1 1 0'
    }
  }
})
class Transaction extends React.Component {
  render() {
    const {
      classes,
      transaction,
      specific,
      id,
      current,
      historyTransaction
    } = this.props
    return (
      <div>
        {transaction ?
          <div className={transaction.completed ? classes.completed : current == id ? classes.selected : classes.transaction} onClick={() => specific(id)}>
            <span>{transaction.Reskontradatum}</span>
            <span>{transaction.Transaktionsdatum}</span>
            <span>{transaction.Text}</span>
            <span>{transaction.Belopp}</span>
            <span>{transaction.Saldo}</span>
          </div>
          :
          <div className={classes.transaction}>
            <span>{historyTransaction.date.slice(0, 10)}</span>
            <span>{historyTransaction.text}</span>
            <span>{historyTransaction.amount}</span>
          </div>
        }
      </div>
    )
  }
}

export default Transaction