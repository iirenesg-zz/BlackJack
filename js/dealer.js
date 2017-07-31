function Dealer() {
	var self = this;

	self.execute = function (name) {
	    return self[name] && self[name].apply(self, [].slice.call(arguments, 1) );
	};
	
	self.deal = function() {
		console.log('enter')
		for (var i = 0; i < deck.cards.length; i++) {

			//Push Cards to Dealer Hand and Delete from Deck
			if (self.dealerCards.length < 2) {
				var card = deck.cards[i];
				deck.cards.splice(i, 1)
				self.dealerCards.push(card);
			};

			//Push Cards to Player Hand and Delete from Deck
			if (self.playerCards.length < 2) {
				var card = deck.cards[i];
				deck.cards.splice(i, 1)
				self.playerCards.push(card);
			};

		};
	};

	self.hit = function() {};

	self.stand = function() {};

	self.divide = function() {};

	self.double = function() {};

	self.resolve = function() {};

} 

function Deck (){
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
//deck.deckRandom();

function Play() {
	var self = this;

	self.getCard = function(deck) {};

	self.getPlayValue = function(array) {};

	self.dealerCards = [];
	self.playerCards = [];

	self.revealed = false;
	self.userPlay;
	self.dealerPlay;
}