import React from "react";
import PropTypes from "prop-types";

export class ToDoList extends React.Component {
	//Sets initial state for webpage
	constructor() {
		super();
		this.state = {
			tasks: ["Laundry", "Groceries", "C.R.E.A.M."],
			input: ""
		};
	}

	componentDidMount = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/swarfman")
			.then(res => res.json())
			.then(yoyo => {
				let x = this.state.tasks;
				this.setState({ tasks: yoyo });
			});
	};
	//adding the user's task into the ToDoList
	enterFunction = e => {
		if (e.key === "Enter") {
			var userInput = document.getElementById("listInput").value;
			//console.log(userInput);
			let tempObject = { label: userInput, done: false };
			let userCreatedArrayValue = this.state.tasks;
			userCreatedArrayValue.push(tempObject);
			// console.log(userCreatedArrayValue);
			this.setState({ tasks: userCreatedArrayValue });
		}
	};

	//delete whatever task from the ToDoList
	deleteElementFunction = index => {
		let removeUserCreatedArrayValue = this.state.tasks;
		removeUserCreatedArrayValue[index].done = true;
		//removeUserCreatedArrayValue.push(tempObject);
		this.setState({ tasks: removeUserCreatedArrayValue });
	};

	render() {
		return (
			<div className="row justify-content-center">
				<div className="centeredContent col-8 justify-content-center text-center">
					<div className="title">
						<h1>ToDo</h1>
					</div>
					<div className="inputForm">
						<input
							id="listInput"
							size="110"
							onKeyPress={this.enterFunction}
							placeholder="What do you want to do?"
						/>
					</div>
					<ul className="Unordered List">
						{this.state.tasks.map((elem, index) => {
							return (
								<li
									className="d-flex justify-content-between"
									key={index}>
									{elem.label}
									{elem.done && " 	Done!"}
									<button
										onClick={() =>
											this.deleteElementFunction(index)
										}
										id="x">
										<i className="far fa-check-circle" />
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}
ToDoList.propTypes = {
	key: PropTypes.number
};
