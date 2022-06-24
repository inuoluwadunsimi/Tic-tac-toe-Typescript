import React, { useState} from 'react'
import ReactDOM from 'react-dom';
import "./index.css"





const TicTacToe: React.FC = () => {
	const [turn, setTurn] = useState<string >('X');
	const [cells, setCells] = useState(Array(9).fill(''));
	const [winner, setWinner] = useState<null|number|string>();


	

	const checkForWinner = (squares:number[]|string) => {
		let combos= {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagnol: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};

		for (let combo in combos) {
			combos[combo as keyof typeof combos].forEach((pattern:number[]) => {
				if (
					squares[pattern[0]] === '' ||
					squares[pattern[1]] === '' ||
					squares[pattern[2]] === ''
				) {
					//  nothing is to be done
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]]);
				}
			});
		}
	};

	const handleClick = (num:number) => {
		if (cells[num] !== '') {
			alert('already clicked');
			return;
		}

		let squares = [...cells];

		if (turn === 'X') {
			squares[num] = 'O';
			setTurn('O');
		} else {
			squares[num] = 'O';
			setTurn('X');
		}

		checkForWinner(squares);
		 const on = setCells(squares);
		 console.log(on);
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
						<Cell  num={0} />
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