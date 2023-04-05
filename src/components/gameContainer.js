import Board from "../classes/board";
import OpponentBoard from "../classes/opponentBoard";
import Game from "./game";

function GameContainer() {
    const board = new Board(8);
    const opponentBoard = new OpponentBoard(8);

    return (
        <Game board={board} opponentBoard={opponentBoard} />
    );
}

export default GameContainer;