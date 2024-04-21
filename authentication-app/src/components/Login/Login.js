import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
	// action.type is set in the emailChangeHandler() and passed to emailReducer via dispatchEmail()
	if ( action.type === 'USER_INPUT' ) {
		return { value: action.val, isValid: action.val.includes('@') };
	}

	// different action.type set in validateEmailHandler()
	if ( action.type === 'INPUT_BLUR' ) {
		return { value: state.value, isValid: state.value.includes('@') };
	}

	// should only hit this return on initial run - all other runs will be triggered by dispatchEmail() and should contain a type value which means it falls into one of the above conditionals.
	return { value: '', isValid: false };
};

// Note: reducer functions exist outside of component. Everything it needs is being passed to it via dispatch function, so it can live outside of component.
const passwordReducer = (state, action) => {
	if ( action.type === 'USER_INPUT' ) {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}

	if ( action.type === 'INPUT_BLUR' ) {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}

	return { value: '', isValid: false };
};

const Login = (props) => {
	const authContext = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer( emailReducer, { value: '', isValid: null } );
	const [passwordState, dispatchPassword] = useReducer( passwordReducer, { value: '', isValid: null } );

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect( () => {
		const identifier = setTimeout( () => {
			setFormIsValid(
				emailIsValid && passwordIsValid
			);
		}, 500);

		return () => {
			clearTimeout(identifier);
		}
	}, [emailIsValid, passwordIsValid] );

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
