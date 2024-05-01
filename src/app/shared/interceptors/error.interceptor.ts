import {
	HttpRequest,
	HttpEvent,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpErrorResponse
} from '@angular/common/http';

import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { StatusCode } from '../constants/status-code';
import { inject } from '@angular/core';
import { SnackBarService } from '../services/snack-bar.service';
import { Url } from '../constants/url';

export const errorInterceptor: HttpInterceptorFn = (
	req: HttpRequest<unknown>,
	next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
	const snackBar = inject(SnackBarService);

	return next(req).pipe(
		catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
			if (error.status === StatusCode.NOT_FOUND) {
				if (req.method === 'GET' && req.url !== Url.winners) {
					return throwError(() => error);
				}

				snackBar.openWithCarNotFound();

				return EMPTY;
			}

			return throwError(() => error);
		})
	);
};
