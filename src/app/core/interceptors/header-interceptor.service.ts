import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ajouter des en-têtes à la requête ici
    const modifiedRequest = request.clone({
      setHeaders: {
        'Custom-Header': 'Valeur-Custom', // Exemple d'ajout d'un en-tête personnalisé
      },
    });

    // Passer la requête modifiée au gestionnaire suivant
    return next.handle(modifiedRequest);
  }
}



