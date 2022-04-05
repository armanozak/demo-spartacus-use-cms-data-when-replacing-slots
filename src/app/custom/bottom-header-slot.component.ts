import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsLinkComponent } from '@spartacus/core';
import { provideSlotData, SlotDataService } from './slot-data.service';

@Component({
  template: `
    <a
      *ngIf="freeShippingLink as link"
      [class]="link.styleClasses"
      [style]="link.styleAttributes"
      [target]="link.external ? '_blank' : '_self'"
      [routerLink]="link.url"
      routerLinkActive="slot-hidden"
    >
      {{ link.linkName }}
    </a>
  `,
  styles: [
    `
      .slot-hidden {
        display: none !important;
      }
    `,
  ],
  viewProviders: [provideSlotData()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomHeaderSlotComponent {
  get freeShippingLink(): CmsLinkComponent {
    return this.slotData.components[0];
  }

  constructor(private slotData: SlotDataService) {}
}

@NgModule({
  exports: [BottomHeaderSlotComponent],
  declarations: [BottomHeaderSlotComponent],
  imports: [CommonModule, RouterModule],
})
export class BottomHeaderSlotModule {}
