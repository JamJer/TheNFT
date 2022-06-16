import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { UIService } from '../../UI';

@Injectable({
  providedIn: 'root'
})
export class BackendInterceptorService implements HttpInterceptor{
  constructor(private _ui: UIService) { }
  
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const t0 = performance.now();
    let interval: any;

    console.log('processing request', req);
    interval = setInterval(() => {
      const t1 = performance.now();
      const responseTime = (t1 - t0) / 1000;
      if(responseTime > 1 && !this._ui.isProgressing) this._ui.isProgressing = true;
    }, 100);
    
    return next.handle(req).pipe(
      finalize(() => {
        const t1 = performance.now();
        const totalResponseTime = (t1 - t0) / 1000;
        console.log(`Request finished: took ${totalResponseTime} ms`);
        clearInterval(interval);
        this._ui.isProgressing = false;
      }),
    );
  }
}