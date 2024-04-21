import useInput from '../hooks/use-input';

const inputIsNotEmpty = value => value.trim() !== '';
const inputIsEmail = value => value.includes('@');

const BasicForm = (props) => {
	const {
		value: enteredFirstName,
		isValid: firstNameIsValid,
		hasError: firstNameHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstNameInput
	} = useInput(inputIsNotEmpty);

	const {
		value: enteredLastName,
		isValid: lastNameIsValid,
		hasError: lastNameHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastNameInput
	} = useInput(inputIsNotEmpty);

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError:	emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput
	} = useInput(inputIsEmail);

	let formIsValid = false;

	if ( firstNameIsValid && lastNameIsValid && emailIsValid ) {
		formIsValid = true;
	} else {
		formIsValid = false;
	}

	const formSubmissionHandler = event => {
		event.preventDefault();

		console.log(enteredFirstName);
		console.log(enteredLastName);
		console.log(enteredEmail);

		resetFirstNameInput();
		resetLastNameInput();
		resetEmailInput();
	};

	const firstNameInputClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
	const lastNameInputClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
	const emailInputClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='firstName'>First Name</label>
          <input
						type='text'
						id='firstName'
						onChange={firstNameChangeHandler}
						onBlur={firstNameBlurHandler}
						value={enteredFirstName}
					/>
					{ firstNameHasError && <p className='error-text'>First name must not be empty.</p> }
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='lastName'>Last Name</label>
          <input
						type='text'
						id='lastName'
						onChange={lastNameChangeHandler}
						onBlur={lastNameBlurHandler}
						value={enteredLastName}
					/>
					{ lastNameHasError && <p className='error-text'>Last name must not be empty.</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
					type='text'
					id='email'
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{ emailHasError && <p className='error-text'>Email must include '@'.</p> }
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
