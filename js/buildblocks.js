function cardFactory(value) {

	if (value == 'A') {

		return new Ace(value);

	} else if (value == 'J' || 'Q' || 'K') {

		return new FaceCard(value);

	} else {

		return new RegularCard(value);

	}

	function Ace(value) {}

	function FaceCard(value) {}

	function RegularCard(value) {}

}

function Play() {

	var play = {};

	play.dealerUpCard;
	play.dealerDownCard;

	play.playerUpCard;
	play.playerDownCard;

	if(playerUpCard.value == playerDownCard.value) {}

	if(dealerUpCard.value == 'A') {}

	return play;

}