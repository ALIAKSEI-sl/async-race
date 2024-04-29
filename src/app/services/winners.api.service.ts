import { Injectable, inject } from '@angular/core';
import { Url } from '../constants/url';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
	CreationWinner,
	GettingWinners,
	Winner
} from '../models/winners.model';
import { Observable } from 'rxjs';
import { LIMIT_WINNERS_PAGE } from '../constants/limits';

@Injectable({
	providedIn: 'root'
})
export class WinnersApiService {
	private readonly url = Url.winners;
	private readonly winnerLimit = LIMIT_WINNERS_PAGE;

	private readonly http = inject(HttpClient);

	public getAllWinners({
		page,
		sort,
		order,
		limit
	}: GettingWinners): Observable<Winner[]> {
		const params = new HttpParams({
			fromObject: {
				_page: page.toString(),
				_limit: (limit ?? this.winnerLimit).toString(),
				_sort: sort,
				_order: order
			}
		});

		return this.http.get<Winner[]>(this.url, { params });
	}

	public getWinner(id: number): Observable<Winner | null> {
		const url = this.getFullUrl(id);

		return this.http.get<Winner>(url);
	}

	public createWinner(body: Winner): Observable<Winner> {
		return this.http.post<Winner>(this.url, body);
	}

	public removeWinner(id: number): Observable<void> {
		const url = this.getFullUrl(id);

		return this.http.delete<void>(url);
	}

	public updateWinner(id: number, body: CreationWinner): Observable<Winner> {
		const url = this.getFullUrl(id);

		return this.http.put<Winner>(url, body);
	}

	private getFullUrl(id: number): string {
		return `${this.url}/${id}`;
	}
}
