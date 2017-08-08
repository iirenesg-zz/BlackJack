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
		this.updateCounter();
		this.publish('start', this.state);
	}

	this.hit = function(state) {
		var valid = this.state.dealer.execute('hit', this.state, 'player');
		this.updateCounter();
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
		}
	}
}