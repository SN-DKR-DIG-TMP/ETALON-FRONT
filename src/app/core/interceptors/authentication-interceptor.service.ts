import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Modifier les en-têtes de la requête ici
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer VOTRE_JETON', // Exemple d'ajout d'un en-tête d'autorisation
        'Custom-Header': 'Valeur-Custom', // Exemple d'ajout d'un en-tête personnalisé
      },
    });

    // Passer la requête modifiée au gestionnaire suivant
    return next.handle(modifiedRequest);
  }
}