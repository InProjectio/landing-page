import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import logo from 'images/logo.png'
import history from 'utils/history'
import Dropdown from 'components/Dropdown'
import closeIcon from 'images/close.svg'
import menu from 'images/menu.svg'
import menuWhite from 'images/menu-white.svg'
import Avatar from './Avatar'
import classes from './UserHeader.module.scss'

const UserHeader = (props) => {
  const {
    showPopup,
    closePopup,
  } = props
  const navBarRef = useRef(null)
  const [isLoggedIn] = useState(localStorage.getItem('accessToken'))
  const [userInfo] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {})
  const popupRef = useRef(null)
  const [showMenuMobile, setShowMenuMobile] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e) => {
      // console.log(popupRef.current && popupRef.current.contains(e.target), e.target, showPopup)
      if (popupRef && popupRef.current && !popupRef.current.contains(e.target) && showPopup) {
        closePopup()
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPopup])

  const handleLogout = () => {
    localStorage.clear()
    history.push('/auth/login')
  }

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    if (scrollTop > 20) {
      navBarRef.current.classList.add(classes.containerWithScroll)
    } else {
      navBarRef.current.classList.remove(classes.containerWithScroll)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={classes.container}
      ref={navBarRef}
    >
      <div className={classes.content}>
        <div className={classes.left}>
          <NavLink to="/">
            <div className={classes.logoWrapper}>
              <img src={logo} className={classes.logo} alt="logo" />
            </div>
          </NavLink>
        </div>
        <div className={classes.menus}>
          <a
            href="#about"
            className={classes.menu}
          >
            <FormattedMessage
              id="UserHeader.about"
              defaultMessage="About"
            />
          </a>
          <a
            href="#features"
            className={classes.menu}
          >
            <FormattedMessage
              id="UserHeader.features"
              defaultMessage="Features"
            />
          </a>
          <a
            href="#contact"
            className={classes.menu}
          >
            <FormattedMessage
              id="UserHeader.contact"
              defaultMessage="Contact"
            />
          </a>

          <div className={classes.right}>
            {isLoggedIn
              ? (
                <Dropdown
                  mainComponent={(
                    <div className={classes.userName}>
                      <p className={classes.name}>
                        {userInfo.fullname || userInfo.username}
                      </p>
                      <Avatar avatar={userInfo.avatar_url} />

                    </div>
                  )}
                  childrenComponent={() => (
                    <div className={classes.dropdownMenu}>
                      <Link className={classes.dropdownMenuItem} to="/home">
                        Dashboard
                      </Link>
                      <div
                        className={classes.dropdownMenuItem}
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </div>
                  )}
                />
              )
              : (
                <div className={classes.actions}>
                  <a
                    className={classNames(classes.btn)}
                    onClick={() => {
                      location.href = 'https://app.inproject.io/auth/login'
                    }}
                  >
                    <FormattedMessage
                      id="UserHeader.login"
                      defaultMessage="Login"
                    />
                  </a>
                  <a
                    onClick={() => {
                      location.href = 'https://app.inproject.io/auth/register'
                    }}
                    className={classNames('btn btnSmall btnMain', classes.btnRegister)}
                  >
                    <FormattedMessage
                      id="UserHeader.register"
                      defaultMessage="Sign up"
                    />
                  </a>
                </div>
              )}

          </div>

        </div>
      </div>

      <div
        className={classes.btnMenuMobile}
        onClick={() => {
          setShowMenuMobile(true)
        }}
      >
        <img src={menu} className={classes.menuIcon} alt="menuIcon" />
        <img src={menuWhite} className={classes.menuIconWhite} alt="menuIcon" />
      </div>

      <div className={classNames(classes.menuMobile, showMenuMobile && classes.showMenuMobile)}>
        <div
          className={classes.btnClose}
          onClick={() => {
            setShowMenuMobile(false)
          }}
        >
          <img src={closeIcon} className={classes.closeIcon} alt="close" />
        </div>
        <a
          href="#about"
          className={classes.menu}
          onClick={() => {
            setShowMenuMobile(false)
          }}
        >
          <FormattedMessage
            id="UserHeader.about"
            defaultMessage="About"
          />
        </a>
        <a
          href="#features"
          className={classes.menu}
          onClick={() => {
            setShowMenuMobile(false)
          }}
        >
          <FormattedMessage
            id="UserHeader.features"
            defaultMessage="Features"
          />
        </a>
        <a
          href="#contact"
          className={classes.menu}
          onClick={() => {
            setShowMenuMobile(false)
          }}
        >
          <FormattedMessage
            id="UserHeader.contact"
            defaultMessage="Contact"
          />
        </a>
        <a
          className={classNames(classes.btn)}
          onClick={() => {
            location.href = 'https://app.inproject.io/auth/login'
          }}
        >
          <FormattedMessage
            id="UserHeader.login"
            defaultMessage="Login"
          />
        </a>
        <a
          onClick={() => {
            location.href = 'https://app.inproject.io/auth/register'
          }}
          className={classNames('btn btnSmall btnMain', classes.btnRegister)}
        >
          <FormattedMessage
            id="UserHeader.register"
            defaultMessage="Sign up"
          />
        </a>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader)
