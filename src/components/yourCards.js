import React, { Component } from "react";

class YourCards extends Component {
	constructor() {
    	super();
    	this.state = {
    	}
    }

    addCard = () => {
    	let { gameIsActive, addCard, sumOfPlayer, sumOfPlayerSplit, stepOfDealer, distributionStop, splitStep } = this.props;
    	if (gameIsActive == true) {
			if((sumOfPlayer() < 21) && (splitStep == false) && (stepOfDealer == false)) {
				addCard();
				if(sumOfPlayer() > 20) {
					distributionStop();
				}
			} else if ((splitStep == true) && (sumOfPlayerSplit() < 21) && (stepOfDealer == false)) {
				addCard();
				if(sumOfPlayerSplit() > 20) {
					distributionStop();
				}
			} else {
        	    distributionStop();
			}
		}
	}

	double = () => {
		let { bet, balance, splitStep, sumOfPlayer, sumOfPlayerSplit, double, distributionStop } = this.props;
		if (balance >= (bet*2)) {
			if ((splitStep == false) && (sumOfPlayer() < 21)) {
				double();
				this.addCard();
				distributionStop();
			} else if ((splitStep == true) && (sumOfPlayerSplit() < 21)) {
				double();
				this.addCard();
				distributionStop();
			}
		}
	}

	render() {

		const floatLeft = {
			float: 'left'
		}
		const floatRight = {
			float: 'right'
		}
		const activeCard = {
			border: '2px solid #008514'
		}
		const passiveCard = {
			width: '35px',
			height: '55px'
		}
		const hidden = {
			display: 'none'
		}

		if(!localStorage.getItem('money')) {
			localStorage.setItem('money', 10000)
		}
		const { splitStep, numbersOfCards, cards, splitCards } = this.props;
		const listOfCards = [...splitCards, ...numbersOfCards].map(item => {
			if(splitCards.length > 0) {
				return (
					<img className='card' 
						style={Object.assign(((splitStep && (splitCards.indexOf(cards[item].id) !== -1)) || (!splitStep && (splitCards.indexOf(cards[item].id) == -1)) ? activeCard : passiveCard), ((splitCards.indexOf(cards[item].id) == -1) ? floatRight : floatLeft)) }
						src={cards[item].link}
						key={cards[item].id}
					/>
				)
			} else {
				return (
					<img className='card' 
						src={cards[item].link}
						key={cards[item].id}
					/>
				)
			}
		}); 

	    return (
	    	<div className='your-cards'>
	    		{ listOfCards }
	    		<div className='player-total'><p>{ this.props.sumOfPlayer() }</p></div>
	    		<div className='total-split' style={ (splitCards.length == 0) ? hidden : {} }><p>{ this.props.sumOfPlayerSplit() }</p></div>
	    		<div className='gameButtons'>
	    			<button className='add-button' onClick={this.addCard}>+ карта</button><button className='cancel-button' onClick={this.props.distributionStop}>стоп</button><button className='split-button' onClick={this.props.split}>сплит</button><button className='add-button' onClick={this.double}>удвоить</button>
	    		</div>
	    	</div>
	    );
	}

}
export default YourCards;