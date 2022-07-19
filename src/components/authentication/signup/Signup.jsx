import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  "../../../styles/authentication/Login.css"
import { TogglePasswordDisplay } from "./../../index-components"

const Signup = () => {
    const [formData, setFormaData] = useState({})
    const [error, setError] = useState({})
    const [noValuesError, setNoValuesError] = useState("")
  const navigate = useNavigate()
  const validateEmail =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 
  const loginClickHandler = () => {
    const condition = Object.keys(formData).length === 5 && Object.values(error).every((item) => item === "") 
    if(condition){
      navigate("/")
    }
    else if(Object.values(formData).length === 0){
      setNoValuesError(() => "Please fill all the details")
    }
  }
  const firstNameHandler = (e, condition, msg) => {
    const { name, value } = e.target
    setFormaData((prev) => ({...prev, [name]: value}))
    noValuesError && setNoValuesError(() => "")
    if(name === "confirmPassword"){
      if(formData.password === e.target.value){
        setError((prev) => ({...prev, [name]:""}))
      }
      else {
        setError((prev) => ({...prev, [name]:msg}))
      }
    }
    else if(condition){
      setError((prev) => ({...prev, [name]:msg}))
    }
    else {
      setError((prev) => ({...prev, [name]:""}))
    }
  }
  return (
    <main className = "login-wrapper bg-color" data-testid = "signup-form">
        <div className = "flex column align-center login-header-wrapper">
          <h2>Signup</h2>
          <p>We do not share your personal details with anyone</p>
        </div>
        <form className = "flex column align-center login-form-wrapper signup-form-wrapper" onSubmit={(e) => e.preventDefault()}>
        {noValuesError && <p className = "error-message" data-testid = "default-error"><span className = "warning-sign">&#9888;</span> {noValuesError}</p>}
            <p>All fields marked with an asterisk(*) are required</p>
            <label htmlFor = "first-name" className = "login-input">
                <p>First Name<span aria-hidden = "true" className = "error-message">*</span></p>
                <input type = "text" data-testid = "first-name" id = "first-name" name = "firstName"className = "login-form-input" onChange = {(e) => firstNameHandler(e, e.target.value.length < 3 || e.target.value[0]=== " ", "Enter valid first name")} required/>
            </label>
            {error?.firstName && <p className = "error-message" data-testid = "firstName-error"><span className = "warning-sign">&#9888;</span> {error?.firstName}</p>}

            <label htmlFor = "last-name" className = "login-input">
                <p>Last Name<span aria-hidden = "true" className = "error-message">*</span></p>
                <input type = "text" data-testid = "last-name" id = "last-name"name = "lastName" className = "login-form-input" onChange = {(e) => firstNameHandler(e, e.target.value.length < 3 || e.target.value[0]=== " ", "Enter valid last name")} required/>
            </label>
            {error?.lastName && <p className = "error-message" data-testid = "lastName-error"><span className = "warning-sign">&#9888;</span> {error?.lastName}</p>}

            <label htmlFor = "email" className = "login-input">
                <p>Email<span aria-hidden = "true" className = "error-message">*</span></p>
                <input type = "email" data-testid = "email" id = "email" name = "email"className = "login-form-input" onChange = {(e) => firstNameHandler(e, !validateEmail.test(e.target.value), "Please enter a valid email")} required/>
            </label>
            {error?.email && <p className = "error-message" data-testid = "email-error"><span className = "warning-sign">&#9888;</span> {error?.email}</p>}

            <label htmlFor = "password" className = "login-input relative">
                <p>Password<span aria-hidden = "true" className = "error-message">*</span></p>
                <TogglePasswordDisplay  id = {"password"}  name = "password" firstNameHandler = {firstNameHandler} errorMsg = "Password must contain one character and a number and at least six characters with no space"/>
            </label>
            {error?.password && <p className = "error-message" data-testid = "pwd-error"><span className = "warning-sign">&#9888;</span> {error?.password}</p>}

            <label htmlFor = "confirm-password" className = "login-input">
                <p>Confirm Password<span aria-hidden = "true" className = "error-message">*</span></p>
                <TogglePasswordDisplay  id = {"confirm-password"}  name = "confirmPassword" firstNameHandler = {firstNameHandler} errorMsg = "Passwords should match"/>
            </label>
            {error?.confirmPassword && <p className = "error-message" data-testid = "cfPwd-error"><span className = "warning-sign">&#9888;</span> {error?.confirmPassword}</p>}

            <button className = "btn login-form-btn signup-form-btn" onClick = { loginClickHandler}>Signup</button>

        </form>
    </main>
  )
}

export default Signup