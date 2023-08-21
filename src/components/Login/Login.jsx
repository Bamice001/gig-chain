import React, { useState } from 'react'
import login from "./login.module.css";
import logo from "../../assets/logo.svg"
import google from "../../assets/google.svg"
import facebook from "../../assets/facebook.svg"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const INITIAL = {
    email: "",
    password: "",
};

const Login = () => {
    const [form, setForm] = useState(INITIAL);
    const [errorUI, setErrorUI] = useState({});
    const [passVisible, setPassVisible] = useState(false);

    const togglePassVisibility = () => {
        setPassVisible((prevVisisble) => !prevVisisble);
    };

    const VALIDATION = {
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
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value),
              message:
                "Requires 6+ characters, Uppercase, Lowercase letters, numeric digit (0-9) and a special character.",
            },
        ],
    };

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
        const errorFields = getErrorFields(form);
        const hasErrors = Object.values(errorFields).flat().length > 0;
        if (hasErrors) return setErrorUI({ ...errorFields });
    
        setForm(INITIAL);
        // setLoading(true);
        console.log("Form submitted");
    }

  return (
    <div className={login.login_container}>
        <nav className={login.login_nav}>
            <img src={logo} alt="logo" style={{width: '145px', height: '37px'}}/>
        </nav>

        <div className={login.login_content}>
            <div className={login.login_left}>
                <div className={login.left_header}>
                    <h2>SIGN IN</h2>
                    <h1>Log in to your Account</h1>
                    <p>Don't have an account yet? <Link to='/'>Sign Up</Link></p>
                </div>
                <div className={login.left_down}>
                    <div className={login.left_continue}>
                        <p>Continue with</p>
                        <span></span>
                    </div>
                    <div className={login.left_svgs}>
                        <img src={google} alt="google-icon" />
                        <img src={facebook} alt="facebook-icon" />
                    </div>
                </div>
                
            </div>

            <form action="/" onSubmit={handleSubmit} className={login.login_form}>                
                <input type="email" id="email" value={form.email} onChange={handleChange} placeholder='Email'/>
                <p className={login.error}>
                    {errorUI?.email?.length ? (
                        <span style={{ color: "red" }}>
                        {errorUI.email[0].message}
                        </span>
                    ) : null}
                </p>
                <div className={login.pass_eye}>
                    <input type={passVisible ? 'text' : 'password'} id="password" value={form.password} onChange={handleChange} placeholder='Password'/>
                    {passVisible ? (<AiOutlineEye className={login.passOpeneye} onClick={togglePassVisibility}/>) 
                    : (<AiOutlineEyeInvisible className={login.passOpeneye} onClick={togglePassVisibility}/>)}
                    <p className={login.error}>
                        {errorUI?.password?.length ? (
                            <span style={{ color: "red" }}>
                            {errorUI.password[0].message}
                            </span>
                        ) : null}
                    </p>
                </div>                
                <button className={login.form_btn}>Log in</button>
            </form>
        </div>
    </div>
  )
}

export default Login