import React from 'react';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';
import { Dialog } from '@reach/dialog';
import { Router, Link, Redirect } from '@reach/router';
import { useStitchStateAuth } from './context/auth-context';
import { useTodoItems } from './components/useTodoItems';
import TodoItem from './TodoItem';
function Nav({ handleLogout }) {
	return (
		<Div>
			<h1>Todo App w/ Mongo</h1>
			<Link to="/items">Items</Link>
			<Link to="/list">List</Link>
			<button onClick={handleLogout}>Logout</button>
		</Div>
	);
}
const Div = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 5px;
	background-color: palevioletred;
`;
function AuthenticatedApp() {
	const { handleLogout } = useStitchStateAuth();
	return (
		<div>
			<Nav handleLogout={handleLogout} />
			<main>
				<Routes />
			</main>
		</div>
	);
}
const Button = styled.button`
	width: 90px;
	height: 35px;
	padding: 3px;
	color: green;
	border: 2px solid black;
`;
function TodoList() {
	const { currentUser } = useStitchStateAuth();
	const [task, setTask] = React.useState('');

	const {
		actions: { addTodo },
	} = useTodoItems(currentUser.id);
	const { items, actions } = useTodoItems(currentUser.id);
	return (
		<>
			<ModalDiv>
				<Modal button={<Button>Add an Item</Button>}>
					<label htmlFor="task">
						<input
							id="task"
							onChange={e => setTask(e.target.value)}
							value={task}
							placeholder="add a new task"
						/>
					</label>
					<Button
						onClick={() => {
							addTodo(task);
							setTask('');
							window.location.reload();
						}}>
						{' '}
						+
					</Button>
				</Modal>
			</ModalDiv>
			<p>Authenticated! now</p>

			{items &&
				items.map(i => {
					return (
						<TodoItem
							key={i._id.toString()}
							item={i}
							toggleStatus={() => actions.toggleTodoStatus(i._id)}
						/>
					);
				})}
		</>
	);
}
function Modal({ button, children }) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<ModalDiv>
			{React.cloneElement(button, { onClick: () => setIsOpen(true) })}
			<Dialog isOpen={isOpen}>
				<div css={{ display: 'flex', justifyContent: 'flex-end' }}>
					<CircleButton onClick={() => setIsOpen(false)}>
						<VisuallyHidden>Close</VisuallyHidden>
						<span aria-hidden>×</span>
					</CircleButton>
				</div>
				{children}
			</Dialog>
		</ModalDiv>
	);
}
const ModalDiv = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5px;
`;
const CircleButton = styled.button({
	borderRadius: '30px',
	padding: '0',
	width: '40px',
	height: '40px',
	lineHeight: '1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: ' red',
	color: 'yellow',
	border: `1px solid orange`,
	cursor: 'pointer',
});
function Redirector() {
	return <Redirect to="/list" />;
}
function Routes() {
	return (
		<Router>
			<Redirector path="/" />
			<TodoList path="/list" />
			<TodoItem path="/items" />
		</Router>
	);
}

export default AuthenticatedApp;
