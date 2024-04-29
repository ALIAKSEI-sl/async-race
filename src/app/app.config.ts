import { ApplicationConfig } from '@angular/core';
import { RouteReuseStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { totalCountInterceptor } from './interceptors/total-count.interceptor';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { RaceRouteReuseStrategy } from './route-reuse-strategy';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(withInterceptors([totalCountInterceptor])),
		provideAnimationsAsync(),
		provideAngularSvgIcon(),
		{
			provide: RouteReuseStrategy,
			useClass: RaceRouteReuseStrategy
		}
	]
};
