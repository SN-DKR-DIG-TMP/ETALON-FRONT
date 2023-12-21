import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthenticationInterceptorService } from './authentication-interceptor.service';

describe('AuthenticationInterceptorService', () => {
  let service: AuthenticationInterceptorService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptorService,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(AuthenticationInterceptorService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add authorization header to the request', () => {
    // Arrange
    const testUrl = 'https://example.com/api/test';
    const testData = { message: 'This is a test' };

    // Act
    httpClient.get(testUrl).subscribe();

    // Assert
    const httpRequest = httpTestingController.expectOne(testUrl);
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer VOTRE_JETON');

    httpRequest.flush(testData);

    httpTestingController.verify();
  });

  it('should add custom header to the request', () => {
    // Arrange
    const testUrl = 'https://example.com/api/test';
    const testData = { message: 'This is another test' };

    // Act
    httpClient.get(testUrl).subscribe();

    // Assert
    const httpRequest = httpTestingController.expectOne(testUrl);
    expect(httpRequest.request.headers.has('Custom-Header')).toBeTruthy();
    expect(httpRequest.request.headers.get('Custom-Header')).toBe('Valeur-Custom');

    httpRequest.flush(testData);

    httpTestingController.verify();
  });
});
