// auth.service.ts

import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.configureOAuth();
  }

  private configureOAuth() {
    const authConfig: AuthConfig = {
      clientId: 'votre-client-id',
      issuer: 'https://votre-serveur-d-authentification.com',
      redirectUri: window.location.origin,
      responseType: 'token id_token',
      scope: 'openid profile email', // Ajoutez les scopes nécessaires
    };

    // Configurez l'OIDC
    this.oauthService.configure(authConfig);

    // Chargez le document de découverte et essayez une connexion
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin());
  }

  // Ajoutez d'autres méthodes d'authentification, de déconnexion, etc.
}
