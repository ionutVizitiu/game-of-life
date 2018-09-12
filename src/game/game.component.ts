import { Component, ViewChild, ElementRef } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'game-of-life',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;

  private canvasEl: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private grid: any[] = [];
  private autoplayOn = false;

  public canvasWidth = 700;
  public canvasHeight = 700;
  public gridCols = 70;
  public framesPerSecond = 7;
  public cellColor = '#45deb0';
  public cellStrokeColor = '#aaa';
  public canvasPrepared = false;
  public randomCells = true;

  constructor(private gameService: GameService) {}

  loadCanvas() {
    // get the canvas context
    this.canvasEl = this.canvas.nativeElement;
    this.canvasContext = this.canvasEl.getContext('2d');
    this.canvasContext.fillStyle = this.cellColor;
    this.canvasContext.strokeStyle = this.cellStrokeColor;

    // initialize canvas grid
    this.gameService.initState(this.gridCols, this.framesPerSecond);

    // drow the first generation
    this.getGeneration();
    this.canvasPrepared = true;
  }

  getNextGeneration() {
    if (!this.autoplayOn) {
      requestAnimationFrame(() => this.getGeneration());
    }
  }

  startAutoplay() {
    if (!this.autoplayOn) {
      this.autoplayOn = true;
      this.getGeneration();
    }
  }

  stopAutoplay() {
    if (this.autoplayOn) {
      this.autoplayOn = false;
      this.gameService.stopAutoplay();
    }
  }

  /**
   * responsible to return the first or next generation
   */
  getGeneration() {
    // if we have a grid already, work with it
    if (this.grid && this.grid.length === 0) {
      this.grid = this.gameService.getGrid(this.randomCells);
    }

    // get generation
    this.grid = this.gameService.generation(
      this.canvasContext,
      this.grid,
      this.canvasWidth,
      this.canvasHeight,
      this.autoplayOn
    );
  }
}
