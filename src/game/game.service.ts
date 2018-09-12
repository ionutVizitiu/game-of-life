import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  numberOfCellsInRow: number;
  framesPerSecond: number;
  cellSize: number;
  animatingTimeout: any;
  requestAnimationId: number;
  private animationTimeout: any;

  initState(numberOfCellsInRow: number, framesPerSecond: number) {
    this.numberOfCellsInRow = numberOfCellsInRow;
    this.framesPerSecond = framesPerSecond;
  }

  stopAnimation() {
    clearTimeout(this.animatingTimeout);
  }

  generation(ctx, grid, width, height, autoplay) {
    this.cellSize = width / this.numberOfCellsInRow;
    ctx.clearRect(0, 0, width, height);
    this.drawGrid(ctx, grid);
    const gridOfNextGeneration = this.getNextGeneration(grid);

    if (autoplay) {
      this.animationTimeout = setTimeout(() => {
        requestAnimationFrame(
          () => this.generation(ctx, gridOfNextGeneration, width, height, autoplay)
        );
      }, 1000 / this.framesPerSecond);
    }

    return gridOfNextGeneration;
  }

  stopAutoplay() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      // cancelAnimationFrame(this.requestAnimationId);
      // this.requestAnimationId = undefined;
    }
  }

  getGrid(random?: boolean) {
    const grid = new Array(this.numberOfCellsInRow);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(this.numberOfCellsInRow);
      for (let j = 0; j < grid.length; j++) {
        grid[i][j] = random ? Math.floor(Math.random() * 2) : 0;
      }
    }

    return grid;
  }

  getNextGeneration(grid) {
    const nextGrid = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
      nextGrid[i] = new Array(grid.length);
      for (let j = 0; j < nextGrid[i].length; j++) {
        const value = grid[i][j];
        const neighbors = this.countNeighbors(grid, i, j);
        if (value === 0 && neighbors === 3) {
          nextGrid[i][j] = 1;
        } else if (
          (value === 1) &&
          (neighbors < 2 || neighbors > 3)
        ) {
          nextGrid[i][j] = 0;
        } else {
          nextGrid[i][j] = value;
        }
      }
    }
    return nextGrid;
  }

  countNeighbors(grid, x, y) {
    let sum = 0;
    const numberOfRows = grid.length;
    const numberOfCols = grid[0].length;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const row = (x + i + numberOfRows) % numberOfRows;
        const col = (y + j + numberOfCols) % numberOfCols;
        sum += grid[row][col];
      }
    }
    sum -= grid[x][y];
    return sum;
  }

  drawGrid(ctx, grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        const value = grid[i][j];
        if (value) {
          ctx.fillRect(
            i * this.cellSize,
            j * this.cellSize,
            this.cellSize,
            this.cellSize,
          );
        }
        ctx.strokeRect(
          i * this.cellSize,
          j * this.cellSize,
          this.cellSize,
          this.cellSize,
        );
      }
    }
  }

}
