import React from "react";
import PropTypes from "prop-types";

export class ToDoList extends React.Component {
	//Sets initial state for webpage
	constructor() {
		super();
		this.state = {
			tasks: ["Laundry", "Groceries", "C.R.E.A.M."],
			input: "",
			user: ""
		};
	}

	componentDidMount = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/swarfman")
			.then(res => res.json())
			.then(response => {
				console.log("Success:", typeof response);
				if (response === "") {
					this.setState({ tasks: response });
				} else {
					this.setState({ tasks: [] });
				}
			})

			.catch(error => console.error("Error:", error));
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

	deleteFunction = k => {
		let deleteUserCreatedArrayValue = this.state.tasks;
		deleteUserCreatedArrayValue.splice(k, 1);
		var url = "https://assets.breatheco.de/apis/fake/todos/user/swarfman";

		fetch(url, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(deleteUserCreatedArrayValue), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				return res.text();
			})
			.then(response => {
				console.log("Success:", typeof response);
				if (response === "") {
					this.setState({ tasks: deleteUserCreatedArrayValue });
				}
			})

			.catch(error => console.error("Error:", error));
	};

	//Mark task as done
	checkElementFunction = index => {
		let checkUserCreatedArrayValue = this.state.tasks;
		checkUserCreatedArrayValue[index].done = true;

		var url = "https://assets.breatheco.de/apis/fake/todos/user/swarfman";

		fetch(url, {
			method: "PUT", // or 'PUT'
			body: JSON.stringify(checkUserCreatedArrayValue), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				return res.text();
			})
			.then(response => {
				console.log("Success:", typeof response);
				if (response === "") {
					this.setState({ tasks: checkUserCreatedArrayValue });
				}
			})

			.catch(error => console.error("Error:", error));
		//removeUserCreatedArrayValue.push(tempObject);
	};

	addUser = a => {
		if (a.key === "Enter") {
			console.log(a);
			var userInput1 = document.getElementById("userNameInput").value;
			//console.log(userInput1);
			var url =
				"https://assets.breatheco.de/apis/fake/todos/user/" +
				userInput1;

			fetch(url, {
				method: "POST", // or 'POST'
				body: JSON.stringify([]), // data can be `string` or {object}!
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => {
					return res.text();
				})
				.then(response => {
					console.log("Success:", typeof response);
					if (response === "") {
						this.state.user;
						fetch(url)
							.then(res => res.json())
							.then(pop => {
								let x = this.state.tasks;
								this.setState({ tasks: pop });
							});
					}
				})

				.catch(error => console.error("Error:", error));
		}
	};

	render() {
		return (
			<div>
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
										<div className="d-flex flex-row-reverse">
											<button
												onClick={() =>
													this.deleteFunction(index)
												}
												id="x">
												<i className="far fa-trash-alt" />
											</button>
											<button
												onClick={() =>
													this.checkElementFunction(
														index
													)
												}
												id="x">
												<i className="far fa-check-circle" />
											</button>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-4 bg-dark mt-3 p-3">
						<h6 className="text-white">Create New User Here</h6>
						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<span
									className="input-group-text"
									id="basic-addon1">
									@
								</span>
							</div>
							<input
								type="text"
								className="form-control"
								id="userNameInput"
								placeholder="Username"
								aria-label="Username"
								aria-describedby="basic-addon1"
								onKeyPress={this.addUser}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
ToDoList.propTypes = {
	key: PropTypes.number
};
