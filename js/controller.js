function GameController(model, view) {

    var self = this;

    /**
     * Initializes game controller
     */
    self.init = function() {
        self.addEvents();
        self.addSubscriptions();
        view.renderMsg('start');
        view.currentMsg = 'start';
        model.deck();
    }

    /**
     * Subscribes view functions to the model observer list 
     */
    self.addSubscriptions = function() {
        model.subscribe('money', view.renderBet);
        model.subscribe('money', view.renderBalance);
        model.subscribe('start', view.renderPlay);
        model.subscribe('userPlay', view.renderCounters);
        model.subscribe('dealerPlay', view.renderCounters);
        model.subscribe('start', view.renderCounters);
        model.subscribe('userPlay', view.renderCard);
        model.subscribe('dealerPlay', view.renderDealerCard);
        model.subscribe('end', view.renderEndPlay);
    }

    /**
     * Adds the event handlers to the view buttons
    */

    self.addEvents = function() {
        chip1.addEventListener('click', function(){ self.validBet(1) });
        chip5.addEventListener('click', function(){ self.validBet(5) });
        chip25.addEventListener('click', function(){ self.validBet(25) });
        chip100.addEventListener('click', function(){ self.validBet(100) });
        dealBtn.addEventListener('click', function(){ model.deal()});
        hitBtn.addEventListener('click', function() { model.hit()});
        standBtn.addEventListener('click', function(){ model.stand()});
        view.resetBetBtn.addEventListener('click', model.resetBet);
    }

    /**
     * Checks the model response to the bet to 
     * inform the user of whether it was valid or not
     *
     * @param      {number}  amt     The amount to bet
     */
    self.validBet = function(amt) {
        var valid = model.updateBet(amt);
        if(!valid) {
            view.renderMsg('maxBet', '$' + amt);
            setTimeout(function(){view.renderMsg(view.currentMsg)}, 3000)
        }
    }

}