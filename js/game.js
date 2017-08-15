var Game = function () {

	/**
	 * Sets instances of the model, view and controller
	 * Initializes game
	 *
	 * @param      {object}  config  DOM elements and model configuration
	 */
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