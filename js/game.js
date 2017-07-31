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
				    currentBet: 0
			 
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
			this.state.currentBet += amt;
			this.state.balance -= amt;
			this.publish('money', this.state);
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

		this.messages = {
			start: 'Place a bet to start playing'
		}

		/**
		 * Renders current bet value in the DOM 
		 * @param      {Object}  state   Current state of the model data
		 */
		this.renderBet = function(state) {
			betDisplay.innerHTML = state.currentBet;
		}

		/**
		 * Renders current balance value in the DOM 
		 * @param      {Object}  state   Current state of the model data
		 */
		this.renderBalance = function(state) {
			balanceDisplay.innerHTML = state.balance;
		}

		/**
		 * Renders a message in the DOM
		 * @param      {string}  topic   The topic of the message to be displayed
		 */
		this.renderMsg = function(topic) {
			msgDisplay.innerText = this.messages[topic];
		}

		this.renderPlay = function() {}
		this.renderCounters = function() {}
		this.renderCard = function() {}

	}


	function GameController(model, view) {

		/**
		 * Initializes game controller
		 */
	    this.init = function() {
	    	this.addEvents();
	    	this.addSubscriptions();
	    	view.renderMsg('start');
	    }

		/**
		 * Subscribes view functions to the model observer list 
		 */
	    this.addSubscriptions = function() {
	    	model.subscribe('money', view.renderBet);
	    	model.subscribe('money', view.renderBalance);
	    }

	    /**
	     * Adds the event handlers to the view buttons
	     */
	    this.addEvents = function() {
	    	chip1.addEventListener('click', function(){ model.updateBet(1) });
	    	chip5.addEventListener('click', function(){ model.updateBet(5) });
	    	chip25.addEventListener('click', function(){ model.updateBet(25) });
	    	chip100.addEventListener('click', function(){ model.updateBet(100) });
	    }

	}

	return {
		init: init
	}

}