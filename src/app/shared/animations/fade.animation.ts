import {
  transition,
  style,
  animate,
  trigger,
  animation,
  state
} from '@angular/animations';

export const Fade = trigger('fade', [
  transition(
    ':enter',
    animation([
      style({ opacity: 0 }),
      animate(
        '0.5s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
        style({ opacity: 1 })
      ),
    ])
  ),
  transition(
    ':leave',
    animation([
      style({ opacity: 1 }),
      animate(
        '0.5s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
        style({ opacity: 0 })
      ),
    ])
  ),
]);

export const FadeFromTop = trigger('fadeFromTop', [
  transition('void => *', [
    style({ opacity:0,transform: 'translateY(-10%)' }),
    animate(800)
  ]),
  transition('* => void', [
    animate(800, style({ opacity:0,transform: 'translateY(-10%)' }))
  ])
]);

export const FadeFromBottom = trigger('fadeFromBottom', [
  transition('void => *', [
    style({ opacity:0,transform: 'translateY(10%)' }),
    animate(800)
  ]),
  transition('* => void', [
    animate(800, style({ opacity:0,transform: 'translateY(10%)' }))
  ])
]);

export const FadeFromLeft = trigger('fadeFromLeft', [
  transition('void => *', [
    style({ opacity:0,transform: 'translateX(-10%)' }),
    animate(800)
  ]),
  transition('* => void', [
    animate(800, style({ opacity:0,transform: 'translateX(-10%)' }))
  ])
]);


  