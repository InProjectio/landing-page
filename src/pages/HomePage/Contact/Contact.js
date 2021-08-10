import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validateEmail } from 'utils/validators'
import InputField from 'components/InputField'
import TextAreaField from 'components/TextAreaField'
import Button from 'components/Button'
import * as Api from 'api/api'
import { useDispatch } from 'react-redux'
import { showNotification } from 'layout/CommonLayout/actions'
import classes from './Contact.module.scss'

const Contact = ({ handleSubmit }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleSendContact = async (values) => {
    try {
      setLoading(true)
      await Api.post({
        url: '/user/contact',
        data: values
      })
      dispatch(showNotification({
        type: 'SUCCESS',
        message: 'Submit contact successfully'
      }))
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <div
      className={classes.container}
      id="contact"
    >
      <div className={classes.content}>
        <div className={classes.left}>
          <p className={classes.title}>
            Got questions?
          </p>
          <div className={classes.divider} />
          <p className={classes.description}>
            Customer support is our highest priority. We&apos;re here to answer all your questions via our Support Docs, Video Demos, and 24/7 Live Chat.
          </p>
        </div>
        <div className={classes.right}>
          <form
            className={classes.form}
            onSubmit={handleSubmit(handleSendContact)}
          >
            <p className={classes.formTitle}>
              Get in Touch
            </p>
            <Field
              name="fullname"
              component={InputField}
              label="Full name"
            />
            <div className={classes.row}>
              <div className={classes.col}>
                <Field
                  name="email"
                  component={InputField}
                  label="Email"
                />
              </div>
              <div className={classes.col}>
                <Field
                  name="phone"
                  component={InputField}
                  label="Phone number"
                  inputType="number"
                />
              </div>
            </div>

            <Field
              name="message"
              component={TextAreaField}
              label="Message"
            />
            <Button
              className="btn btnMain w100 btnLarge"
              type="submit"
              loading={loading}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.fullname) {
    errors.fullname = 'Please enter full name'
  }

  if (!values.email) {
    errors.email = 'Please enter email'
  } else if (!validateEmail(values.email)) {
    errors.email = 'Please enter valid email'
  }

  if (!values.message || !values.message.trim()) {
    errors.message = 'Please enter message'
  }

  return errors
}

export default reduxForm({
  form: 'Contact',
  validate
})(Contact)
