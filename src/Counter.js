import React, { useState, useEffect, useRef } from 'react';

const useLocalStorage = (initialState, key) => {
	const get = () => {
		const storage = localStorage.getItem(key);
		if (storage) {
			return JSON.parse(storage);
		}
		return initialState;
	};
	const [value, setValue] = useState(get());
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};

const Counter = () => {
	const [count, setCount] = useLocalStorage(0, 'count');
	const countRef = useRef();

	let message = '';
	if (countRef.current < count) message = 'Higher';
	if (countRef.current > count) message = 'Lower';

	countRef.current = count;
	const increment = () => setCount(c => c + 1);
	const decrement = () => setCount(count - 1);
	const reset = () => setCount(0);
	return (
		<div className="Counter">
			<p className="count">
				{message} : {count}
			</p>
			<section className="controls">
				<button onClick={increment}>Increment</button>
				<button onClick={decrement}>Decrement</button>
				<button onClick={reset}>Reset</button>
			</section>
		</div>
	);
};

export default Counter;
