import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICar } from '../../../models/garage.model';
import { Url } from '../../../constants/url';

@Injectable({
	providedIn: 'root'
})
export class GarageApiService {
	private readonly url = Url.garage;

	private readonly carLimit: number = 7;

	private readonly http = inject(HttpClient);

	public getAllCars(page: number, limit = this.carLimit): Observable<ICar[]> {
		const params = new HttpParams({
			fromObject: {
				_page: page.toString(),
				_limit: limit.toString()
			}
		});

		return this.http.get<ICar[]>(this.url, { params });
	}

	public getCar(id: number): Observable<ICar> {
		const url = this.getFullUrl(id);

		return this.http.get<ICar>(url);
	}

	public createCar(body: Omit<ICar, 'id'>): Observable<ICar> {
		return this.http.post<ICar>(this.url, body);
	}

	public removeCar(id: number): Observable<void> {
		const url = this.getFullUrl(id);

		return this.http.delete<void>(url);
	}

	public updateCar(id: number, body: Omit<ICar, 'id'>): Observable<ICar> {
		const url = this.getFullUrl(id);

		return this.http.put<ICar>(url, body);
	}

	private getFullUrl(id: number): string {
		return `${this.url}/${id}`;
	}
}
