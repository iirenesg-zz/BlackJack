function GameModel(config) {

	var self = this;

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

	self.state = State.getInstance(config);

	self.observers = {
		start: [],
		money: [],
		userPlay: [],
		dealerPlay: [],
		end: []
	};

	self.deck = function(state) {
		self.state.deck.deckRandom();
	}

	self.deal = function(state) {
		self.state.dealer.execute('deal', self.state);
		self.updateCounter();
		self.publish('start', self.state);
	}

	self.hit = function(state) {
		var valid = self.state.dealer.execute('hit', self.state, 'player');
		self.updateCounter();
		if(valid) self.publish('userPlay', self.state);
	}

	self.stand = function(state){
		self.state.dealer.execute('stand', self.state);
		self.updateCounter();
		self.publish('dealerPlay', self.state);
		self.publish('end', self.state);
		self.publish('money', self.state);
	}

	/**
	 * Subscribes a function to a specific topic notification
	 * @param      {string}    topic   The topic to subscribe to
	 * @param      {Function}  fn      Function to subscribe
	 */
	self.subscribe = function(topic, fn) {
		self.observers[topic].push(fn);
	}

	/**
	 * Unsubscribes a function from a specific topic notification
	 * @param      {string}    topic   The topic to unsubscribe to
	 * @param      {Function}  fn      Function to unsubscribe
	 */
	self.unsubscribe = function(topic, fn) {
		self.observers[topic] =  self.observers[topic].filter(function(observer) {
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
	self.publish = function(topic, data) {
		self.observers[topic].forEach(function(observer){
			observer(data);
		});
	}

	/**
	 * Updates the value of the bet and balance variables of the game state
	 * @param      {number}  amt     The amount the user bet
	 */
	self.updateBet = function(amt) {
		if(amt < self.state.balance) {
			self.state.currentBet += amt;
			self.state.balance -= amt;
			self.publish('money', self.state);
			return true;				
		} else {
			return false;
		}
	}

	/**
	 * Returns current bet to balance
	 */
	self.resetBet = function() {
		self.state.balance += self.state.currentBet;
		self.state.currentBet = 0;
		self.publish('money', self.state);		
	}

	self.updateCounter = function (state) {
		self.state.currentPlay.userTotal = 0;
		self.state.currentPlay.dealerTotal = 0;
		self.state.currentPlay.acedUserTotal = 0;
		self.state.currentPlay.acedDealerTotal = 0;

		for (var i = 0; i < self.state.currentPlay.playerCards.length; i++) {
			self.state.currentPlay.userTotal += self.state.currentPlay.playerCards[i].value;
		}
		
		for (var i = 0; i < self.state.currentPlay.dealerCards.length; i++) {
			self.state.currentPlay.dealerTotal += self.state.currentPlay.dealerCards[i].value;
		}

		if(self.state.currentPlay.acedUser) {
			for (var i = 0; i < self.state.currentPlay.playerCards.length; i++) {
				if (self.state.currentPlay.playerCards[i].name == 'A') {
					self.state.currentPlay.acedUserTotal += 11;
				} else {
					self.state.currentPlay.acedUserTotal += self.state.currentPlay.playerCards[i].value;
				}
			}
		}

		if(self.state.currentPlay.acedDealer) {
			for (var i = 0; i < self.state.currentPlay.dealerCards.length; i++) {

				if (self.state.currentPlay.dealerCards[i].name == 'A') {
					self.state.currentPlay.acedDealerTotal += 11;
				} else {
					self.state.currentPlay.acedDealerTotal += self.state.currentPlay.dealerCards[i].value;
				}
			}
		}
	}
}