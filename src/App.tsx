import { useState } from "react";

interface Tictactoe {
	id: number;
	tictactoe: string;
}

interface Score {
	X: number;
	O: number;
}

function App() {
	const [tictactoes, setTictactoes] = useState<Tictactoe[]>([
		{ id: 1, tictactoe: "" },
		{ id: 2, tictactoe: "" },
		{ id: 3, tictactoe: "" },
		{ id: 4, tictactoe: "" },
		{ id: 5, tictactoe: "" },
		{ id: 6, tictactoe: "" },
		{ id: 7, tictactoe: "" },
		{ id: 8, tictactoe: "" },
		{ id: 9, tictactoe: "" },
	]);

	const [turn, setTurn] = useState<string>("O");
	const [score, setScore] = useState<Score>({
		X: 0,
		O: 0,
	});

	const [diss, setDiss] = useState<boolean>(false);

	const checkWinner = (tictactoes: Tictactoe[], player: string): boolean => {
		const winSchema = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9],
			[3, 5, 7],
		];

		for (const schema of winSchema) {
			if (
				schema.every(
					(pos) =>
						tictactoes.find((item) => item.id === pos)?.tictactoe === player
				)
			) {
				return true;
			}
		}

		return false;
	};

	const playGameHandler = (id: number) => {
		setTictactoes((prev: Tictactoe[]) => {
			const updatedTictactoes = prev.map((item) =>
				item.id === id ? { ...item, tictactoe: turn } : item
			);

			if (checkWinner(updatedTictactoes, turn)) {
				setScore((prevScore) => ({
					...prevScore,
					[turn]: prevScore[turn as keyof Score] + 1,
				}));
				setDiss(true);
				setTimeout(() => {
					resetGame("reset");
					setDiss(false);
				}, 600);
			}

			const nextTurn = turn === "X" ? "O" : "X";
			setTurn(nextTurn);

			return updatedTictactoes;
		});
	};

	const resetGame = (type: string) => {
		if (type === "reset") {
			setTictactoes((prev: Tictactoe[]) =>
				prev.map((item) => ({ ...item, tictactoe: "" }))
			);
			return;
		} else {
			setTictactoes((prev: Tictactoe[]) =>
				prev.map((item) => ({ ...item, tictactoe: "" }))
			);
			setScore({
				X: 0,
				O: 0,
			});
			return;
		}
	};

	return (
		<>
			<div className="container flex items-center justify-center h-screen mx-auto">
				<div className="flex flex-col">
					<h1 className="mb-4 text-3xl font-bold text-center text-secondary">
						TICTACTOE Games
					</h1>
					<div className="flex justify-center gap-4">
						<div className="grid grid-cols-3 gap-4 p-4 rounded-md bg-primary">
							{tictactoes.map(({ id, tictactoe }) => {
								console.log(tictactoe);
								return (
									<button
										className="flex items-center justify-center text-5xl rounded-md cursor-pointer size-24 bg-secondary text-for-text"
										key={id}
										onClick={() => {
											if (!tictactoe) playGameHandler(id);
										}}
										disabled={diss}
									>
										{tictactoe}
									</button>
								);
							})}
						</div>
						<div className="flex gap-4 p-4 rounded-md bg-primary h-fit">
							<div className="p-2 rounded-md bg-secondary">
								X Score: {score.X}
							</div>
							<div className="p-2 rounded-md bg-secondary">
								O Score: {score.O}
							</div>
						</div>
					</div>
					<div className="flex justify-center gap-4 mt-4">
						<button
							className="p-2 font-bold rounded-md bg-primary text-secondary"
							onClick={() => resetGame("reset")}
						>
							Restart
						</button>
						<button
							className="p-2 font-bold rounded-md bg-primary text-secondary"
							onClick={() => resetGame("")}
						>
							New Game
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
