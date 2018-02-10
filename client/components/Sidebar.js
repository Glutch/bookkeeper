import React from 'react'
import injectSheet from 'react-jss'
import Skeleton from './Skeleton'
import style from '../style'

const skeletonWidths = Array(30).fill().map(() => (Math.random() * 60) + 40)

@injectSheet({
  sidebar: {
    width: 230,
    background: '#fff',
    position: 'fixed',
    left: 0,
    top: 66,
    bottom: 0,
    borderRight: '1px solid #e1e5e8',
    padding: 15,
    display: 'none',
    [style.DESKTOP]: {
      display: 'inherit'
    }
  }
})
class Sidebar extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.sidebar}>
        {skeletonWidths.map((width, i) =>
          <Skeleton key={i} width={width} />
        )}
      </div>
    )
  }
}

export default Sidebar