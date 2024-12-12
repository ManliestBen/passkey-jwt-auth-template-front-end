// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`

async function signup(signupFormData) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupFormData),
    })
    const json = await res.json()

    if (json.err) throw new Error(json.err)

    if (json.token) {
      tokenService.setToken(json.token)
    }
  } catch (err) {
    throw new Error(err)
  }
}

async function generateRegistrationOptions(registrationFormData) {
  try {
    const res = await fetch(`${BASE_URL}/generate-registration-options`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationFormData),
    })

    return res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function verifyRegistration(attestationData) {
  try {
    const res = await fetch(`${BASE_URL}/verify-registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attestationData),
    })
    const json = await res.json()
    if (json.err) throw new Error(json.err)
    if (json.token) {
      tokenService.setToken(json.token)
    }

  } catch (err) {
    throw new Error(err)
  }
}

async function generateAuthenticationOptions(authenticationFormData) {
  try {
    const res = await fetch(`${BASE_URL}/generate-authentication-options`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authenticationFormData),
    })

    return res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function verifyAuthentication(attestationData) {
  try {
    const res = await fetch(`${BASE_URL}/verify-authentication`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attestationData),
    })
    const json = await res.json()
    if (json.err) throw new Error(json.err)
    if (json.token) {
      tokenService.setToken(json.token)
    }

  } catch (err) {
    throw new Error(err)
  }
}

function getUser() {
  return tokenService.getUserFromToken()
}

function logout() {
  tokenService.removeToken()
}

async function login(loginFormData) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginFormData),
    })
    const json = await res.json()

    if (json.err) throw new Error(json.err)

    if (json.token) tokenService.setToken(json.token)
  } catch (err) {
    throw new Error(err)
  }
}

async function changePassword(changePasswordFormData) {
  try {
    const res = await fetch(`${BASE_URL}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(changePasswordFormData),
    })
    const json = await res.json()

    if (json.err) throw new Error(json.err)

    if (json.token) {
      tokenService.removeToken()
      tokenService.setToken(json.token)
    }
  } catch (err) {
    throw new Error(err)
  }
}

export { signup, getUser, logout, login, changePassword, generateRegistrationOptions, verifyRegistration, generateAuthenticationOptions, verifyAuthentication }
