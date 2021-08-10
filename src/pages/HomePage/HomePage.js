import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import planingBanner from 'images/task-view-checklist.png'
import classNames from 'classnames'
import classes from './HomePage.module.scss'
import UserHeader from './UserHeader'
import Features from './Features'
import Contact from './Contact'
import Footer from './Footer'

const HomePage = () => {
  const [email, setEmail] = useState('')
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <UserHeader />
      </div>
      <div
        className={classes.wrapper}
        id="about"
      >
        <div className={classes.content}>
          <p className={classes.title}>
            <FormattedMessage
              id="Planning.title"
              defaultMessage="The first Project Management and Auction with Blockchain integration"
            />
          </p>
          <p className={classes.description}>
            <FormattedMessage
              id="Planning.description"
              defaultMessage="All your work in one place: tasks, biddings, docs, chat, goals, & more."
            />
          </p>
          <div className={classes.enterEmailWrapper}>
            <input
              className={classes.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className={classes.row}>
            <a
              className={classNames('btn btnMain btnLarge', classes.getStarted)}
              onClick={() => {
                location.href = `https://app.inproject.io/auth/register/?email=${email}`
              }}
            >
              <FormattedMessage
                id="Planning.getStarted"
                defaultMessage="Get Started"
              />
            </a>
            <p className={classes.note}>
              Free forever.
              <br />
              No Credit Card.
            </p>
          </div>

        </div>
        <div className={classes.right}>
          <div className={classes.banner}>
            <img src={planingBanner} className={classes.planingBanner} alt="banner" />
          </div>
        </div>

      </div>

      <Features />

      <Contact />

      <Footer />
    </div>
  )
}

export default HomePage
