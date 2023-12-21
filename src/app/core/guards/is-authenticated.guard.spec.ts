import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable, of } from 'rxjs';

class MockAuthenticationService {
  isAuthenticated(): boolean {
    return false; // Modifier en fonction de vos besoins de test
  }
}

describe('IsAuthenticatedGuard', () => {
  let guard: IsAuthenticatedGuard;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        IsAuthenticatedGuard,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ],
    });

    guard = TestBed.inject(IsAuthenticatedGuard);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  }));

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(canActivate).toBeTruthy();
  });

  it('should redirect to login when not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');

    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(canActivate).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
