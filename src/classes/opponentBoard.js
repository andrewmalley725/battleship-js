import Board from "./board";
import Ship from "./ship";

class OpponentBoard extends Board {
    constructor(length) {
        super(length);
        this.Ships = [];
        this.orientations = ["HORIZONTAL", "VERTICAL"];
        this.addShips();
    }

    isHit(row, col) {
        if (this.board[row][col] !== this.token) {
            return true;
        }
        return false;
    }

    decrementShip(row, col) {
        const t = this.board[row][col];
        for (const s of this.Ships) {
            if (s.token === t && s.ShipLength > 0) {
                if (s.ShipLength > 1) {
                    s.ShipLength -= 1;
                } else {
                    s.ShipLength -= 1;
                }
            }
        }
    }

    dShipOut(row,col)
    {
        const t = this.board[row][col];
        let msg = '';
        for (const s of this.Ships) {
            if (s.token === t && s.ShipLength > 0) {
                if (s.ShipLength > 1) {
                    msg = "HIT!";
                } else {
                    msg = "You sunk my " + s.name + "!";
                }
            }
        }
        return msg;
    }

    gameOver() {
        for (const ship of this.Ships) {
            if (ship.ShipLength > 0) {
                return false;
            }
        }
        return true;
    }

    canPlace(ship, colStart, rowStart) {
        let vool = true;
    
        if (ship.orientation === "HORIZONTAL") {
            let colEnd;
    
            if (this.board[rowStart][colStart] !== this.token) {
                vool = false;
            } else {
                if (colStart + (ship.ShipLength - 1) <= this.boardLength - 1) {
                    colEnd = colStart + (ship.ShipLength - 1);
                    for (let i = colStart; i <= colEnd; i++) {
                        if (this.board[rowStart][i] !== this.token) {
                            vool = false;
                        }
                    }
                } else {
                    colEnd = colStart - (ship.ShipLength - 1);
                    for (let i = colStart; i >= colEnd; i--) {
                        if (this.board[rowStart][i] !== this.token) {
                            vool = false;
                        }
                    }
                }
            }
        } else {
            let rowEnd;
    
            if (this.board[rowStart][colStart] !== this.token) {
                vool = false;
            } else {
                if (rowStart + (ship.ShipLength - 1) <= this.boardLength - 1) {
                    rowEnd = rowStart + (ship.ShipLength - 1);
                    for (let i = rowStart; i <= rowEnd; i++) {
                        if (this.board[i][colStart] !== this.token) {
                            vool = false;
                        }
                    }
                } else {
                    rowEnd = rowStart - (ship.ShipLength - 1);
                    for (let i = rowStart; i >= rowEnd; i--) {
                        if (this.board[i][colStart] !== this.token) {
                            vool = false;
                        }
                    }
                }
            }
        }
        return vool;
    }
    
    addShips() {
        var battleship = new Ship(4,'B', "BATTLESHIP", "HORIZONTAL");
        this.Ships.push(battleship);
    
        var cruiser = new Ship(3,'C', "CRUISER", "HORIZONTAL");
        this.Ships.push(cruiser);
    
        var destroyer = new Ship(5,'D', "DESTROYER", "HORIZONTAL");
        this.Ships.push(destroyer);
    
        var submarine = new Ship(2,'S', "SUBMARINE", "HORIZONTAL");
        this.Ships.push(submarine);
    
        for (var i = 0; i < this.Ships.length; i++) {
            var randomIndex = Math.floor(Math.random() * this.orientations.length);
            var ship = this.Ships[i];
            ship.orientation = this.orientations[randomIndex];
    
            var rowStart = Math.floor(Math.random() * this.boardLength);
            var colStart = Math.floor(Math.random() * this.boardLength);
            var rowStartCopy = rowStart;
            var colStartCopy = colStart;
            var count = ship.ShipLength;
            var orient = ship.orientation;
    
            while (!this.canPlace(ship, colStart, rowStart)) {
                rowStart = Math.floor(Math.random() * this.boardLength);
                colStart = Math.floor(Math.random() * this.boardLength);
                rowStartCopy = rowStart;
                colStartCopy = colStart;
            }
    
            while (count > 0) {
                this.board[rowStartCopy][colStartCopy] = ship.token;
    
                if (orient === "VERTICAL") {
                    if (((rowStart + (ship.ShipLength - 1) <= this.boardLength - 1) || (rowStart - (ship.ShipLength - 1) >= 0))) {
                        if (rowStart + (ship.ShipLength - 1) < this.boardLength) {
                            rowStartCopy++;
                        } else if ((rowStart - (ship.ShipLength - 1) > -1)) {
                            rowStartCopy--;
                        }
                    }
                } else {
                    if (((colStart + (ship.ShipLength - 1) <= this.boardLength - 1) || (colStart - (ship.ShipLength - 1) >= 0))) {
                        if (colStart + (ship.ShipLength - 1) < this.boardLength) {
                            colStartCopy++;
                        } else if ((colStart - (ship.ShipLength - 1) > -1)) {
                            colStartCopy--;
                        }
                    }
                }
                count--;
            }
        }
    }
    
}

export default OpponentBoard;