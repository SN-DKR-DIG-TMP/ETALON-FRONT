import { Injectable } from '@angular/core';
import { OAuthService, OAuthEvent, UserInfo } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private oauthService: OAuthService) {}

  // Méthode pour déterminer si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  // Méthode pour obtenir les informations sur l'utilisateur authentifié
  getUserInfo(): UserInfo {
    return this.oauthService.getIdentityClaims() as UserInfo;
  }

  // Méthode pour déclencher le processus d'authentification
  login(): void {
    this.oauthService.initImplicitFlow();
  }

  // Méthode pour déclencher le processus de déconnexion
  logout(): void {
    this.oauthService.logOut();
  }

  // Observable pour suivre les événements d'authentification (par exemple, la connexion, la déconnexion)
  onAuthenticationEvent(): Observable<OAuthEvent> {
    return this.oauthService.events;
  }

  // Ajoutez d'autres fonctionnalités selon les besoins de votre application
}
