import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CmsLinkComponent } from '@spartacus/core';
import { FreeShippingLinkModule } from './free-shipping-link.component';
import { provideSlotData, SlotDataService } from './slot-data.service';

@Component({
  template: `
    <ng-container
      *ngFor="let component of slotData.components; trackBy: trackById"
    >
      <ng-container [ngSwitch]="component.name">
        <app-free-shipping-link
          *ngSwitchCase="'FreeShippingLink'"
          [component]="component"
        ></app-free-shipping-link>
      </ng-container>
    </ng-container>
  `,
  viewProviders: [provideSlotData()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomHeaderSlotComponent {
  trackById = (_index: number, item: CmsLinkComponent) => item.uid;

  constructor(public readonly slotData: SlotDataService) {}
}

@NgModule({
  exports: [BottomHeaderSlotComponent],
  declarations: [BottomHeaderSlotComponent],
  imports: [CommonModule, FreeShippingLinkModule],
})
export class BottomHeaderSlotModule {}
