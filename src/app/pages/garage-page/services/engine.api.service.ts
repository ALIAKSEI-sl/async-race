import { Injectable, inject } from '@angular/core';
import { Url } from '../../../constants/url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DriveStatus, Movement, Status } from '../../../models/engine.model';

@Injectable({
	providedIn: 'root'
})
export class EngineApiService {
	private readonly url = Url.engine;

	private readonly http = inject(HttpClient);

	public switch<T extends Movement | DriveStatus>(
		id: number,
		status: Status
	): Observable<T> {
		const url = `${this.url}?id=${id}&status=${status}`;

		return this.http.patch<T>(url, {});
	}
}
