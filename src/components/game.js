/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";
import '../css/main.css';

export default function Game(props) {
    const [boardState, setBoardState] = useState(props.board);
    const [opponentBoardState, setOpponentBoardState] = useState(props.opponentBoard);
    const [update, setUpdate] = useState(false);

    function handleClick(row, col, e) {
        let updatedOBoard = opponentBoardState;
        let updatedBoard = boardState;

        if (updatedOBoard.isHit(row, col)) {
            if (updatedBoard.board[row][col] !== 'X') {
                updatedOBoard.decrementShip(row, col);
                setOpponentBoardState(updatedOBoard);
                
            }
            updatedBoard.reportHit(row, col);
            setBoardState(updatedBoard);
        } 
        else 
        {
            updatedBoard.reportMiss(row, col);
            setBoardState(updatedBoard);
        }
        console.log(boardState);
        setUpdate(!update);
    }

    useEffect(() => {
        setBoardState(props.board);
        setOpponentBoardState(props.opponentBoard);
    }, [props.board, props.opponentBoard, update]);
    
    return(
        <div>
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
        </div>
    );
}
