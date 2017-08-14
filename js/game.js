var Game = function () {

	function init(config) {
		var gameData = new GameModel(config.model);
		var UI = new GameView(config.view);
		var gameHandler = new GameController(gameData, UI);

		gameHandler.init();
	}

	return {
		init: init
	}

}