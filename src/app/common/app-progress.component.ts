import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-progress-bar',
  template: `<label class="progress-wrapper" *ngIf="running">
        <mat-progress-bar *ngIf="progressType=='accent'"
            color="accent"
            class="app-progress"
            mode="indeterminate"
            aria-label="Indeterminate progress-bar example"></mat-progress-bar>        
         <mat-progress-bar *ngIf="progressType=='primary'"
            color="primary"
            class="app-progress"
            mode="indeterminate"
            aria-label="Indeterminate progress-bar example"></mat-progress-bar>
         <mat-progress-bar *ngIf="progressType=='warn'"
            color="warn"
            class="app-progress"
            mode="indeterminate"
            aria-label="Indeterminate progress-bar example"></mat-progress-bar>
      </label>`,
  providers: []
})

export class AppProgressComponent {
  @Input()
  running: boolean = false;
  @Input()
  progressType: string = 'primary';
  private _timeOuts: number[] = [];

  constructor() {
  }

  startProgress() {
    if (!this.running) {
      this.progressType = 'primary';
      this.running = true;
      this._timeOuts = [
        setTimeout(() => this.progressType = 'accent', 30000),
        setTimeout(() => this.progressType = 'warn', 90000)
      ];
    }
  }

  stopProgress() {
    this.running = false;
    this._timeOuts.forEach(handle => clearTimeout(handle));
    this._timeOuts = [];
  }
}
