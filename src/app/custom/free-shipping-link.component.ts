import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CmsLinkComponent } from '@spartacus/core';
import { triggerFadeIn } from '../animations/fade-in.animation';

@Component({
  selector: 'app-free-shipping-link',
  template: `
    <a
      @fadeInTrigger
      [class]="component.styleClasses"
      [style]="component.styleAttributes"
      [target]="component.target === 'true' ? '_blank' : '_self'"
      [routerLink]="component.url"
      routerLinkActive="slot-hidden"
    >
      {{ component.linkName }}
    </a>
  `,
  styles: [
    `
      .slot-hidden {
        display: none !important;
      }
    `,
  ],
  animations: [triggerFadeIn()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FreeShippingLinkComponent {
  @Input() component!: CmsLinkComponent;
}

@NgModule({
  exports: [FreeShippingLinkComponent],
  declarations: [FreeShippingLinkComponent],
  imports: [RouterModule, BrowserAnimationsModule],
})
export class FreeShippingLinkModule {}
