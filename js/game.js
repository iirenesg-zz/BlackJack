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

		this.renderBet = function() {}
		this.renderBalance = function() {}
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

	    this.addSubscriptions = function() {}

	    this.addEvents = function() {}

	}

	return {
		init: init
	}

}