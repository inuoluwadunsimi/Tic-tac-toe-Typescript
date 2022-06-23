import React, { useState} from 'react'
import ReactDOM from 'react-dom';
import "./index.css"





const TicTacToe: React.FC = () => {
	const [turn, setTurn] = useState<string >('x');
	const [cells, setCells] = useState(Array(9).fill(''));
	const [winner, setWinner] = useState<null>();

	const checkForWinner = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		  ];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			  return squares[a];
			}
		  }
		  return null;
	};

	const handleClick = (num:number) => {
		if (cells[num] !== '') {
			alert('already clicked');
			return;
		}

		let squares = [...cells];

		if (turn === 'x') {
			squares[num] = 'x';
			setTurn('o');
		} else {
			squares[num] = 'o';
			setTurn('x');
		}

		checkForWinner(squares);
		setCells(squares);
	};

	const handleRestart = () => {
		setWinner(null);
		setCells(Array(9).fill(''));
	};

	type CellProps ={
        num: number;
	}
	
	const Cell  = ({ num }:CellProps) => {
		return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
	};

	return (
		<div className='container'>
			<table>
				Turn: {turn}
				<tbody>
					<tr>
						<Cell num={0} />
						<Cell num={1} />
						<Cell num={2} />
					</tr>
					<tr>
						<Cell num={3} />
						<Cell num={4} />
						<Cell num={5} />
					</tr>
					<tr>
						<Cell num={6} />
						<Cell num={7} />
						<Cell num={8} />
					</tr>
				</tbody>
			</table>
			{winner && (
				<>
					<p>{winner} is the winner!</p>
					<button onClick={() => handleRestart()}>Play Again</button>
				</>
			)}
		</div>
	);
};



ReactDOM.render(<TicTacToe/>, document.getElementById("root"));