import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptorService } from './authentication-interceptor.service';
import { HeaderInterceptorService } from './header-interceptor.service';

/** Http interceptor providers */
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptorService,
    multi: true,
  }
];
