var Game = function () {

	function init(config) {
		var gameData = new GameModel(config.model);
		var UI = new GameView(config.view);
		var gameHandler = new GameController(gameData, UI);

		gameHandler.init();
	}

	function GameModel(config) {

		var State = (function() {
			var instance;

	  		function init(config) {
	    
			    // Private methods and variables
			    
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

		this.subscribe = function(topic, fn) {
			observers[topic].push(fn);
		}

		this.unsubscribe = function(topic, fn) {
			observers[topic] = observers[topic].filter(function(observer) {
				if(observer != fn) {
					return observer;
				}
			});
		}

		this.publish = function(topic, data) {
			observers[topic].forEach(function(observer){
				observer(data);
			})
		}

		this.publish = function(topic, data) {
			observers[topic].forEach(function(observer){
				observer(data);
			})
		}
		this.LightBlueChip1 = function(model){
			model.state.currentBet = currentBet + 1;
			model.state.balance -= 1;
			model.publish('money');
		}
		this.RedChip5 = function(model){
			model.state.currentBet = currentBet + 5;
			model.state.balance -= 5;
			model.publish('money');
		}
		this.GreenChip25 = function(model) {
			model.state.currentBet = currentBet + 25;
			model.state.balance -= 25;
			model.publish('money');
		}
		this.BlackChip100 = function(model) {
			model.state.currentBet = currentBet + 100;
			model.state.balance -= 100;
			model.publish('money');
		}
 	}

	function GameView(config) {

		this.dealBtn;
		this.hitBtn;
		this.standBtn;
		this.doubleBtn;
		this.divideBtn;

		this.balanceDisplay;
		this.betDisplay;
		this.playDisplay;
		this.msgDisplay;

		this.chip1;
		this.chip5;
		this.chip25;
		this.chip100;

		/**
		 * [renderBet, renderBalance]
		 * @return {string} 
		 * modify in html the total money in balance and bet of player
		**/
		this.renderBet = function() {
			betDisplay.innerHTML = state.currentBet;
		}
		this.renderBalance = function() {
			balanceDisplay.innerHTML = state.balance;
		}
		this.renderPlay = function() {}
		this.renderMsg = function() {}
		this.renderCounters = function() {}
		this.renderCard = function() {}

	}


	function GameController(model, view) {

	    this.init = function() {
	    	this.addEvents();
	    	this.addSubscriptions();
	    }

	    /**
	     * @type {subscription} 
	     * param of model in the function GameController subscribe 
	    **/
	    this.addSubscriptions = function() {
	    	model.subscribe('money', view.renderBet);
	    	model.subscribe('money', view.renderBalance);
	    }

	    /**
	     * @type {clickEvent} 
	     * this.addEvents have all events of click in the game
	    **/
	    this.addEvents = function() {
	    	chip1.addEventListener('click', model.LightBlueChip1);
	    	chip5.addEventListener('click', model.RedChip5);
	    	chip25.addEventListener('click', model.GreenChip25);
	    	chip100.addEventListener('click', model.BlackChip100);
	    }

	}

	return {
		init: init
	}

}