import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private isRightPanelActive = false;

  togglePanel(): void {
    this.isRightPanelActive = !this.isRightPanelActive;
  }

  isPanelActive(): boolean {
    return this.isRightPanelActive;
  }
}