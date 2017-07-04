function Dealer() {

	var self = this;

	self.commands = [];

	self.execute = function(name) {};

	self.deal = function() {};

	self.hit = function() {};

	self.stand = function() {};

	self.divide = function() {};

	self.double = function() {};

	self.resolve = function() {};

} 

function cardFactory() {

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