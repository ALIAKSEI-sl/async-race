import { Injectable, inject, signal } from '@angular/core';
import {
	FullWinner,
	OrderWinners,
	Winner,
	WinnersParam,
	Sort
} from '../models/winners.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
	EMPTY,
	Observable,
	catchError,
	combineLatest,
	forkJoin,
	map,
	mergeMap,
	of,
	switchMap
} from 'rxjs';
import { WinnersApiService } from './winners.api.service';
import { GarageApiService } from './garage.api.service';
import { StatusCode } from '../constants/status-code';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from './snack-bar.service';

@Injectable({
	providedIn: 'root'
})
export class WinnersKeeperService {
	public page = signal(1);
	public totalCountWinner = signal(0);
	public orderWinners = signal<OrderWinners>({
		sort: 'id',
		order: 'ASC'
	});

	private readonly snackBar = inject(SnackBarService);
	private readonly garageApiService = inject(GarageApiService);
	private readonly winnersApiService = inject(WinnersApiService);

	private readonly page$ = toObservable(this.page);
	private readonly order$ = toObservable(this.orderWinners);

	public updateWinners(): void {
		const page = this.page();

		this.page.set(0);
		this.page.set(page);
	}

	public changeOrder(): void {
		this.orderWinners.update((setting) => ({
			...setting,
			order: setting.order === 'ASC' ? 'DESC' : 'ASC'
		}));
	}

	public changeSorting(sort: Sort): void {
		this.orderWinners.set({ sort, order: 'ASC' });
	}

	private getAllWinners = ([page, order]: WinnersParam): Observable<
		FullWinner[]
	> =>
		this.winnersApiService.getAllWinners({ page, ...order }).pipe(
			catchError(() => {
				this.snackBar.openWithUnavailableServerError();

				return EMPTY;
			}),
			switchMap(this.getFullWinners)
		);

	private getFullWinners = (winners: Winner[]): Observable<FullWinner[]> => {
		if (winners.length === 0) return of([]);

		return forkJoin(
			winners.map((winner) =>
				this.garageApiService
					.getCar(winner.id)
					.pipe(map((car) => ({ ...winner, ...car })))
			)
		);
	};

	private winners$ = combineLatest([this.page$, this.order$]).pipe(
		switchMap(this.getAllWinners)
	);

	public readonly winners = toSignal(this.winners$, {
		initialValue: []
	});

	public createWinners(id: number, currentTime: string): void {
		const time = Number(currentTime);

		const updateWinner = this.updateWinner(id, time);

		this.winnersApiService
			.getWinner(id)
			.pipe(
				catchError(this.catchGetWinnerError),
				mergeMap(updateWinner),
				catchError(this.catchCreateWinnerError)
			)
			.subscribe(() => {
				this.updateWinners();
			});
	}

	private catchGetWinnerError(error: HttpErrorResponse): Observable<null> {
		return error.status === StatusCode.NOT_FOUND ? of(null) : EMPTY;
	}

	private catchCreateWinnerError(error: HttpErrorResponse): Observable<void> {
		if (error.status === StatusCode.SERVER_ERROR) {
			this.snackBar.openWithDuplicateIdError();
		}

		return EMPTY;
	}

	private updateWinner(id: number, currentTime: number) {
		return (winner: Winner | null) => {
			if (winner) {
				const { time: previousTime, wins: count } = winner;
				const wins = count + 1;
				const time = currentTime < previousTime ? currentTime : previousTime;

				return this.winnersApiService.updateWinner(id, { time, wins });
			} else {
				const body = { id, time: currentTime, wins: 1 };

				return this.winnersApiService.createWinner(body);
			}
		};
	}
}
