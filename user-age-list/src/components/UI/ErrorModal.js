import React from 'react';
import ReactDOM from 'react-dom';

import Card from './Card';
import Button from './Button';
import classes from './ErrorModal.module.css';

const Backdrop = props => {
	return <div className={classes.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = props => {
	return (
		<Card className={classes.modal}>
			<header className={classes.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={classes.content}>
				<p>{props.message}</p>
			</div>
			<footer className={classes.actions}>
				<Button onClick={props.onConfirm}>Okay</Button>
			</footer>
		</Card>
	);
}

const ErrorModal = (props) => {
  return (
    <>
			{
				// Ports the Backdrop element to div#backdrop-root in public/index.html
				// Takes two methods
				// 1. The node that should be rendered (takes JSX)
				// 2. Pointer to container in real DOM where we should render this element
				ReactDOM.createPortal(
					<Backdrop onConfirm={props.onConfirm} />,
					document.getElementById('backdrop-root')
				)
			}
			{
				// Ports the ModalOverlay element to div#modal-root in public/index.html
				// Repeat for the modal card
				ReactDOM.createPortal(
					<ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} />,
					document.getElementById('modal-root')
				)
			}
    </>
  );
};

export default ErrorModal;
