import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "./utils/random";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get('window').height
//const windowWidth = Dimensions.get('window').width

const Physics = (entities, { touches, time, dispatch, events }) => {
	let engine = entities.physics.engine;
	// let Square = entities.Square;
	// let Floor = entities.Floor;
	// let world = entities.physics.world;

	//Resetting the game
	//check if the events array contains the game_over event
	if (events.some((e) => e.type === "restart")) {
		const pipeSizePosA = getPipeSizePosPair();
		const pipeSizePosB = getPipeSizePosPair();
		const pipeSizePosC = getPipeSizePosPair(200);
		const pipeSizePosD = getPipeSizePosPair(500);

		Matter.Body.setPosition(
			entities[`ObstacleLeft1`].body,
			pipeSizePosA.leftObstacle.pos
		);
		Matter.Body.setPosition(
			entities[`ObstacleLeft3`].body,
			pipeSizePosC.leftObstacle.pos
		);
		Matter.Body.setPosition(
			entities[`ObstacleRight2`].body,
			pipeSizePosB.rightObstacle.pos
		);
		Matter.Body.setPosition(
			entities[`ObstacleRight4`].body,
			pipeSizePosD.rightObstacle.pos
		);

		for (let index = 1; index <= 2; index++) {
			Matter.Body.setPosition(
				entities[`Enemy${index}`].body,
				getPipeSizePosPair().enemy.pos
			);
		}
		Matter.Body.setPosition(
			entities[`points`].body,
			getPipeSizePosPair().points.pos
		);
	}

	//Left and right controls
	if (events.length) {
		for (let i = 0; i < events.length; i++) {
			if (events[i].type === "left") {
				Matter.Body.setVelocity(entities.Square.body, {
					x: -5,
					y: -4,
				});
			} else if (events[i].type === "right") {
				Matter.Body.setVelocity(entities.Square.body, {
					x: 5,
					y: -4,
				});
			}
		}
	}

	touches
		.filter((t) => t.type === "press")
		.forEach((t) => {
			Matter.Body.setVelocity(entities.Square.body, {
				x: 0,
				y: -5,
			});
		});

	Matter.Engine.update(engine, time.delta);

	for (let index = 1; index <= 4; index++) {
		if (
			entities[`ObstacleLeft${index}`].body.bounds.max.y >= windowHeight
		) {
			const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
			Matter.Body.setPosition(
				entities[`ObstacleLeft${index}`].body,
				pipeSizePos.leftObstacle.pos
			);

			Matter.Body.setPosition(
				entities[`ObstacleRight${index}`].body,
				pipeSizePos.rightObstacle.pos
			);
		}
		Matter.Body.translate(entities[`ObstacleLeft${index}`].body, {
			x: 0,
			y: 3,
		});

		Matter.Body.translate(entities[`ObstacleRight${index}`].body, {
			x: 0,
			y: 3,
		});
	}
	//Enemy
	let enemySpeed = 3;
	for (let index = 1; index <= 2; index++) {
		Matter.Body.translate(entities[`Enemy${index}`].body, {
			x: 0,
			y: Math.floor(Math.random() * (5 - 2 + 1) + 2),
			// y: enemySpeed,
		});
		if (entities[`Enemy${index}`].body.bounds.max.y >= windowHeight) {
			// enemySpeed = Math.floor(Math.random() * (5 - 2 + 1) + 2);
			Matter.Body.setPosition(
				entities[`Enemy${index}`].body,
				getPipeSizePosPair().enemy.pos
			);
		}
	}
	//Points
	Matter.Body.translate(entities[`points`].body, {
		x: 0,
		y: 2,
	});
	if (entities[`points`].body.bounds.max.y >= windowHeight) {
		Matter.Body.setPosition(
			entities[`points`].body,
			getPipeSizePosPair().points.pos
		);
	}

	// Matter.Body.translate(entities[`ObstacleLeft1`].body, { x: -3, y: 0 });

	// Matter.Body.translate(entities[`ObstacleLeft2`].body, { x: -3, y: 0 });

	// Matter.Events.on(engine, "collisionStart", (event) => {
	// 	dispatch({ type: "game_over" });
	// });

	// Matter.Events.on(engine, "collisionStart", (event) => {
	// 	dispatch({ type: "game_over" });
	// });

	Matter.Events.on(engine, "collisionStart", (event) => {
		const pairs = event.pairs;

		// Check for collision between Square and BottomBoundary
		const objA = pairs[0].bodyA.label;
		const objB = pairs[0].bodyB.label;

		if (
			(objA === "Square" && objB === "BoundaryBottom") ||
			(objB === "Square" && objA === "BoundaryBottom") ||
			(objA === "Square" && objB === "Enemy1") ||
			(objB === "Square" && objA === "Enemy1") ||
			(objA === "Square" && objB === "Enemy2") ||
			(objB === "Square" && objA === "Enemy2")
		) {
			dispatch({ type: "game_over" });
		}
		// else if (
		// 	(objA === "Square" && objB === "points") ||
		// 	(objB === "Square" && objA === "points")
		// ) {
		// 	Matter.Body.setVelocity(entities.Square.body, {
		// 		x: -5,
		// 		y: -5,
		// 	});
		// 	Matter.Body.setPosition(
		// 		entities[`points`].body,
		// 		getPipeSizePosPair().points.pos
		// 	);
		// 	dispatch({ type: "new_point" });
		// }
	});
	return entities;
};
export default Physics;
