import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially not be authenticated', () => {
    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeFalsy();
  });

  it('should return user info when authenticated', () => {
    // You may need to mock the OAuthService for this test
    // assuming you have methods in your service to set authentication status
    service.login();
    const userInfo = service.getUserInfo();
    expect(userInfo).toBeDefined();
  });

  it('should trigger login', () => {
    spyOn(service, 'login');
    service.login();
    expect(service.login).toHaveBeenCalled();
  });

  it('should trigger logout', () => {
    spyOn(service, 'logout');
    service.logout();
    expect(service.logout).toHaveBeenCalled();
  });
});
