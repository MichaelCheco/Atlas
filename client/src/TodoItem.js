import React from 'react';
function TodoItem({ item }) {
	if (!item) {
		return <p>no items ...</p>;
	}
	return (
		<p>
			{item.task} {'🚀'}
		</p>
	);
}
export default TodoItem;
