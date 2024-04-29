import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, CreationCar } from '../models/garage.model';
import { Url } from '../constants/url';
import { LIMIT_GARAGE_PAGE } from '../constants/limits';

@Injectable({
	providedIn: 'root'
})
export class GarageApiService {
	private readonly url = Url.garage;
	private readonly carLimit = LIMIT_GARAGE_PAGE;

	private readonly http = inject(HttpClient);

	public getAllCars(page: number, limit = this.carLimit): Observable<Car[]> {
		const params = new HttpParams({
			fromObject: {
				_page: page.toString(),
				_limit: limit.toString()
			}
		});

		return this.http.get<Car[]>(this.url, { params });
	}

	public getCar(id: number): Observable<Car> {
		const url = this.getFullUrl(id);

		return this.http.get<Car>(url);
	}

	public createCar(body: CreationCar): Observable<Car> {
		return this.http.post<Car>(this.url, body);
	}

	public removeCar(id: number): Observable<void> {
		const url = this.getFullUrl(id);

		return this.http.delete<void>(url);
	}

	public updateCar(id: number, body: CreationCar): Observable<Car> {
		const url = this.getFullUrl(id);

		return this.http.put<Car>(url, body);
	}

	private getFullUrl(id: number): string {
		return `${this.url}/${id}`;
	}
}
