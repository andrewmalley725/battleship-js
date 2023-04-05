/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import '../css/main.css';

export default function Game(props) {
    const [boardState, setBoardState] = useState(props.board);
    const [opponentBoardState, setOpponentBoardState] = useState(props.opponentBoard);
    const [update, setUpdate] = useState(false);
    const [msg, setMsg] = useState("Push a token to start");

    function handleClick(row, col, e) {
        let mst = '';
        let updatedOBoard = opponentBoardState;
        let updatedBoard = boardState;

        if (updatedOBoard.isHit(row, col)) {
            if (updatedOBoard.gameOver())
            {
                setMsg('Game over, you win!');
            }

            else if (updatedBoard.board[row][col] !== 'X') {
                mst = updatedOBoard.dShipOut(row, col);
                updatedOBoard.decrementShip(row, col);
                setOpponentBoardState(updatedOBoard);
            }
            
            else
            {
                mst = updatedBoard.reportHit(row, col); 
            }
            updatedBoard.reportHit(row, col);
            setBoardState(updatedBoard);
        } 
        else 
        {
            mst = updatedBoard.reportMiss(row, col);
            updatedBoard.reportMiss(row, col);
            setBoardState(updatedBoard);
        }
        setMsg(mst);
        setUpdate(!update);
    }

    useEffect(() => {
        setBoardState(props.board);
        setOpponentBoardState(props.opponentBoard);
    }, [props.board, props.opponentBoard, update, msg]);
    
    return(
        <div>
            <p>{msg}</p>
            {
                msg !== "Out of guesses, game over!" && msg !== 'Game over, you win!' ?
                    <table key={JSON.stringify(boardState) + JSON.stringify(opponentBoardState)} style={{width: "40%", margin: "0 auto"}}>
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}}></th>
                                {
                                    boardState.board[0].map((col, ci) => {
                                        return (<th style={{textAlign: "center"}} key={ci}>{ci + 1}</th>);
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                boardState.board.map((row, ri) => {
                                    return(
                                        <tr key={ri}>
                                            <th style={{textAlign: "center"}}>{ri + 1}</th>
                                            {
                                                row.map((col, index) => {
                                                    return(
                                                        <td key={index}>
                                                            <a href="#" onClick={(e) => handleClick(ri, index, e)}>{row[index] + ' '}</a>
                                                        </td>
                                                    );
                                                })
                                            }
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                : <>
                    <table style={{width: "40%", margin: "0 auto"}}>
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}}></th>
                                {
                                    opponentBoardState.board[0].map((col, ci) => {
                                        return (<th style={{textAlign: "center"}} key={ci}>{ci + 1}</th>);
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                opponentBoardState.board.map((row, ri) => {
                                    return(
                                        <tr key={ri}>
                                            <th style={{textAlign: "center"}}>{ri + 1}</th>
                                            {
                                                row.map((col, index) => {
                                                    return(
                                                        <td key={index}>
                                                            {row[index] + ' '}
                                                        </td>
                                                    );
                                                })
                                            }
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <button onClick={() => window.location.reload()}>Restart</button>
                </>
            }
        </div>
    );
}
