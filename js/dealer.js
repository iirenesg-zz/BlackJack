function Dealer() {

	var self = this;

	/**
	 * Executes a function from a given parameter
	 * Command pattern
	 *
	 * @param      {string} name    Command to be executed
	 * @return     {function}  		Function to be executed as a result of the command given
	 */
	self.execute = function (name) {
	    return self[name] && self[name].apply(self, [].slice.call(arguments, 1) );
	};

	self.deal = function() {};

	self.hit = function() {};

	self.stand = function() {};

	self.divide = function() {};

	self.double = function() {};

	self.resolve = function() {};

} 

function Deck() {

	var deck = [];

	function Ace(value) {}
	function FaceCard(value) {}
	function RegularCard(value) {}

	function Club() {}
	function Spade() {}
	function Diamond() {}
	function Heart() {}

	return deck;

}

function Play() {

	var self = this;

	self.getCard = function(deck) {};

	self.getPlayValue = function(array) {};

	self.dealerCards;
	self.playerCards;

	self.revealed = false;
	self.userPlay;
	self.dealerPlay;
}