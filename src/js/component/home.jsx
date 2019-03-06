import React from "react";
import { ToDoList } from "./ToDoList.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export class Home extends React.Component {
	render() {
		return (
			<div className="container-fluid justify-content-center">
				<ToDoList />
			</div>
		);
	}
}
