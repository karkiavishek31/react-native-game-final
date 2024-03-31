import Matter from "matter-js";
import React from "react";
import { Dimensions, View, Image } from "react-native";

const BoundaryRight = (props) => {
	const width = props.body.bounds.max.x - props.body.bounds.min.x;
	const height = props.body.bounds.max.y - props.body.bounds.min.y;
	const xPos = props.body.position.x - width / 2;
	const yPos = props.body.position.y - height / 2;

	return (
		<View
			style={{
				position: "absolute",
				left: xPos,
				top: yPos,
				width: width,
				height: height,
				backgroundColor: props.color,
			}}
		>
			<Image
				source={require("../images/block.jpeg")} // Update the path to where your image is located
				resizeMode="cover" // Cover the entire boundary area; you can adjust this as needed
				style={{
					width: "100%",
					height: "100%",
				}}
			/>
		</View>
	);
};

export default (world, color, pos, size) => {
	const boundary = Matter.Bodies.rectangle(
		pos.x,
		pos.y,
		size.width,
		size.height,
		{
			label: "BoundaryRight",
			isStatic: true,
		}
	);
	Matter.World.add(world, boundary);
	return { body: boundary, color, pos, renderer: <BoundaryRight /> };
};
