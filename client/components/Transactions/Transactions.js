import React from 'react'
import injectSheet from 'react-jss'
import Transaction from './Transaction'
import Bookkeeper from '../Bookkeeper/Bookkeeper'
import History from './History'
import style from '../../style'

@injectSheet({
  box: {
    margin: 'auto',
    border: '1px solid #e1e5e8',
    padding: 20,
    background: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 66,
    '& img': {
      display: 'block',
      margin: 'auto',
      width: 48,
      opacity: .1,
      marginBottom: 10
    },
    [style.DESKTOP]: {
      maxWidth: '75%',
      left: 230,
      padding: 30,
    }
  },
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
    color: '#5f5f5f',
    '&:nth-child(2), &:nth-child(5)': {
      display: 'none'
    },
    [style.DESKTOP]: {
      '&:nth-child(2), &:nth-child(5)': {
        display: 'inherit'
      }
    }
  },
  title: {
    textAlign: 'center',
    padding: 50,
    fontSize: 25,
    color: '#6f6f6f'
  },
  help: {
    display: 'block',
    fontSize: 16,
    color: '#999',
    '& a': {
      textDecoration: 'none',
      color: '#28cdaa'
    }
  },
  dropzone: {
    width: '100%',
    height: 150,
    border: '3px dashed #ececec',
    color: '#c3c2c2',
    margin: 'auto',
    marginBottom: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    '& div': {
      border: '2px solid #f1f0f0',
      borderRadius: '5px',
      width: 60,
      height: 50,
      textAlign: 'center',
      margin: '0px 10px',
      lineHeight: '50px',
      color: '#999',
    },
    [style.DESKTOP]: {
      width: 400
    }
  }
})
class Transactions extends React.Component {

  state = {
    transactions: [],
    columns: [],
    messageLevel: 1,
    subMessageLevel: 1,
    current: 0,
    rows: 0,
    finished: false
  }

  paste = evt => {
    const text = evt.clipboardData.getData('Text')

    const items = text
      .replace(/^\s+|\s+$|\s+(?=\s)/g, '_')
      .replace(/\n/g, '_')
      .split('_')

    let transactions = []
    let columns = []
    items.forEach((item, i) => {
      const count = (item.match(/-/g) || []).length
      if (count == 2) {
        if ((items[i + 1].match(/-/g) || []).length == 2) {
          if (columns.length == 0) {
            columns.push(
              items[i - 5].trim(),
              items[i - 4].trim(),
              items[i - 3].trim(),
              items[i - 2].trim(),
              items[i - 1].trim()
            )
          } else {
            transactions.push({
              Reskontradatum: item.trim(),
              Transaktionsdatum: items[i + 1].trim(),
              Text: items[i + 2].trim(),
              Belopp: items[i + 3].replace(/\s/g, ''),
              Saldo: items[i + 4].replace(/\s/g, ''),
              completed: false,
              id: transactions.length + 1
            })
          }
        }
      }
    })

    if (transactions.length > 0 && columns.length > 0) {
      this.setState({
        transactions,
        columns,
        messageLevel: 2,
        subMessageLevel: 0,
        rows: transactions.length
      })
    } else {
      this.setState({ messageLevel: 0 })
    }
  }

  confirm = id => {
    const updated = this.state.transactions
    updated[id].completed = true

    const { Reskontradatum, Transaktionsdatum, Text, Belopp, Saldo } = updated[id]

    fetch('https://bokiotestbankapi.azurewebsites.net/api/oliverjohansson/Transactions', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{
        date: Reskontradatum,
        text: Text,
        amount: parseInt(Belopp)
      }])
    })

    this.setState({transactions: updated})

    if (updated.filter(item => item.completed == false).length == 0) {
      this.setState({finished: true})
    }

    if (!this.state.finished) {
      this.setState({current: (updated.filter(item => item.completed == false)[0] || []).id - 1})
    }
  }

  specific = id => {
    this.setState({current: id})
  }

  render() {
    const { classes } = this.props
    const { transactions,
            columns,
            messageLevel,
            subMessageLevel,
            current,
            rows,
            finished
          } = this.state

    const message = [
      'Something went wrong!',
      'Paste your transaction history!',
      'Great! Let\'s start bookkeeping']

    return (
      <div className={classes.box} onPaste={this.paste}>

        <div className={classes.title}>
          <img src="/images/cart.svg" />
          {message[this.state.messageLevel]}
          {subMessageLevel === 1 &&
            <div className={classes.help}>
              Not sure how to do it?
              <a href="https://app.bokio.se/demo/bank" target="_blank"> Click here!</a>
            </div>
          }
        </div>

        {messageLevel <= 1 &&
          <div className={classes.dropzone}>
            <div>⌘</div>
            +
            <div>V</div>
          </div>
        }

        {messageLevel > 1 &&
          <div>
            <Bookkeeper
              confirm={() => this.confirm(current)}
              transaction={transactions[current]}
              bookstate={{current, rows, finished}}/>

            <div className={classes.header}>Current batch</div>

            <div className={classes.columnBox}>
              {columns.map((column, i) => {
                return <span className={classes.column} key={i}>{column}</span>
              })}
            </div>

            {transactions.map((transaction, i) => {
              return <Transaction specific={() => this.specific(i)} id={i} transaction={transaction} key={i} current={current}/>
            })}
          </div>
        }

        <History />

      </div>
    )
  }
}

export default Transactions