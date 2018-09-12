import { TestBed, async } from '@angular/core/testing';
import { GameComponent } from './game.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent
      ],
    }).compileComponents();
  }));
  it('should create the game', async(() => {
    const fixture = TestBed.createComponent(GameComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
