import React, { useState } from 'react'
import image from 'images/task-view-checklist.png'
import classNames from 'classnames'
import arrowIcon from 'images/arrow-left-big.svg'
import classes from './Features.module.scss'

const FEATURES = [{
  label: 'TO-DO LISTS',
  image
}, {
  label: 'PROJECT MANAGEMENT',
  image
}, {
  label: 'BIDDING AND AUCTION',
  image
}, {
  label: 'COMPANY MANAGEMENT',
  image
}, {
  label: 'REALTIME CHAT',
  image
}, {
  label: 'NOTIFICATION',
  image
}, {
  label: 'EMAIL',
  image
}, {
  label: 'SMART CONTRACT',
  image
}]

const Features = () => {
  const [currentFeature, setCurrentFeature] = useState(0)

  return (
    <div
      className={classes.container}
      id="features"
    >
      <div className={classes.row}>
        <div className={classes.left}>
          <p className={classes.label}>
            FEATURES
          </p>
          <h2 className={classes.title}>
            This is the future of work.
          </h2>
          <div className={classes.divider} />

          { FEATURES.map((item, i) => (
            <div
              key={i}
              className={classNames(classes.feature, i === currentFeature && classes.active)}
              onClick={() => {
                setCurrentFeature(i)
              }}
            >
              <span className={classes.number}>
                0
                { i + 1}
              </span>
              <span>
                { item.label }
              </span>
            </div>
          )) }
        </div>
        <div className={classes.right}>
          <div className={classes.imageWrapper}>
            <img src={FEATURES[currentFeature]?.image} className={classes.image} alt="img" />
            <div className={classes.currentFeature}>
              {FEATURES[currentFeature]?.label}
            </div>
          </div>
        </div>
      </div>
      <div className={classNames(classes.row, classes.bottom)}>
        <div className={classes.left}>
          <a
            className={classNames(classes.btnGetStarted, 'btn btnLarge btnMain')}
            onClick={() => {
              location.href = 'https://app.inproject.io/auth/register'
            }}
          >
            Get started
          </a>
        </div>
        <div className={classes.right}>
          <div className={classes.dots}>
            { FEATURES.map((item, i) => (
              <div
                className={classNames(classes.dot, currentFeature === i && classes.dotActive)}
                onClick={() => {
                  setCurrentFeature(i)
                }}
                key={i}
              />
            )) }
          </div>
        </div>
        <div className={classes.actions}>
          <a
            className={classes.btn}
            onClick={() => {
              setCurrentFeature((prev) => (
                prev === 0 ? FEATURES.length - 1 : prev - 1
              ))
            }}
          >
            <img src={arrowIcon} className={classes.arrowIcon} alt="arrow" />
          </a>
          <a
            className={classNames(classes.btn, classes.btnNext)}
            onClick={() => {
              setCurrentFeature((prev) => (
                prev === FEATURES.length - 1 ? 0 : prev + 1
              ))
            }}
          >
            <img src={arrowIcon} className={classes.arrowIcon} alt="arrow" />
          </a>
        </div>

      </div>
    </div>
  )
}

export default Features
