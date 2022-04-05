import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  AppRoutingModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { AppComponent } from './app.component';
import {
  BottomHeaderSlotModule,
  BottomHeaderSlotComponent,
} from './custom/bottom-header-slot.component';
import { SpartacusModule } from './spartacus/spartacus.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    BrowserTransferStateModule,
    BottomHeaderSlotModule,
  ],
  providers: [
    provideOutlet({
      id: 'BottomHeaderSlot',
      position: OutletPosition.REPLACE,
      component: BottomHeaderSlotComponent,
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
