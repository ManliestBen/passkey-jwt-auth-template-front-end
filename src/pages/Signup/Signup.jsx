// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { startAuthentication, startRegistration } from '@simplewebauthn/browser'

// services
import * as authService from '../../services/authService'

// css
import styles from './Signup.module.css'

const Signup = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }


  const handleSubmit = async evt => {
    evt.preventDefault()
    let attestationResponse
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      const opts = await authService.generateRegistrationOptions(formData)
      console.log(opts)
      attestationResponse = await startRegistration({ optionsJSON: opts })
      console.log(attestationResponse)
      attestationResponse.webAuthId = opts.user.id
      const verificationResponse = await authService.verifyRegistration(attestationResponse)
      console.log(verificationResponse)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
      setIsSubmitted(false)
    }
  }

  const { name, email } = formData

  const isFormInvalid = () => {
    return !(name && email)
  }

  return (
    <main className={styles.container}>
      <h1>Sign Up</h1>
      <p className={styles.message}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name
          <input type="text" value={name} name="name" onChange={handleChange} autoComplete='name webauthn'/>
        </label>
        <label className={styles.label}>
          Email
          <input
            type="text"
            value={email}
            name="email"
            autoComplete='email webauthn'
            onChange={handleChange}
          />
        </label>
        
        <div>
          <Link to="/">Cancel</Link>
          <button
            className={styles.button}
            disabled={ isFormInvalid() || isSubmitted }
          >
            {!isSubmitted ? 'Sign Up' : '🚀 Sending...'}
          </button>
        </div>
      </form>
    </main>
  )
}

export default Signup
