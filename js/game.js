function Game(config) {

	var self = this;

	self.init = function() {
		self.gameState = self.gameModel.getInstance();
	}

	self.gameModel = function() {

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

		var observers = [];
		function subscribe(topic, fn) {}
		function unsubscribe(fn) {}
		function publish(topic) {}


		return {
 
    		getInstance: function () {
 
      			if ( !instance ) {
        			instance = init();
      			}

     			return instance;
    		}
  		};
 	}

	self.gameView = function() {

		// Private methods and variables

		var placeBetBtn;
		var hitBtn;
		var standBtn;
		var divideBtn;

		var balanceDisplay;
		var betDisplay;
		var playDisplay;

		function render() {}

		return {

		// Public methods and variables
		
		}

	}

	self.gameController = function(model, view) {

	    // Private methods and variables

	    function updateBalance() {}

	    function updateBet() {}

	    function updatePlay() {}

		return {

		// Public methods and variables

		}

	}

}