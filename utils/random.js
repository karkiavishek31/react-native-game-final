import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getPipeSizePosPair = (addToPosY = 0) => {
	// let yPosTop = -getRandom(300, windowHeight - 100);
	let xPosLeft = getRandom(50, windowWidth / 2 - 10);
	let xPosRight = getRandom(200, 400);
	let leftSize = getRandom(50, 80);
	let rightSize = getRandom(50, 60);
	let enemyPos = getRandom(50, 350);
	let pointsPos = getRandom(50, 300);
	const leftObstacle = {
		pos: {
			x: xPosLeft,
			y: 0 - addToPosY,
		},
		size: { height: leftSize, width: leftSize },
	};
	const rightObstacle = {
		pos: {
			x: xPosRight,
			y: 0 - addToPosY,
		},
		size: { height: rightSize, width: rightSize },
	};
	const enemy = {
		pos: {
			x: enemyPos,
			y: 0,
		},
		size: { height: 50, width: 50 },
	};
	const points = {
		pos: {
			x: pointsPos,
			y: 0,
		},
		size: { height: 50, width: 50 },
	};
	return { leftObstacle, rightObstacle, enemy, points };
};
