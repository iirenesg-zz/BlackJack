function Dealer() {

	var self = this;

	/**
	 * Executes a function from a given parameter
	 * Command pattern
	 * @param      {string} name    Command to be executed
	 * @return     {function}  		Function to be executed as a result of the command given
	 */
	self.execute = function (name) {
	    return self[name] && self[name].apply(self, [].slice.call(arguments, 1) );
	};

	self.deal = function() {};

	self.hit = function() {
		dealerCards = [];
		playerCards = [];

		var deckLength = deck.cards.length;

		for (var i = 0; i < deckLength; i++) {
			
			//Next Card, push New Card to Dealer Hand
			if (dealerCards.length < 1 || dealerCards < 5) {
				var nextCard = deck.cards[i];
				deck.cards.pop(i);
				dealerCards.push(nextCard);
			};

			//Next Card, push New Card to Player Hand
			if (playerCards < 1 || playerCards < 5) {
				var nextCard = deck.cards[i];
				deck.cards.pop(i);
				playerCards.push(nextCard);
			};
		}
	};

	self.stand = function() {};

	self.divide = function() {};

	self.double = function() {};

	self.resolve = function() {};

} 

function Deck() {

	this.cards = [];
	this.numCards = 0;

	//Card values
	var suits = ["spade", "diamond", "heart", "club"];
	var names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

	//Create All Cards
	for (var s = 0; s < suits.length; s++) {
    	for (var n = 0; n < names.length; n++) {
        	this.cards.push(new Card(values[n], names[n], suits[s]));
     	}
 	};
}

Deck.prototype = {
	contructor : Deck,

	//Create Ramdom Deck 
	deckRandom : function() {
		Deck();
		this.randomDeck = new Array();
		var empty = false;

		while(!empty){
			var randomIndex = Math.floor(Math.random()*this.cards.length);
			this.randomDeck.push(this.cards[randomIndex]);
			this.cards.splice(randomIndex, 1);
			if(this.cards.length <=0) empty = true;
		}

		for(var i=0; i<this.randomDeck.length; i++){
			this.cards[i] = this.randomDeck[i];
		}
	},
	
};

function Card (value, name, suit) {
	this.value = value;
	this.suit = suit;
	this.name = name;
}

Card.prototype.setValue = function () {
	if (this.name == "J" || "Q" || "K") {
		return [10];
	} else if ( this.name == "A"){
		return [1, 11];
	} else {
		return parseInt(this.name, 10);
	}
};

var deck = new Deck();
deck.deckRandom();

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