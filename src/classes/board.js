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
        if (this.board[row][col] === 'X') {
            console.log("\nYou already hit there, guess again\n");
        } else {
            this.board[row][col] = 'X';
        }
    }

    reportMiss(row, col) {
        if (this.board[row][col] === 'O') {
            console.log("\nYou already guessed there, guess again\n");
        } else {
            if (this.numTrys === 1) {
                console.log("\nOut of guesses, game over!\n");
                this.numTrys--;
            } else {
                console.log("\nMISS!\n");
                this.board[row][col] = 'O';
                this.numTrys--;
            }
        }
    }
}


export default Board;