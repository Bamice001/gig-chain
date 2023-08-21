import React, { useState } from 'react'
import signup from "./signup.module.css";
import logo from "../../assets/logo.svg"
import google from "../../assets/google.svg"
import facebook from "../../assets/facebook.svg"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const INITIAL = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

const Signup = () => {
    const [form, setForm] = useState(INITIAL);
    const [errorUI, setErrorUI] = useState({});
    const [passVisible, setPassVisible] = useState(false);
    const navigate = useNavigate();

    const togglePassVisibility = () => {
        setPassVisible((prevVisisble) => !prevVisisble);
    };

    const VALIDATION = {
        firstName: [
          {
            isValid: (value) => !!value,
            message: "Is required.",
          },
          {
            isValid: (value) =>
              /^[^0-9]*[a-zA-Z][^0-9]*[a-zA-Z][^0-9]*[a-zA-Z][^0-9]*$/.test(value),
            message: "At least 2 alphabets, no numbers",
          },
        ],
        lastName: [
          {
            isValid: (value) => !!value,
            message: "Is required.",
          },
          {
            isValid: (value) =>
              /^[^0-9]*[a-zA-Z][^0-9]*[a-zA-Z][^0-9]*[a-zA-Z][^0-9]*$/.test(value),
            message: "At least 2 alphabets, no numbers",
          },
        ],
        email: [
          {
            isValid: (value) => !!value,
            message: "Is required.",
          },
          {
            isValid: (value) => /\S+@\S+\.\S+/.test(value),
            message: "Not an email.",
          },
        ],
    
        password: [
          {
            isValid: (value) => !!value,
            message: "Is required.",
          },
          {
            isValid: (value) =>
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value),
            message:
              "Requires 6+ characters, Uppercase, Lowercase letters, numeric digit (0-9) and a special character.",
          },
        ],
    }

    const getErrorFields = (form) =>
    Object.keys(form).reduce((acc, key) => {
      if (!VALIDATION[key]) return acc;

      const errorsPerField = VALIDATION[key]
        .map((validation) => ({
          isValid: validation.isValid(form[key]),
          message: validation.message,
        }))
        .filter((errorPerField) => !errorPerField.isValid);

      return { ...acc, [key]: errorsPerField };
    }, {});

    const handleChange = (e) => {
    const { id, value } = e.target;
    if (errorUI) setErrorUI({});
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log({ id, value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (form.confirmPassword !== form.password) {
          setErrorUI({ confirmPassword: [{ message: "Passwords do not match." }] });
          return;
        }
    
        const errorFields = getErrorFields(form);
        const hasErrors = Object.values(errorFields).flat().length > 0;
        if (hasErrors) return setErrorUI({ ...errorFields });
    
        setForm(INITIAL);
        console.log("Form submitted");
    }

  return (
    <div className={signup.signup_container}>
        <nav className={signup.signup_nav}>
            <img src={logo} alt="logo" style={{width: '145px', height: '37px'}}/>
        </nav>

        <div className={signup.signup_content}>
            <div className={signup.signup_left}>
                <div className={signup.left_header}>
                    <h2>JOIN FOR FREE</h2>
                    <h1>Create new Account</h1>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </div>
                <div className={signup.left_down}>
                    <div className={signup.left_continue}>
                        <p>Continue with</p>
                        <span></span>
                    </div>
                    <div className={signup.left_svgs}>
                        <img src={google} alt="google-icon" />
                        <img src={facebook} alt="facebook-icon" />
                    </div>
                </div>
                
            </div>

            <form action="/" onSubmit={handleSubmit} className={signup.signup_form}>
                <div className={signup.form_first}>
                    <input type="text" id="firstName" value={form.firstName} onChange={handleChange} placeholder='First name'/>
                    <p className={signup.error}>
                        {errorUI?.firstName?.length ? (
                            <span style={{ color: "red" }}>
                            {errorUI.firstName[0].message}
                            </span>
                        ) : null}
                    </p>
                    <input type="text" id="lastName" value={form.lastName} onChange={handleChange} placeholder='Last name'/>
                    <p className={signup.error}>
                        {errorUI?.lastName?.length ? (
                            <span style={{ color: "red" }}>
                            {errorUI.lastName[0].message}
                            </span>
                        ) : null}
                    </p>
                </div>
                <input type="email" id="email" value={form.email} onChange={handleChange} placeholder='Work Email'/>
                <p className={signup.error}>
                  {errorUI?.email?.length ? (
                    <span style={{ color: "red" }}>
                      {errorUI.email[0].message}
                    </span>
                  ) : null}
                </p>
                <div className={signup.pass_eye}>
                    <input type={passVisible ? 'text' : 'password'} id="password" value={form.password} onChange={handleChange} placeholder='Password'/>
                    {passVisible ? (<AiOutlineEye className={signup.passOpeneye} onClick={togglePassVisibility}/>) 
                    : (<AiOutlineEyeInvisible className={signup.passOpeneye} onClick={togglePassVisibility}/>)}
                    <p className={signup.error}>
                        {errorUI?.password?.length ? (
                            <span style={{ color: "red" }}>
                            {errorUI.password[0].message}
                            </span>
                        ) : null}
                    </p>
                </div>
                <div>
                    <input type="text" placeholder='Talent or Recruiter'/>
                </div>
                <div>
                    <input type="text" placeholder='Location'/>
                </div>
                
                <button className={signup.form_btn}>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Signup;