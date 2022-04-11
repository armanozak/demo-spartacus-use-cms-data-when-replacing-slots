import {
  animation,
  style,
  animate,
  trigger,
  transition,
} from '@angular/animations';

export function triggerFadeIn(duration = '500ms') {
  return trigger('fadeInTrigger', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(
        duration,
        style({
          opacity: 1,
        })
      ),
    ]),
  ]);
}
