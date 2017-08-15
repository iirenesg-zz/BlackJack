var config = {

	view: {
		msgDisplay: document.getElementById('msgDisplay'),
		dealBtn: document.getElementById('dealBtn'),
		playDisplay: document.getElementById('playDisplay'),
		userCountDisplay: document.getElementById('userCountDisplay'),
		dealerCountDisplay: document.getElementById('dealerCountDisplay'),
		userCardFront: document.getElementById('userCardFront'),
		userCardBack: document.getElementById('userCardBack'),
		dealerCardFront: document.getElementById('dealerCardFront'),
		dealerCardBack: document.getElementById('dealerCardBack'),
		betDisplay: document.getElementById('betDisplay'),
		balanceDisplay: document.getElementById('balanceDisplay'),
		chip1: document.getElementById('chip1'),
		chip5: document.getElementById('chip5'),
		chip25: document.getElementById('chip25'),
		chip100: document.getElementById('chip100'),
		chipContainer: document.getElementById('chipContainer'),
		resetBetBtn: document.getElementById('resetBetBtn'),
		hitBtn: document.getElementById('hitBtn'),
		standBtn: document.getElementById('standBtn'),
		continueBtn: document.getElementById('continueBtn'),
		userCardsDisplay: document.getElementById('userCardsDisplay'),
		dealerCardsDisplay: document.getElementById('dealerCardsDisplay'),
	},

	model: {
		balance: 1000
	}

}

var game = Game();

(function init() {
	game.init(config);
})();