import { Injectable, inject, signal } from '@angular/core';
import { IOrder } from '../../../models/winners.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, switchMap } from 'rxjs';
import { WinnersApiService } from './winners.api.service';

@Injectable({
	providedIn: 'root'
})
export class WinnersKeeperService {
	public totalCountWinner = signal(0);

	public page = signal(1);

	public orderWinners = signal<IOrder>({
		sort: 'id',
		order: 'ASC'
	});

	private readonly apiService = inject(WinnersApiService);

	private page$ = toObservable(this.page);

	private order$ = toObservable(this.orderWinners);

	private winners$ = combineLatest([this.page$, this.order$]).pipe(
		switchMap(([page, order]) =>
			this.apiService.getAllWinners({ page, ...order })
		)
	);

	public winners = toSignal(this.winners$, {
		initialValue: []
	});
}
