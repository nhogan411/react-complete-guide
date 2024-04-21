import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component {
	constructor() {
		super(); // this is needed when we extend another class

		this.state = {
			showUsers: true,
		}
	}

	toggleUsersHandler() {
		// this is the correct way to update state based on prevState
		this.setState( (curState) => {
			return { showUsers: !curState.showUsers };
		});
	}

	render() {
		const usersList = (
			<ul>
				{this.props.users.map((user) => (
					<User key={user.id} name={user.name} />
				))}
			</ul>
		);

		return (
			<div className={classes.users}>
				<button onClick={this.toggleUsersHandler.bind(this)}>
					{this.state.showUsers ? 'Hide' : 'Show'} Users
				</button>
				{this.state.showUsers && usersList}
			</div>
		);
	}
}

export default Users;
