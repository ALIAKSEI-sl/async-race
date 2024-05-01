import { Injectable, inject, signal } from '@angular/core';
import { GarageApiService } from '../../../shared/services/garage.api.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, catchError, switchMap } from 'rxjs';
import { Car } from '../../../shared/models/garage.model';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

@Injectable({
	providedIn: 'root'
})
export class GarageKeeperService {
	public page = signal(1);
	public totalCountCar = signal(0);

	public updateCar$ = new Subject<Car>();

	private readonly snackBar = inject(SnackBarService);
	private readonly apiService = inject(GarageApiService);

	private readonly cars$ = toObservable(this.page).pipe(
		switchMap((page) => this.apiService.getAllCars(page)),
		catchError(() => {
			this.snackBar.openWithUnavailableServerError();

			return EMPTY;
		})
	);

	public cars = toSignal(this.cars$, {
		initialValue: []
	});

	public getNameById(id: number): string {
		const foundCar = this.cars().find((car) => car.id === id);

		return foundCar?.name ?? '';
	}

	public updateGarage(): void {
		const page = this.page();

		this.page.set(0);
		this.page.set(page);
	}
}
