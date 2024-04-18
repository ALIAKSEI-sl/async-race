import { Injectable, inject, signal } from '@angular/core';
import { GarageApiService } from './garage.api.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GarageKeeperService {
	public totalCountCar = signal(0);

	public page = signal(1);

	private readonly apiService = inject(GarageApiService);

	private cars$ = toObservable(this.page).pipe(
		switchMap((page) => this.apiService.getAllCars(page))
	);

	public cars = toSignal(this.cars$, {
		initialValue: []
	});
}
