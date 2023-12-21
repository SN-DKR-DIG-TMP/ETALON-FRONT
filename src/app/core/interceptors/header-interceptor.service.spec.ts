import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HeaderInterceptorService } from './header-interceptor.service';

describe('HeaderInterceptorService', () => {
  let service: HeaderInterceptorService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeaderInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptorService,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(HeaderInterceptorService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add custom header to the request', () => {
    // Arrange
    const testUrl = 'https://example.com/api/test';
    const testData = { message: 'This is a test' };

    // Act
    httpClient.get(testUrl).subscribe();

    // Assert
    const httpRequest = httpTestingController.expectOne(testUrl);
    expect(httpRequest.request.headers.has('Custom-Header')).toBeTruthy();
    expect(httpRequest.request.headers.get('Custom-Header')).toBe('Valeur-Custom');

    httpRequest.flush(testData);

    httpTestingController.verify();
  });

  it('should not interfere with response', () => {
    // Arrange
    const testUrl = 'https://example.com/api/test';
    const testData = { message: 'This is another test' };

    // Act
    httpClient.get(testUrl).subscribe((response) => {
      // Assert
      expect(response).toEqual(testData);
    });

    // Respond to the request
    const httpRequest = httpTestingController.expectOne(testUrl);
    httpRequest.flush(testData);

    httpTestingController.verify();
  });
});
