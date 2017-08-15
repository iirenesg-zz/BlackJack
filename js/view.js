function GameView(config) {

		var self = this;

		self.dealBtn;
		self.hitBtn;
		self.standBtn;
		self.doubleBtn;
		self.divideBtn;

		self.balanceDisplay = config.balanceDisplay;
		self.betDisplay = config.betDisplay;
		self.playDisplay;
		self.msgDisplay = msgDisplay;

		self.chip1 = config.chip1;
		self.chip5 = config.chip5;
		self.chip25 = config.chip25;
		self.chip100 = config.chip100;
		self.resetBetBtn = config.resetBetBtn;

		self.userCountDisplay = config.userCountDisplay;
		self.dealerCountDisplay = config.dealerCountDisplay;

		self.messages = {
			start: 'Place a bet to start playing',
			maxBet: 'You can\'t bet VALUE because you don\'t have enough money',
			lose: 'You lose. Dealer takes your bet.',
			win: 'You win! Your bet is doubled',
			draw : 'It\'s a draw. Dealer takes your bet.'
		};

		self.currentMsg = 'start';

		/**
		 * Renders current bet value in the DOM 
		 * @param      {Object}  state   Current state of the model data
		 */
		self.renderBet = function(state) {
			if(state.currentBet > 0) {
				dealBtn.classList.remove('hidden');
			} else {
				dealBtn.classList.add('hidden');
				chipContainer.classList.remove('hidden');
			}
			betDisplay.innerHTML = state.currentBet;
		};

		/**
		 * Renders current balance value in the DOM 
		 * @param      {Object}  state   Current state of the model data
		 */
		self.renderBalance = function(state) {
			balanceDisplay.innerHTML = state.balance;
		};

		/**
		 * Renders a message in the DOM
		 * @param      {string}  topic   The topic of the message to be displayed
		 */
		self.renderMsg = function(topic, data) {
			var msg = self.messages[topic].replace('VALUE', data);
			msgDisplay.innerText = msg;
		};

		self.renderPlay = function(state) {
			
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

		/**
		 * Renders one card on the DOM
		 *
		 * @param      {object}  state      The model state
		 * @param      {DOM el}  container  The container to append the card to
		 */
		self.renderCard = function(state, container){

			var dealerCards = state.currentPlay.dealerCards;
			var playerCards = state.currentPlay.playerCards;

			userCardsDisplay.appendChild(self.composeCard(playerCards[playerCards.length - 1]))
		};

		self.renderCounters = function(state) {
			self.userCountDisplay.innerHTML = state.currentPlay.userTotal;
			
			if (state.currentPlay.acedUser) {
				self.userCountDisplay.innerHTML = state.currentPlay.acedUserTotal + ' | ' + state.currentPlay.userTotal;
			}

			if (state.currentPlay.acedDealer) {
				self.dealerCountDisplay.innerHTML = state.currentPlay.acedDealerTotal + ' | ' + state.currentPlay.dealerTotal;
			}

			if (state.currentPlay.revealed) {
				self.dealerCountDisplay.innerHTML = state.currentPlay.dealerTotal;
			} else {
				self.dealerCountDisplay.innerHTML = '?';
			}
		};

		self.renderDealerCard = function(state) {

			hitBtn.classList.add('hidden');
			standBtn.classList.add('hidden');
			var cardHidden = document.getElementsByClassName("cardHidden")[0];
			cardHidden.classList.remove('cardHidden');

			for(var i = 2; i<state.currentPlay.dealerCards.length; i++) {
				var card = state.currentPlay.dealerCards[i];
				dealerCardsDisplay.appendChild(self.composeCard(card));
			}

		}

		self.renderEndPlay = function(state) {
			self.renderMsg(state.currentPlay.endStatus);
			dealBtn.classList.add('hidden');
			chipContainer.classList.remove('hidden');
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