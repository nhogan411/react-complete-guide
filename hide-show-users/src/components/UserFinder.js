import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
	constructor() {
		super();
		this.state = {
			filteredUsers: DUMMY_USERS,
			searchTerm: ''
		}
	}

	// Example of componentDidMount method
	// Pretend DUMMY_USERS not set and pulling from a DB
	componentDidMount() {
		// send an http request and set DUMMY_USERS

		this.setState({ filteredUsers: DUMMY_USERS });
	}

	// Runs whenever state or property changes
	componentDidUpdate(prevProps, prevState) {
		// Only update state.filteredUsers if state.searchTerm has changed, without this conditional we're creating an infinite loop
		if ( prevState.searchTerm !== this.state.searchTerm ) {
			this.setState({
				filteredUsers: DUMMY_USERS.filter((user) => user.name.includes(this.state.searchTerm)),
			});
		}
	}

	searchChangeHandler(event) {
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		return (
			<Fragment>
				<div className={classes.finder}>
					<input type='search' onChange={this.searchChangeHandler.bind(this)} />
				</div>
				<Users users={this.state.filteredUsers} />
			</Fragment>
		);
	}
}



export default UserFinder;
