import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WinnerResult } from '../../../shared/models/winners.model';

@Injectable({
	providedIn: 'root'
})
export class RaceControlService {
	public countStartedCar = signal(0);
	public winnerCar = signal<WinnerResult | null>(null);

	public raceStatus$ = new BehaviorSubject<boolean | null>(null);

	public startRace(): void {
		this.raceStatus$.next(true);
	}

	public stopRace(): void {
		this.winnerCar.set(null);

		this.raceStatus$.next(false);
	}

	public increaseCountStartedCar(): void {
		this.countStartedCar.update((count) => count + 1);
	}

	public decreaseCountStartedCar(): void {
		this.countStartedCar.update((count) => count - 1);
	}
}
