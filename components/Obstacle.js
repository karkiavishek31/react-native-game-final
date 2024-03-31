import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";
const Obstacle = (props) => {
	const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
	const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
	const xBody = props.body.position.x - widthBody / 2;
	const yBody = props.body.position.y - heightBody / 2;
	const color = props.color;
	return (
		<View
			style={{
				borderWidth: 1,
				backgroundColor: color,
				borderStyle: "solid",
				position: "absolute",
				left: xBody,
				top: yBody,
				width: widthBody,
				height: heightBody,
			}}
		>
			<Image
				source={props.imageSource}
				resizeMode="cover"
				style={{ width: "100%", height: "100%" }}
			/>
		</View>
	);
};
export default (world, label, color, pos, size, imageSource = null) => {
	const initialObstacle = Matter.Bodies.rectangle(
		pos.x,
		pos.y,
		size.width,
		size.height,
		{ label, isStatic: true }
	);
	Matter.World.add(world, initialObstacle);
	return {
		body: initialObstacle,
		color,
		pos,
		imageSource,
		renderer: <Obstacle />,
	};
};
