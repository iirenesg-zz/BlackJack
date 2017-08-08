function Dealer() {
	var self = this;

	self.execute = function (name) {
	    return self[name] && self[name].apply(self, [].slice.call(arguments, 1) );
	};
	
	self.deal = function(state) {

		state.currentPlay = new Play();

		var dealerCards = state.currentPlay.dealerCards;

		var playerCards = state.currentPlay.playerCards;

		var deck = state.deck;

		for (var i = 0; i < deck.cards.length; i++) {

			//Push Cards to Dealer Hand and Delete from Deck
			if (dealerCards.length < 2) {
				var card = deck.cards[i];
				deck.cards.splice(i, 1)
				dealerCards.push(card);
			};

			//Push Cards to Player Hand and Delete from Deck
			if (playerCards.length < 2) {
				var card = deck.cards[i];
				deck.cards.splice(i, 1)
				playerCards.push(card);
				if (playerCards[i].name == 'A') {state.currentPlay.aced = true;}
			};

		};
	};

	/**
	 * Hit function to request a new card
	 * Command pattern
	 * @return  {function} new card for dealer array  
	 */
	self.hit = function(state, currentPlayer) {

		//var deckLength = deck.cards.length;
		var dealerCards = state.currentPlay.dealerCards;
		var playerCards = state.currentPlay.playerCards;

		var deck = state.deck;

		if (currentPlayer == 'player') {


			//Next Card, push New Card to Player Hand
			if (playerCards.length <= 4) {

				var card = deck.cards[0];
				deck.cards.splice(0, 1);
				playerCards.push(card);

				return true;

			} else {
				return false;
			}
		} else {
			var card = deck.cards[0];
			deck.cards.splice(0, 1)

			//Next Card, push New Card to Dealer Hand
			if (dealerCards.length <= 4) {
				dealerCards.push(card);
			};
		}

		
	};

	self.stand = function() {};

	self.divide = function() {};

	self.double = function() {};

	self.resolve = function() {};

} 

function Deck (state){

	this.cards = [];
	this.numCards = 0;

	//Card values
	var suits = ["spade", "diamond", "heart", "club"];
	var names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1];

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

function Play() {
	var self = this;

	self.getCard = function(deck) {};

	self.getPlayValue = function(array) {};

	self.dealerCards = [];
	self.playerCards = [];

	self.revealed = false;
	self.aced = false; 
	self.userTotal = 0;
	self.acedTotal = 0;
	self.dealerTotal = 0;
}