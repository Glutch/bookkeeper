import React from 'react'
import injectSheet from 'react-jss'
import style from '../../style'

@injectSheet({
  bookkeeper: {
    border: '2px solid #eaeaea',
    padding: '20px 15px',
    textAlign: 'center',
    borderRadius: 5,
    margin: 'auto',
    clear: 'both',
    display: 'table',
    transition: '.5s',
    width: '100%',
    [style.DESKTOP]: {
      width: 400,
    }
  },
  page: {
    color: '#c8c8c8',
    fontSize: 20,
    marginBottom: 20
  },
  date: {
    color: '#939393',
    fontSize: 20
  },
  title: {
    color: '#292929',
    fontSize: 30
  },
  value: {
    color: '#2a2a2a',
    fontSize: 40,
    margin: '20px 0px'
  },
  button: {
    width: 'calc(50% - 10px)',
    height: 48,
    borderRadius: 3,
    textAlign: 'center',
    lineHeight: '48px',
    border: '2px solid #eaeaea',
    float: 'left',
    margin: '0px 5px',
    cursor: 'pointer',
    userSelect: 'none'
  },
  category: {
    extend: 'button',
    color: '#868686'
  },
  confirm: {
    extend: 'button',
    background: '#28cdaa',
    border: '2px solid #28cdaa',
    color: '#fff'
  },
  completed: {
    extend: 'bookkeeper',
    border: '2px solid #28cdaa',
    width: 354,
    height: 302,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    '& span': {
      fontSize: 20,
      color: '#999'
    }
  },
  goodjob: {
    fontSize: 34,
  }
})
class Bookkeeper extends React.Component {
  render() {
    const { classes, transaction, confirm, bookstate } = this.props
    return (
      <div className={bookstate.finished ? classes.completed : classes.bookkeeper}>
        {bookstate.finished ?
          <div>
            <div className={classes.goodjob}>Good job!</div>
            <span>All tasks completed</span>
          </div>
          :
          <div>
            <div className={classes.page}>{bookstate.current + 1} / {bookstate.rows}</div>
            <div className={classes.title}>{transaction.Text}</div>
            <div className={classes.date}>{transaction.Transaktionsdatum}</div>
            <div className={classes.value}>{transaction.Belopp}</div>
            <div>
              <div className={classes.category}>Food</div>
              <div className={classes.confirm} onClick={() => confirm(bookstate.current)}>Confirm</div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Bookkeeper