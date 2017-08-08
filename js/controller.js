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
    	model.subscribe('userPlay', view.renderCounters);
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