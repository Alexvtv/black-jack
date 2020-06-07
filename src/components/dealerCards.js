import React, { Component } from "react";

class DealerCards extends Component {
	constructor() {
    	super();
    	this.state = {
    	}
    }

	addCards = () => {
		console.log('dealerfunc');
		while(this.props.sumOfDealer() < 17) {
			this.props.addDealerCards();
		}

	}

	render() {
		if(this.props.stepOfDealer == true) {
			this.addCards();
		}
		const { numbersOfCards, cards } = this.props;
		const listOfCards = numbersOfCards.map(item => {
			return (
				<img className='card' src={cards[item].link}
					key={cards[item].id}
				/>
			)
		}) 
	       	return (
	       		<div className='dealer-cards'>
	       			{ listOfCards }
	       			<div className='dealer-total'><p>{ this.props.sumOfDealer() }</p></div>
	       		</div>
	       );
	}

}

export default DealerCards;