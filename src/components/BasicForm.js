//Jol mukodik!!!

import { useEffect, useState } from "react";
import useInput from "../hooks/use-input-withReducer";

const isNotEmpty = value => value.trim() !== '';
const isEmail = value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);

const BasicForm = (props) => {
    const [formValid, setFormValid] = useState(false)

    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        inputChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        hasError: firstNameHasError,
        reset: firstNameReset,
    } = useInput(isNotEmpty)

    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        inputChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        hasError: lastNameHasError,
        reset: lastNameReset,
    } = useInput(isNotEmpty)

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailHasError,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useInput(isEmail);
    
    useEffect(() => {
        if (firstNameIsValid && lastNameIsValid && emailIsValid) {
            setFormValid(true);
        }
        return () => setFormValid(false)
    }, [firstNameIsValid, lastNameIsValid, emailIsValid])


    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (!formValid) {
            return;
        }

        firstNameReset();
        lastNameReset();
        emailReset();
    };

    const firstNameClassNames = firstNameHasError ? "form-control invalid" : "form-control";
    const lastNameClassNames = lastNameHasError ? "form-control invalid" : "form-control";
    const emailClassNames = emailHasError ? "form-control invalid" : "form-control";
    
    return (
        <form onSubmit={formSubmitHandler}>
            <div className='control-group'>
                <div className={firstNameClassNames}>
                    <label htmlFor='firstname'>First Name</label>
                    <input 
                        type='text' 
                        id='firstname'
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler} 
                        value={firstNameValue}
                    />
                    {firstNameHasError && <p className="error-text">Invalid First Name.</p>}
                </div>
                <div className={lastNameClassNames}>
                    <label htmlFor='lastname'>Last Name</label>
                    <input
                        type='text'
                        id='lastname'
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        value={lastNameValue}
                    />
                    {lastNameHasError && <p className="error-text">Invalid Last Name.</p>}
                </div>
            </div>
            <div className={emailClassNames}>
                <label htmlFor='email'>E-Mail Address</label>
                <input
                    type='email'
                    id='email'
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    value={enteredEmail}
                />
                {emailHasError && (
                    <p className='error-text'>Invalid email.</p>
                )}
            </div>
            <div className='form-actions'>
                <button disabled={!formValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;