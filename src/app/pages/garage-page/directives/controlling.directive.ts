import {
	Directive,
	ElementRef,
	Input,
	Renderer2,
	effect,
	inject,
	input,
	model
} from '@angular/core';
import { EngineApiService } from '../services/engine.api.service';
import { DriveStatus, Movement } from '../../../shared/models/engine.model';
import {
	Observable,
	Subscription,
	catchError,
	of,
	switchMap,
	tap,
	throwError
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { StatusCode } from '../../../shared/constants/status-code';
import { RaceControlService } from '../services/race.control.service';
import { CAR_WIDTH, TO_SECONDS } from '../../../shared/constants/limits';
import { animationInit } from '../../../shared/constants/animations';

@Directive({
	selector: '[raceControlling]',
	standalone: true
})
export class ControllingDirective {
	@Input() public id!: number;
	@Input() public width = CAR_WIDTH;

	private toSeconds = TO_SECONDS;

	private startSubscription!: Subscription;

	public stopping = model(false);
	public animation = model(animationInit);
	public status = input<boolean | null>(null);

	private readonly render = inject(Renderer2);
	private readonly elementRef = inject(ElementRef);
	private readonly apiService = inject(EngineApiService);
	private readonly controlService = inject(RaceControlService);

	private checkStatus = (): void => {
		const status = this.status();

		if (status !== null) this.switchRace(status);
	};

	constructor() {
		effect(this.checkStatus, { allowSignalWrites: true });
	}

	private get element(): HTMLElement {
		return this.elementRef.nativeElement as HTMLElement;
	}

	private get trackLength(): number {
		const length = this.render.parentNode(this.element).offsetWidth as number;

		return length - this.width;
	}

	private switchRace(status: boolean): void {
		if (status) {
			this.startRace();
		} else {
			this.stopRace();
		}
	}

	private startRace(): void {
		this.startSubscription = this.apiService
			.switch<Movement>(this.id, 'started')
			.pipe(
				tap(this.animationStart),
				switchMap(() => this.apiService.switch<DriveStatus>(this.id, 'drive')),
				catchError(this.catchError)
			)
			.subscribe(this.checkDriveStatus);
	}

	private animationStart = ({ distance, velocity }: Movement): void => {
		const end = this.trackLength;
		const duration = (distance / velocity / this.toSeconds).toFixed(1);

		this.animation.set({ state: 'end', start: 0, duration, end });
	};

	private checkDriveStatus = ({ success }: DriveStatus): void => {
		if (!success) {
			this.stopCar();
		} else {
			const winner = this.controlService.winnerCar();

			if (!winner) {
				const time = this.animation().duration;

				this.controlService.winnerCar.set({ id: this.id, time });
			}
		}
	};

	private stopCar(): void {
		const { x: start } = this.element.getBoundingClientRect();

		this.animation.update((param) => ({ ...param, state: 'start', start }));
	}

	private stopRace(): void {
		this.startSubscription.unsubscribe();

		this.stopCar();
		this.stopping.set(true);

		this.apiService
			.switch<Movement>(this.id, 'stopped')
			.subscribe(this.resetCars);
	}

	private resetCars = (): void => {
		this.animationStop();

		this.controlService.decreaseCountStartedCar();

		this.stopping.set(false);
	};

	private animationStop(): void {
		this.animation.update((param) => ({ ...param, start: 0 }));
	}

	private catchError(error: HttpErrorResponse): Observable<DriveStatus> {
		if (error.status === StatusCode.SERVER_ERROR) {
			return of({ success: false });
		}
		return throwError(() => error);
	}
}
