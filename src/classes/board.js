class Board {
    constructor(length) {
        this.board = new Array(length).fill(null).map(() => new Array(length).fill('*'));
        this.boardLength = length;
        this.token = '*';
        this.numTrys = 8;
    }

    printBoard() {
        for (let i = 0; i <= this.board.length; i++) {
            if (i === 0) {
                process.stdout.write("  ");
            } else {
                process.stdout.write(i + " ");
            }
        }
        console.log();
        for (let row = 0; row < this.boardLength; row++) {
            process.stdout.write((row + 1) + " ");
            for (let col = 0; col < this.boardLength; col++) {
                process.stdout.write(this.board[row][col] + " ");
            }
            console.log();
        }
    }

    reportHit(row, col) {
        let msg = '';
        if (this.board[row][col] === 'X') {
            msg = "You already hit there, guess again";
        } else {
            this.board[row][col] = 'X';
            msg = 'HIT!'
        }
        return msg;
    }

    reportMiss(row, col) {
        let msg = '';
        if (this.board[row][col] === 'O') {
            msg = "You already guessed there, guess again"
        } else {
            if (this.numTrys === 1) {
                msg = "Out of guesses, game over!";
                this.board[row][col] = 'O'
                this.numTrys--;
            } else {
                msg = "MISS!";
                this.board[row][col] = 'O';
                this.numTrys--;
            }
        }

        return msg;
    }
}


export default Board;