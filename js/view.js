function GameView(config) {

		this.dealBtn;
		this.hitBtn;
		this.standBtn;
		this.doubleBtn;
		this.divideBtn;

		this.balanceDisplay = config.balanceDisplay;
		this.betDisplay = config.betDisplay;
		this.playDisplay;
		this.msgDisplay = msgDisplay;

		this.chip1 = config.chip1;
		this.chip5 = config.chip5;
		this.chip25 = config.chip25;
		this.chip100 = config.chip100;

		this.userCountDisplay;
		this.dealerCountDisplay;

		this.messages = {
			start: 'Place a bet to start playing',
			maxBet: 'You can\'t bet VALUE because you don\'t have enough money',
			lose: 'You lose the game',
			win: 'You Win',
			draw : 'You draw with the dealer'
		};

		this.currentMsg = 'start';

		/**
		 * Renders current bet value in the DOM 
		 * @param      {Object}  state   Current state of the model data
		 */
		this.renderBet = function(state) {
			if(state.currentBet > 0) {
				dealBtn.classList.remove('hidden');
			} else {
				dealBtn.classList.add('hidden');
			}
			betDisplay.innerHTML = state.currentBet;
		};

		/**
		 * Renders current balance value in the DOM 
		 * @param      {Object}  state   Current state of the model data
		 */
		this.renderBalance = function(state) {
			balanceDisplay.innerHTML = state.balance;
		};

		/**
		 * Renders a message in the DOM
		 * @param      {string}  topic   The topic of the message to be displayed
		 */
		this.renderMsg = function(topic, data) {
			var msg = this.messages[topic].replace('VALUE', data);
			msgDisplay.innerText = msg;
		};

		var self = this;

		this.renderPlay = function(state) {
			
			dealerCardsDisplay.innerHTML = ' ';
			userCardsDisplay.innerHTML = ' ';


			var dealerCards = state.currentPlay.dealerCards;
			var playerCards = state.currentPlay.playerCards;

			playDisplay.classList.remove("hidden");

			//Deal (Card Front/Card Back) to the dealer according the suit and the name
			for (var i = 0; i < dealerCards.length; i++) {
				if (i === 0) {
					dealerCardsDisplay.appendChild(self.composeCard(dealerCards[i]));
				}else if (i === 1){
					var card = self.composeCard(dealerCards[i]);
					card.classList.add('cardHidden');
					dealerCardsDisplay.appendChild(card);
				 } 
			}

			//Deal (Card Front/Card Back) to the player according the suit and the name
			for (var i = 0; i < playerCards.length; i++) {
				userCardsDisplay.appendChild(self.composeCard(playerCards[i]));
			}
			
			chipContainer.classList.add('hidden');
			dealBtn.classList.add('hidden');
			hitBtn.classList.remove('hidden');
			standBtn.classList.remove('hidden');

		};

		this.renderCard = function(state, container){

			var dealerCards = state.currentPlay.dealerCards;
			var playerCards = state.currentPlay.playerCards;


			userCardsDisplay.appendChild(self.composeCard(playerCards[playerCards.length - 1]))
		};

		this.renderCounters = function(state) {
			userCountDisplay.innerHTML = state.currentPlay.userTotal;
			console.log(state.currentPlay.acedUser)
			if (state.currentPlay.acedUser) {
				userCountDisplay.innerHTML = state.currentPlay.acedUserTotal + ' | ' + state.currentPlay.userTotal;
			}

			if (state.currentPlay.acedDealer) {
				console.log(state.currentPlay.acedDealer)
				dealerCountDisplay.innerHTML = state.currentPlay.acedDealerTotal + ' | ' + state.currentPlay.dealerTotal;
			}

			if (state.currentPlay.revealed) {
				dealerCountDisplay.innerHTML = state.currentPlay.dealerTotal;
			} else {
				dealerCountDisplay.innerHTML = '?';
			}
		};

		this.renderDealerCard = function(state) {

			hitBtn.classList.add('hidden');
			standBtn.classList.add('hidden');
			var cardHidden = document.getElementsByClassName("cardHidden")[0];
			cardHidden.classList.remove('cardHidden');

			for(var i = 2; i<state.currentPlay.dealerCards.length; i++) {
				var card = state.currentPlay.dealerCards[i];
				dealerCardsDisplay.appendChild(self.composeCard(card));
			}

		}

		this.renderEndPlay = function(state) {
			self.renderMsg(state.currentPlay.endStatus);
		}

		/*
		 *
		 *Asign value and kind of the card according the hand
		 *@param 	value - Value of tha card (Suit/Name)
		 *@param 	kindCard - Kind of the display card (Front/Back)
		 *
		*/
		self.composeCard = function(card) { //solo una carta
			
			var element = document.createElement('span');
			element.classList.add('card');
			element.classList.add(card.suit);
			element.classList.add('card' + card.name);

			return element;
			
		};



	}