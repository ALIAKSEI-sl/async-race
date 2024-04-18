import {
	HttpRequest,
	HttpEvent,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpResponse
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { GarageKeeperService } from '../pages/garage-page/services/garage.keeper.service';
import { WinnersKeeperService } from '../pages/winners-page/services/winners.keeper.service';
import { Url } from '../constants/url';

export const totalCountInterceptor: HttpInterceptorFn = (
	req: HttpRequest<unknown>,
	next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
	const gageKeeperService = inject(GarageKeeperService);
	const winnersKeeperService = inject(WinnersKeeperService);

	if (req.method === 'GET') {
		return next(req).pipe(
			tap((event) => {
				if (event instanceof HttpResponse) {
					const count = event.headers.get('X-Total-Count');

					if (count && req.url.includes(Url.garage)) {
						gageKeeperService.totalCountCar.set(Number(count));
					} else if (count && req.url.includes(Url.winners)) {
						winnersKeeperService.totalCountWinner.set(Number(count));
					}
				}
			})
		);
	}

	return next(req);
};
