import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
	const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	const nameValidation = value => value.trim() !== '';
	const emailValidation = value => value.match(emailFormat);

	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput
	} = useInput(nameValidation);

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput
	} = useInput(emailValidation);

	let formIsValid = false;

	if ( enteredNameIsValid && enteredEmailIsValid ) {
		formIsValid = true;
	} else {
		formIsValid = false;
	}

	const formSubmissionHandler = event => {
		event.preventDefault();

		if ( !enteredNameIsValid || !enteredEmailIsValid) {
			return;
		}

		console.log(enteredName);
		console.log(enteredEmail);

		resetNameInput();
		resetEmailInput();
	}

	const nameInputClasses = nameHasError ? 'form-control invalid' : 'form-control';
	const emailInputClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
					type='text'
					id='name'
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
				/>
				{ nameHasError && <p className="error-text">Name must not be empty</p> }
      </div>
			<div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
					type='email'
					id='email'
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{ emailHasError && <p className="error-text">Email must be valid</p> }
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
