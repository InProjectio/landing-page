import React from 'react'
import freeTranning from 'images/free-training.png'
import uptime from 'images/uptime.png'
import security from 'images/security.png'
import linkedin from 'images/icons8-linkedin.svg'
import twitter from 'images/icons8-twitter.svg'
import facebook from 'images/icons8-facebook.svg'
import youtube from 'images/icons8-youtube_play_button.svg'
import logo from 'images/logo.png'
import classes from './Footer.module.scss'

const Footer = () => (
  <div className={classes.container}>
    <div className={classes.summaryWrapper}>
      <div className={classes.summary}>
        <div className={classes.col}>
          <img src={freeTranning} className={classes.icon} alt="icon" />
          <a>On-demand demo</a>
          &
          <a>24-hour support</a>
        </div>
        <div className={classes.col}>
          <img src={uptime} className={classes.icon} alt="icon" />
          <a>99.99% uptime</a>
          the last 12 months
        </div>
        <div className={classes.col}>
          <img src={security} className={classes.icon} alt="icon" />
          Serious about
          <a>security & privacy</a>
        </div>
      </div>
    </div>

    <div className={classes.content}>
      <img src={logo} className={classes.logo} alt="logo" />
      <div className={classes.right}>
        <div className={classes.socials}>
          <a className={classes.social}>
            <img src={linkedin} className={classes.icon} alt="icon" />
          </a>
          <a className={classes.social}>
            <img src={facebook} className={classes.icon} alt="icon" />
          </a>
          <a className={classes.social}>
            <img src={twitter} className={classes.icon} alt="icon" />
          </a>
          <a className={classes.social}>
            <img src={youtube} className={classes.icon} alt="icon" />
          </a>
        </div>
        <p className={classes.copyright}>
          © 2021, InProject All rights reserved.
        </p>
      </div>
    </div>
    <p className={classes.copyrightBottom}>
      © 2021, InProject All rights reserved.
    </p>

  </div>
)

export default Footer
