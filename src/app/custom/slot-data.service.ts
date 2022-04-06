import { ChangeDetectorRef, Injectable, Optional } from '@angular/core';
import {
  CmsComponent,
  CmsService,
  ContentSlotComponentData,
} from '@spartacus/core';
import { OutletContextData, PageSlotComponent } from '@spartacus/storefront';
import { from, OperatorFunction, Subscription } from 'rxjs';
import {
  switchMap,
  filter,
  first,
  toArray,
  distinctUntilChanged,
} from 'rxjs/operators';

export const provideSlotData = () => {
  return [SlotDataService];
};

@Injectable()
export class SlotDataService {
  #subscription = new Subscription();

  components: CmsComponent[] = [];

  constructor(
    cdRef: ChangeDetectorRef,
    cmsService: CmsService,
    @Optional() contextData: OutletContextData<PageSlotComponent>
  ) {
    if (!contextData) {
      return;
    }

    const sub = cmsService
      .getCurrentPage()
      .pipe(
        removeNil(),
        switchMap(() => contextData.context$),
        switchMap((context) => context.components$),
        mapToComponentData(cmsService),
        distinctUntilChanged(compareJSON)
      )
      .subscribe((components) => {
        this.components = components;
        cdRef.markForCheck();
      });

    this.#subscription.add(sub);
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}

export function mapToComponentData(cmsService: CmsService) {
  return switchMap((components: ContentSlotComponentData[]) =>
    from(components.map((c) => c.uid)).pipe(
      removeNil(),
      switchMap((uid) => cmsService.getComponentData(uid).pipe(first())),
      removeNil(),
      toArray()
    )
  );
}

function removeNil<T>() {
  return filter(
    (x: T) => typeof x !== 'undefined' && x !== null
  ) as OperatorFunction<T, Exclude<T, undefined | null>>;
}

function compareJSON(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}
