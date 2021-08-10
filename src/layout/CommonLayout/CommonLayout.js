import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
// import * as Api from 'api/api'
import { injectSaga } from 'utils/injectSaga'
import * as storage from 'utils/storage'
import HomePage from 'pages/HomePage'
import GA from 'utils/GoogleAnalytics'
import {
  makeSelectConfirm,
  makeSelectNotification,
  makeSelectShowConfirm
} from './selectors'
import {
  handleHideConfirm,
  hideNotification,
  getToken,
} from './actions'
import classes from './CommonLayout.module.scss'
import Notification from '../../components/Notification'
import Confirm from '../../components/Confirm'

import saga from './saga'

const CommonLayout = ({
  notification,
  showConfirm,
  handleHideConfirm,
  confirm,
  hideNotification,
}) => {
  /**
   * listen when storage change and sync
   */

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if ((e.key === 'accessToken' && e.oldValue !== e.newValue)
      ) {
        location.reload()
      }

      if ((e.key === 'walletAddress' && e.oldValue !== e.newValue)
      ) {
        location.reload()
      }
    });
  }, [])

  /**
   * listen initial storage when open
   */
  useEffect(() => {
    storage.getAllStorage()
    window.addEventListener('message', messageHandler, false);
    function messageHandler(event) {
      const { action, key, value } = event.data
      if (action === 'returnData') {
        const oldAccessToken = localStorage.getItem('accessToken')
        if (key === 'getAllStorage') {
          localStorage.setItem('userInfo', value.userInfo)
          localStorage.setItem('accessToken', value.accessToken)
          if (value.companyId) {
            localStorage.setItem('companyId', value.companyId)
          }
          if (oldAccessToken !== value.accessToken) {
            location.reload()
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        hideNotification()
      }, 8000)
    }

    const handleClickOutside = () => {
      if (notification) {
        hideNotification()
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [notification])

  return (
    <div className={classes.container}>
      {
        notification
        && (
        <Fade
          top
          duration={500}
        >
          <div className={classes.notification}>
            <Notification notification={notification} />
          </div>
        </Fade>
        )
      }
      { GA.init() && <GA.RouteTracker /> }
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
      <Modal
        show={showConfirm}
        onHide={handleHideConfirm}
      >
        <Confirm
          handleClose={handleHideConfirm}
          confirmData={confirm}
        />
      </Modal>
    </div>
  )
}

const withSaga = injectSaga({ key: 'global', saga });

const ComposeCommonLayout = compose(withSaga)(CommonLayout)

const mapStateToProps = createStructuredSelector({
  showConfirm: makeSelectShowConfirm(),
  notification: makeSelectNotification(),
  confirm: makeSelectConfirm()
})

const mapDispatchToProps = {
  handleHideConfirm,
  hideNotification,
  getToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeCommonLayout)
