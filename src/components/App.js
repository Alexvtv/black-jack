import React, { Component } from "react";
import '../scss/style.scss';

import YourCards from './yourCards.js';
import DealerCards from './dealerCards.js';
import BetPlace from './betPlace.js';

class App extends Component {
    constructor() {
    	super();
    	this.state = {
    		cards: [
    			{value: '11', id: 0, link: '/images/cards/card1.png'},
    			{value: '2', id: 1, link: '/images/cards/card2.png'},
    			{value: '3', id: 2, link: '/images/cards/card3.png'},
    			{value: '4', id: 3, link: '/images/cards/card4.png'},
    			{value: '5', id: 4, link: '/images/cards/card5.png'},
    			{value: '6', id: 5, link: '/images/cards/card6.png'},
    			{value: '7', id: 6, link: '/images/cards/card7.png'},
    			{value: '8', id: 7, link: '/images/cards/card8.png'},
    			{value: '9', id: 8, link: '/images/cards/card9.png'},
    			{value: '10', id: 9, link: '/images/cards/card10.png'},
    			{value: '10', id: 10, link: '/images/cards/card11.png'},
    			{value: '10', id: 11, link: '/images/cards/card12.png'},
    			{value: '10', id: 12, link: '/images/cards/card13.png'},
    			{value: '11', id: 13, link: '/images/cards/card01.png'},
    			{value: '2', id: 14, link: '/images/cards/card02.png'},
    			{value: '3', id: 15, link: '/images/cards/card03.png'},
    			{value: '4', id: 16, link: '/images/cards/card04.png'},
    			{value: '5', id: 17, link: '/images/cards/card05.png'},
    			{value: '6', id: 18, link: '/images/cards/card06.png'},
    			{value: '7', id: 19, link: '/images/cards/card07.png'},
    			{value: '8', id: 20, link: '/images/cards/card08.png'},
    			{value: '9', id: 21, link: '/images/cards/card09.png'},
    			{value: '10', id: 22, link: '/images/cards/card010.png'},
    			{value: '10', id: 23, link: '/images/cards/card011.png'},
    			{value: '10', id: 24, link: '/images/cards/card012.png'},
    			{value: '10', id: 25, link: '/images/cards/card013.png'},
    			{value: '11', id: 26, link: '/images/cards/card001.png'},
    			{value: '2', id: 27, link: '/images/cards/card002.png'},
    			{value: '3', id: 28, link: '/images/cards/card003.png'},
    			{value: '4', id: 29, link: '/images/cards/card004.png'},
    			{value: '5', id: 30, link: '/images/cards/card005.png'},
    			{value: '6', id: 31, link: '/images/cards/card006.png'},
    			{value: '7', id: 32, link: '/images/cards/card007.png'},
    			{value: '8', id: 33, link: '/images/cards/card008.png'},
    			{value: '9', id: 34, link: '/images/cards/card009.png'},
    			{value: '10', id: 35, link: '/images/cards/card0010.png'},
    			{value: '10', id: 36, link: '/images/cards/card0011.png'},
    			{value: '10', id: 37, link: '/images/cards/card0012.png'},
    			{value: '10', id: 38, link: '/images/cards/card0013.png'},
    			{value: '11', id: 39, link: '/images/cards/card0001.png'},
    			{value: '2', id: 40, link: '/images/cards/card0002.png'},
    			{value: '3', id: 41, link: '/images/cards/card0003.png'},
    			{value: '4', id: 42, link: '/images/cards/card0004.png'},
    			{value: '5', id: 43, link: '/images/cards/card0005.png'},
    			{value: '6', id: 44, link: '/images/cards/card0006.png'},
    			{value: '7', id: 45, link: '/images/cards/card0007.png'},
    			{value: '8', id: 46, link: '/images/cards/card0008.png'},
    			{value: '9', id: 47, link: '/images/cards/card0009.png'},
    			{value: '10', id: 48, link: '/images/cards/card00010.png'},
    			{value: '10', id: 59, link: '/images/cards/card00011.png'},
    			{value: '10', id: 50, link: '/images/cards/card00012.png'},
    			{value: '10', id: 51, link: '/images/cards/card00013.png'},
    		],
    		selectedCards: [],
    		playerCards: [],
            dbPlayerCards: [],
    		dealerCards: [],
    		stepOfDealer: false,
            splitStep: false,
            gameIsActive: false,
            preBet: 0,
            bet:0,
            balance: localStorage.getItem('money')
    	}
    }

    createCard = () => {
    	let { cards, selectedCards } = this.state;
    	let cardIsTaken = false;
    	while(cardIsTaken == false) {
    		let number = Math.round(Math.random() * (cards.length - 1));
    		if(selectedCards.indexOf(number) == -1) {
    			const createdCard = cards[number];
    			selectedCards.push(number);
    			cardIsTaken = true;
    			return number;
    		}
    	}
    }

    addCard = () => {
        if(this.state.splitStep == true) {
            let dbPlayerCards = this.state.dbPlayerCards;
            dbPlayerCards.push(this.createCard());
            this.setState({ dbPlayerCards: dbPlayerCards });
        } else {
    	   let playerCards = this.state.playerCards;
    	   playerCards.push(this.createCard());
    	   this.setState({ playerCards: playerCards });
        }
        console.log(this.state.dbPlayerCards + ' splitted');
        console.log(this.state.playerCards + ' no splitted');
    }


    distributionStop = () => {
        if (this.state.gameIsActive == true) {
            if ((this.state.splitStep == false) && (this.state.dbPlayerCards.length > 0)) {
                this.setState({ splitStep: true });
            } else {
    	        this.setState({ stepOfDealer: true });
            }
        }
    }

    addDealerCards = () => {
    	let { dealerCards } = this.state;
    	dealerCards.push(this.createCard());
        if(this.sumOfDealer() >= 17) {
            this.result();
        }
    }

    initialDistribution = () => {
    	let { playerCards, dealerCards } = this.state;
    	if(this.state.playerCards.length == 0) {
            if ((this.state.bet <= this.state.balance) && (this.state.preBet > 10)) {
    		    playerCards.push(this.createCard());
    		    playerCards.push(this.createCard());
    		    dealerCards.push(this.createCard());
                this.setState({ gameIsActive: true, bet: this.state.preBet });
            } else {
                alert('Ошибка. Ставка не может превышать баланс или быть отрицательной')
            }
    	}
    }

    split = () => {
        let { playerCards, cards, dbPlayerCards } = this.state;
        if((playerCards.length == 2) && (cards[playerCards[0]].value == cards[playerCards[1]].value)) {
            dbPlayerCards.push(playerCards[0]);
            playerCards.splice(0, 1);
            console.log('split!');
            this.setState({ splitted: true });
            console.log(this.state.dbPlayerCards + ' splitted');
            console.log(this.state.playerCards + ' no splitted');
        }
    }

    double = () => {
        if(this.state.dbPlayerCards.length > 0) {
            this.setState({ bet: this.state.bet * 1.5 });
        } else {
            this.setState({ bet: this.state.bet * 2 });
        }
    }

    sumOfPlayer = () => {
    	let total = 0;
    	let ace = 0;
    	let { playerCards, cards } = this.state;
    	for(let i = 0; i < playerCards.length; i++) {
			total += Number(cards[playerCards[i]].value);
			if(Number(cards[playerCards[i]].value) == 11) {
				ace += 1;
			}
			if((total > 21) && (ace > 0)) {
				total -= 10;
				ace -=1;
			}
		}
		return total;
    }

    sumOfPlayerSplit = () => {
        let total = 0;
        let ace = 0;
        let { dbPlayerCards, cards } = this.state;
        for(let i = 0; i < dbPlayerCards.length; i++) {
            total += Number(cards[dbPlayerCards[i]].value);
            if(Number(cards[dbPlayerCards[i]].value) == 11) {
                ace += 1;
            }
            if((total > 21) && (ace > 0)) {
                total -= 10;
                ace -=1;
            }
        }
        return total;
    }

    sumOfDealer = () => {
    	let total = 0;
    	let ace = 0;
    	let { dealerCards, cards } = this.state;
    	for(let i = 0; i < dealerCards.length; i++) {
			total += Number(cards[dealerCards[i]].value);
			if(Number(cards[dealerCards[i]].value) == 11) {
				ace += 1;
			}
			if((total > 21) && (ace > 0)) {
				total -= 10;
				ace -=1;
			}
		}
		return total;
    }

    setBet = sum => {
        this.setState({ preBet: sum * 10 });
    }

    result = () => {
        setTimeout(() => {
            if(this.state.dbPlayerCards.length > 0) {
                let leftHand, rightHand;
                if(((this.sumOfPlayer() > this.sumOfDealer()) || (this.sumOfDealer() > 21)) && (this.sumOfPlayer() <= 21))  {
                    localStorage.setItem('money', (Number(localStorage.getItem('money')) + this.state.bet));
                    rightHand = 'u win';
                } else if(((this.sumOfPlayer() < this.sumOfDealer()) || (this.sumOfPlayer() > 21)) && (this.sumOfDealer() <= 21)) {
                    localStorage.setItem('money', (Number(localStorage.getItem('money')) - this.state.bet));
                    rightHand = 'u lose';
                } else {
                   rightHand = 'draw';
                }
                if(((this.sumOfPlayerSplit() > this.sumOfDealer()) || (this.sumOfDealer() > 21)) && (this.sumOfPlayerSplit() <= 21))  {
                    localStorage.setItem('money', (Number(localStorage.getItem('money')) + this.state.bet));
                    leftHand = 'u win';
                } else if(((this.sumOfPlayerSplit() < this.sumOfDealer()) || (this.sumOfPlayerSplit() > 21)) && (this.sumOfDealer() <= 21)) {
                    localStorage.setItem('money', (Number(localStorage.getItem('money')) - this.state.bet));
                    leftHand = 'u lose';
                }else {
                    leftHand = 'draw';
                }
            alert('Левая рука - ' + leftHand + ' / Правая рука - ' + rightHand);
            } else {
    	        if(((this.sumOfPlayer() > this.sumOfDealer()) || (this.sumOfDealer() > 21)) && (this.sumOfPlayer() <= 21))  {
                    alert('u win');
                    localStorage.setItem('money', (Number(localStorage.getItem('money')) + this.state.bet));
    	        } else if(((this.sumOfPlayer() < this.sumOfDealer()) || (this.sumOfPlayer() > 21)) && (this.sumOfDealer() <= 21)) {
                    alert('u lose');
                    localStorage.setItem('money', (Number(localStorage.getItem('money')) - this.state.bet));
    	        } else {
                    alert('draw');
    	        }
            }
            this.setState({selectedCards: [], playerCards: [], splitStep: false, dbPlayerCards: [], dealerCards: [], stepOfDealer: false, gameIsActive: false, splitted: false, balance: localStorage.getItem('money') });
        }, 200)
    }

	render() {
        return (
        	<div className='background'>
        		<div className='table'>
        			<img className='card deck ' src='/../images/cards/backCard.png' />
        			<div className='start-game'><BetPlace 
                                                    setBet={this.setBet} 
                                                    initialDistribution={this.initialDistribution} 
                                                    gameIsActive={this.state.gameIsActive}
                                                />
                            <p>баланс: { this.state.balance }</p></div>
        			<YourCards 
                        gameIsActive={this.state.gameIsActive}
        				cards={this.state.cards}
        				sumOfPlayer={this.sumOfPlayer}
                        sumOfPlayerSplit={this.sumOfPlayerSplit}
        				addCard={this.addCard}
        				distributionStop={this.distributionStop}
                        split={this.split}
        				stepOfDealer={this.state.stepOfDealer}
        				numbersOfCards={this.state.playerCards}
                        splitCards={this.state.dbPlayerCards}
                        splitStep={this.state.splitStep}
                        bet={this.state.bet}
                        balance={this.state.balance}
                        double={this.double}
        			/>
        			<DealerCards 
        				sumOfDealer={this.sumOfDealer}
        				cards={this.state.cards}
        				stepOfDealer={this.state.stepOfDealer}
        				addDealerCards={this.addDealerCards}
        				numbersOfCards={this.state.dealerCards}
        				result={this.result}
        			/>
        		</div>
        	</div>
        );
    }
} 

export default App;