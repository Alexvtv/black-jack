import React, { Component } from "react";

class BetPlace extends Component {
	constructor() {
    	super();
    	this.state = {
    		input: ''
    	}
    }

    clearBet = () => {
    	this.props.initialDistribution();
    	this.props.gameIsActive == false ? this.setState({ input: '' }) : {}
    }

	valueChange = event => {
		this.setState({ input: event.target.value });
		this.props.setBet(this.state.input);
	}

	render() {
		const { input } = this.state;
	    return (
	    	<form>
	       		<input type='number' 
	       			value={ input }
    				onChange={this.valueChange}
	       		/>
	       		<input type='button' value='играть'onClick={ this.clearBet } />
	       	</form>
	    );
	}

}

export default BetPlace;