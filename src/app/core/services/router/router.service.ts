import { Injectable } from '@angular/core';
import { Event, NavigationEnd, PRIMARY_OUTLET, Router, RouterEvent, UrlSegment, UrlTree } from '@angular/router';
import { filter } from 'rxjs';
import { UIFuncType } from '../../models';
import { UIService } from '../UI';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(
      private _router: Router,
      private _ui: UIService 
  ) {
        _router.events.pipe(
            filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
        ).subscribe((event) => {
            if(event instanceof NavigationEnd && event.url) {
                const tree: UrlTree = _router.parseUrl(event.url);
                const segments: UrlSegment[] = tree.root.children[PRIMARY_OUTLET].segments;
                const pathLength = segments.length;
                if(!pathLength && segments[0].path !== 'home') return;
                switch(pathLength) {
                    case 1:
                        this._ui.UIStatus = UIFuncType.default;
                        break; 
                    case 2:
                        this._ui.UIStatus = UIFuncType[segments[1].path as keyof typeof UIFuncType];
                        break;
                    default: 
                        console.log('Unknown url segment size.');
                }
            }
        });
   }
}
