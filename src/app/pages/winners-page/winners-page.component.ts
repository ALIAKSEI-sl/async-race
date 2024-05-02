import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject
} from '@angular/core';
import { WinnersTableComponent } from './components/winners-table/winners-table.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { WinnersKeeperService } from '../../shared/services/winners.keeper.service';
import { LIMIT_WINNERS_PAGE } from '../../shared/constants/limits';

@Component({
	selector: 'race-winners-page',
	standalone: true,
	imports: [WinnersTableComponent, MatPaginatorModule],
	templateUrl: './winners-page.component.html',
	styleUrl: './winners-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinnersPageComponent implements OnInit {
	public readonly pageSize = LIMIT_WINNERS_PAGE;

	private readonly keeperService = inject(WinnersKeeperService);

	public readonly page = this.keeperService.page;
	public readonly totalCountWinner = this.keeperService.totalCountWinner;

	public ngOnInit(): void {
		this.keeperService.updateWinners();
	}

	public changePage(event: PageEvent): void {
		const page = event.pageIndex + 1;

		this.keeperService.page.set(page);
	}
}
