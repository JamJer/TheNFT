import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NFTInterceptorService implements HttpInterceptor{
  constructor() { }
  
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const newRequest = req.clone({
          setHeaders: {
            'Authorization': env.APIKey,
            'Content-Type': 'application/json'
          }
      });
      return next.handle(newRequest);
  }
}