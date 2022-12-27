import "./App.css";
import { useState } from "react";
import "./index.css";

// 3rd party imports
import styled from "styled-components";

function App() {
	const [input, setInput] = useState("");
	const [todoList, setTodolist] = useState([]);
	const [completedTaskCount, setCompletedTaskCount] = useState(0);

	// Set Todo
	const handleClick = () => {
		const id = todoList.length + 1;
		setTodolist((prev) => [
			...prev,
			{
				id: id,
				task: input,
				complete: false,
			},
		]);
		setInput("");
	};

	// Display List of Tasks
	const handleComplete = (id) => {
		let list = todoList.map((task) => {
			let item = {};
			if (task.id === id) {
				if (!task.complete) {
					setCompletedTaskCount(completedTaskCount + 1);
				} else {
					setCompletedTaskCount(completedTaskCount - 1);
				}
				item = { ...task, complete: !task.complete };
			} else item = { ...task };
			return item;
		});
		setTodolist(list);
	};
	return (
		<>
			<Container>
				<div>
					<Title>Project Todo List</Title>
					<InputContainer>
						<Text
							value={input}
							onInput={(e) => setInput(e.target.value)}
						/>
						<Button onClick={() => handleClick()}>Add</Button>
					</InputContainer>
					<Tasks>
						<TaskCount>
							<b>Pending Tasks</b>{" "}
							{todoList.length - completedTaskCount}
						</TaskCount>
						<TaskCount>
							<b>Completed Tasks</b> {completedTaskCount}
						</TaskCount>
					</Tasks>
					<div>
						<ul>
							{todoList.map((todo) => {
								return (
									<li
										complete={todo.complete}
										id={todo.id}
										onClick={() => handleComplete(todo.id)}
										style={{
											listStyle: "none",
											textDecoration:
												todo.complete && "line-through",
										}}
									>
										{todo.task}
									</li>
								);
							})}
						</ul>
					</div>
					{/* <Button>Clear</Button> */}
				</div>
			</Container>
		</>
	);
}

export default App;

// Styles
const Container = styled.div`
	margin: auto;
	width: 50%;
	max-width: 900px;
`;

const Title = styled.h1`
	text-align: center;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;
const Button = styled.button`
	padding: 0px 15px 0px 15px;
	margin-left: 20px;
	border: none;
	background-color: purple;
	color: white;
	border-radius: 30px;
	cursor: pointer;
`;
const Text = styled.input`
	border-radius: 40px;
	border: 1px solid grey;
	height: 3rem;
	width: 15rem;
`;
const TaskCount = styled.span`
	margin: 10px;
`;
const Tasks = styled.div``;
