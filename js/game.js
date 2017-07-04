function Game(config) {

	var self = this;

	self.init = function() {
		self.gameState = self.gameModel.getInstance();
	}

	var GameModel = function() {

		var State = (function() {
			var instance;

	  		function init() {
	    
			    // Private methods and variables

			    var deck = [];
			    var balance;
			    var currentPlay;
			    var currentBet;
			    
			    return {
			 
			    // Public methods and variables
			 
			    };
			}

			return {
 
	    		getInstance: function () {
	 
	      			if ( !instance ) {
	        			instance = init();
	      			}

	     			return instance;
	    		}
  			};

		})();

		var observers = [];
		function subscribe(topic, fn) {}
		function unsubscribe(fn) {}
		function publish(topic) {}
 	}

	self.gameView = function() {

		// Private methods and variables

		var dealBtn;
		var hitBtn;
		var standBtn;
		var doubleBtn;
		var divideBtn;

		var balanceDisplay;
		var betDisplay;
		var playDisplay;
		var msgDisplay;

		function renderBet() {}
		function renderBalance() {}
		function renderPlay() {}
		function renderMsg() {}

		return {

		// Public methods and variables
		
		}

	}

	self.gameController = function(model, view) {

	    // Private methods and variables

	    var events = {};

	    function handleEvent() {}

	    function updateBet() {}

	    function updatePlay() {}

		return {

		// Public methods and variables

		}

	}

}