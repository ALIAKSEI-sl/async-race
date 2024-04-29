import { Injectable, inject } from '@angular/core';
import { GarageApiService } from '../../../services/garage.api.service';
import { CAR_MODELS, CAR_NAMES } from '../../../constants/cars-model';
import { LIMIT_CAR, LIMIT_CAR_MODELS } from '../../../constants/limits';
import { CarNames, CreationCar } from '../../../models/garage.model';
import { forkJoin } from 'rxjs';
import { GarageKeeperService } from './garage.keeper.service';

@Injectable({
	providedIn: 'root'
})
export class CarGenerationService {
	private readonly names = CAR_NAMES;
	private readonly models = CAR_MODELS;
	private readonly carCount = LIMIT_CAR;
	private readonly limit = LIMIT_CAR_MODELS;
	private readonly signs = '123456789ABCDEF';

	private readonly apiService = inject(GarageApiService);
	private readonly keeperService = inject(GarageKeeperService);

	public generateRandomCars(): void {
		const cars = Array.from({ length: this.carCount }, () => ({
			name: this.getFullName(),
			color: this.getRandomColor()
		}));

		this.createRandomCars(cars);
	}

	public createRandomCars(cars: CreationCar[]): void {
		forkJoin(cars.map((car) => this.apiService.createCar(car))).subscribe(() =>
			this.keeperService.updateGarage()
		);
	}

	private getRandomColor(): string {
		const length = 6;
		const color = Array.from({ length }, this.getRandomSign).join('');

		return `#${color}`;
	}

	private getRandomSign(): string {
		return this.signs[Math.floor(Math.random() * this.signs.length)];
	}

	private getRandomNumber(): number {
		return Math.floor(Math.random() * this.limit);
	}

	private getRandomModel(name: CarNames): string {
		const i = this.getRandomNumber();

		return this.models[name][i];
	}

	private getRandomName(): string {
		const i = this.getRandomNumber();

		return this.names[i];
	}

	private getFullName(): string {
		const name = this.getRandomName() as keyof typeof CAR_MODELS;
		const model = this.getRandomModel(name);

		return `${name} ${model}`;
	}
}
