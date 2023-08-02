import PlayerInterface from "shared/schemas/player/player.schema";

import { Players } from "@rbxts/services";
import { Initalize, Start } from "shared/core-framework/core";

import Character from "./character/character";
import Network from "shared/core-framework/networking/network";
import World from "../world";

/* The `class PlayerImplementation` is creating a new class called `PlayerImplementation` that extends
the `ClassImplementation` class and implements the `PlayerInterface` interface. This means that the
`PlayerImplementation` class inherits all the properties and methods of the `ClassImplementation`
class and must implement all the methods defined in the `PlayerInterface` interface. The
`PlayerImplementation` class is used to create instances of players in the game and perform
operations on them. */

class PlayerImplementation implements PlayerInterface {
	player : Player
	character: Character;

	/**
	 * This is a constructor function that takes a player object as a parameter and sets the class
	 * implementation type to dynamic render.
	 * @param {Player} player - The `player` parameter is an instance of the `Player` class that is
	 * passed to the constructor of another class. It is likely used within the class to perform some
	 * operations or to access properties and methods of the `Player` instance...
	 */
	
	constructor(player: Player) {
		this.player = player;

		// Creating decendant literals:
		this.character = new Character(this);
	}

	/**
	 * The function returns the player.
	 * @returns The `getPlayer()` function is returning the value of `this.player.`
	 */

	getPlayer() {
		return this.player
	}
}

/* The PlayerModule class listens for new players being added and creates a new PlayerImplementation
instance for each one.*/

class PlayerModule implements Start, Initalize {
	network: Network | undefined;

	constructor(private world: World) {};

	/* `Start() {` is defining a method called `Start` within the `PlayerModule` class. This method is
	used to listen for new players being added to the game and create a new `PlayerImplementation`
	instance for each one. The `Players.PlayerAdded.Connect()` function is used to listen for new
	players being added, and when a new player is added, the `PlayerImplementation` constructor is
	called with the new player object as a parameter to create a new instance of the
	`PlayerImplementation` class.*/
	Start() {
		/* `Players.PlayerAdded.Connect((player: Player) => { new PlayerImplementation(player); });` is a
		listener that listens for new players being added to the game. When a new player is added, the
		`PlayerImplementation` constructor is called with the new player object as a parameter to create a
		new instance of the `PlayerImplementation` class. This allows the server to create a new instance
		of the `PlayerImplementation` class for each player that joins the game..*/

		Players.PlayerAdded.Connect((player: Player) => {
			new PlayerImplementation(player);
		});
	}

	Initalize() {
		interface Event { param1: string; }
		
		this.network = new Network()
			.createRemoteEvent<Event>();
	}
}

export { PlayerModule, PlayerImplementation }