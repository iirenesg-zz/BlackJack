var Game = function () {

	function init(config) {
		var gameData = new GameModel(config.model);
		var UI = new GameView(config.view);
		var gameHandler = new GameController(gameData, UI);

		gameHandler.init();
	}

	function GameModel(config) {

		/**
		 * Singleton pattern 
		 * Returns a unique instance of the game data
		 * @class      State (name)
		 * @return     {Object}  Game model data 
		 */
		var State = (function() {
			var instance;

	  		function init(config) {
			    
			    return {
			 
			    	dealer: new Dealer(),
			    	deck: new Deck(),
				    balance: config.balance,
				    currentPlay: null,
				    currentBet: 0,
			 		totalUser: 0

			    };
			}

			return {
 
	    		getInstance: function (config) {
	 
	      			if ( !instance ) {
	        			instance = init(config);
	      			}

	     			return instance;
	    		}
  			};

		})();

		this.state = State.getInstance(config);

		this.observers = {
			start: [],
			money: [],
			userPlay: [],
			dealerPlay: [],
			end: []
		};

		this.deck = function(state) {
			this.state.deck.deckRandom();
		}

		this.deal = function(state) {
			this.state.dealer.execute('deal', this.state);
<<<<<<< HEAD
=======
			this.updateCounter();
>>>>>>> 62fac146fe27561a9c1cfaf7946417d457dd33ca
			this.publish('start', this.state);
		}

		this.hit = function(state) {
			var valid = this.state.dealer.execute('hit', this.state, 'player');
<<<<<<< HEAD
=======
			this.updateCounter();
>>>>>>> 62fac146fe27561a9c1cfaf7946417d457dd33ca
			if(valid) this.publish('userPlay', this.state);
		}

		/**
		 * Subscribes a function to a specific topic notification
		 * @param      {string}    topic   The topic to subscribe to
		 * @param      {Function}  fn      Function to subscribe
		 */
		this.subscribe = function(topic, fn) {
			this.observers[topic].push(fn);
		}

		/**
		 * Unsubscribes a function from a specific topic notification
		 * @param      {string}    topic   The topic to unsubscribe to
		 * @param      {Function}  fn      Function to unsubscribe
		 */
		this.unsubscribe = function(topic, fn) {
			this.observers[topic] =  this.observers[topic].filter(function(observer) {
				if(observer != fn) {
					return observer;
				}
			});
		}

		/**
		 * Publishes a notification to all the observers subscribed to a topic
		 * @param      {string}  topic   The topic notification where changes happened
		 * @param      {object}  data    The data to send as parameters to the subscribed functions
		 */
		this.publish = function(topic, data) {
			this.observers[topic].forEach(function(observer){
				observer(data);
			});
		}

		/**
		 * Updates the value of the bet and balance variables of the game state
		 * @param      {number}  amt     The amount the user bet
		 */
		this.updateBet = function(amt) {
			if(amt < this.state.balance) {
				this.state.currentBet += amt;
				this.state.balance -= amt;
				this.publish('money', this.state);
				return true;				
			} else {
				return false;
			}

		}

		this.updateCounter = function (state) {
<<<<<<< HEAD
			var dealerCards = this.state.currentPlay.dealerCards;
			var playerCards = this.state.currentPlay.playerCards;
			var total = 0;

			for (var i = 0; i < dealerCards.length; i++) {
				dealerCards[i].value += total
=======
			this.state.currentPlay.userTotal = 0;
			this.state.currentPlay.dealerTotal = 0;
			this.state.currentPlay.acedTotal = 0;

			for (var i = 0; i < this.state.currentPlay.playerCards.length; i++) {
				this.state.currentPlay.userTotal += this.state.currentPlay.playerCards[i].value;
			}
			
			for (var i = 0; i < this.state.currentPlay.dealerCards.length; i++) {
				this.state.currentPlay.dealerTotal += this.state.currentPlay.dealerCards[i].value;
			}

			if(this.state.currentPlay.aced) {
				for (var i = 0; i < this.state.currentPlay.playerCards.length; i++) {

					if (this.state.currentPlay.playerCards[i].name == 'A') {
						this.state.currentPlay.acedTotal += 11;
					} else {
						this.state.currentPlay.acedTotal += this.state.currentPlay.playerCards[i].value;
					}
				}
>>>>>>> 62fac146fe27561a9c1cfaf7946417d457dd33ca
			}
		}
 	}

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
			maxBet: 'You can\'t bet VALUE because you don\'t have enough money'
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
<<<<<<< HEAD

			var dealerCards = state.currentPlay.dealerCards;
			var playerCards = state.currentPlay.playerCards;

=======

			var dealerCards = state.currentPlay.dealerCards;
			var playerCards = state.currentPlay.playerCards;

>>>>>>> 62fac146fe27561a9c1cfaf7946417d457dd33ca
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

			dealBtn.classList.add('hidden');
<<<<<<< HEAD
=======
			hitBtn.classList.remove('hidden');
			standBtn.classList.remove('hidden');
>>>>>>> 62fac146fe27561a9c1cfaf7946417d457dd33ca

		};

		this.renderCard = function(state, container){

			var dealerCards = state.currentPlay.dealerCards;
			var playerCards = state.currentPlay.playerCards;


			userCardsDisplay.appendChild(self.composeCard(playerCards[playerCards.length - 1]))
		};

		this.renderCounters = function(state) {
<<<<<<< HEAD

=======
			userCountDisplay.innerHTML = state.currentPlay.userTotal;

			if (state.currentPlay.aced) {
				userCountDisplay.innerHTML = state.currentPlay.acedTotal + ' | ' + state.currentPlay.userTotal;
			}

			if (state.currentPlay.revealed) {
				dealerCountDisplay.innerHTML = state.currentPlay.dealerTotal;
			} else {
				dealerCountDisplay.innerHTML = '?';
			}
>>>>>>> 62fac146fe27561a9c1cfaf7946417d457dd33ca
		};

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

<<<<<<< HEAD
=======


>>>>>>> 62fac146fe27561a9c1cfaf7946417d457dd33ca
	}

	function GameController(model, view) {

	    /**
		 * Initializes game controller
		 */
	    this.init = function() {
	    	this.addEvents();
	    	this.addSubscriptions();
	    	view.renderMsg('start');
	    	view.currentMsg = 'start';
	    	model.deck();
	    }

		/**
		 * Subscribes view functions to the model observer list 
		 */
	    this.addSubscriptions = function() {
	    	model.subscribe('money', view.renderBet);
	    	model.subscribe('money', view.renderBalance);
	    	model.subscribe('start', view.renderPlay);
<<<<<<< HEAD
=======
	    	model.subscribe('userPlay', view.renderCounters);
>>>>>>> 62fac146fe27561a9c1cfaf7946417d457dd33ca
	    	model.subscribe('start', view.renderCounters);
	    	model.subscribe('userPlay', view.renderCard);
	    }

	    /**
	     * Adds the event handlers to the view buttons
	     */
	     var self = this;

	    this.addEvents = function() {
	    	chip1.addEventListener('click', function(){ self.validBet(1) });
	    	chip5.addEventListener('click', function(){ self.validBet(5) });
	    	chip25.addEventListener('click', function(){ self.validBet(25) });
	    	chip100.addEventListener('click', function(){ self.validBet(100) });
	    	dealBtn.addEventListener('click', function(){ model.deal()});
	    	hitBtn.addEventListener('click', function() { model.hit()});
	    }

		self.validBet = function(amt) {
			var valid = model.updateBet(amt);
			if(!valid) {
				view.renderMsg('maxBet', '$' + amt);
				setTimeout(function(){view.renderMsg(view.currentMsg)}, 3000)
			}
		}

	}

	return {
		init: init
	}

}