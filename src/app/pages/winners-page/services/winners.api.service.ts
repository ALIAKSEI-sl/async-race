import { Injectable, inject } from '@angular/core';
import { Url } from '../../../constants/url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IWinner, IWinnersParam } from '../../../models/winners.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WinnersApiService {
	private readonly url = Url.winners;

	private readonly winnerLimit: number = 10;

	private readonly http = inject(HttpClient);

	public getAllWinners({
		page,
		sort,
		order,
		limit
	}: IWinnersParam): Observable<IWinner[]> {
		const params = new HttpParams({
			fromObject: {
				_page: page.toString(),
				_limit: (limit ?? this.winnerLimit).toString(),
				_sort: sort,
				_order: order
			}
		});

		return this.http.get<IWinner[]>(this.url, { params });
	}

	public getWinner(id: number): Observable<IWinner> {
		const url = this.getFullUrl(id);

		return this.http.get<IWinner>(url);
	}

	public createWinner(body: IWinner): Observable<IWinner> {
		return this.http.post<IWinner>(this.url, body);
	}

	public removeWinner(id: number): Observable<void> {
		const url = this.getFullUrl(id);

		return this.http.delete<void>(url);
	}

	public updateWinner(
		id: number,
		body: Omit<IWinner, 'id'>
	): Observable<IWinner> {
		const url = this.getFullUrl(id);

		return this.http.put<IWinner>(url, body);
	}

	private getFullUrl(id: number): string {
		return `${this.url}/${id}`;
	}
}
