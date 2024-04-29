import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WinnersTableComponent } from './components/winners-table/winners-table.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { WinnersKeeperService } from '../../services/winners.keeper.service';
import { LIMIT_WINNERS_PAGE } from '../../constants/limits';

@Component({
	selector: 'race-winners-page',
	standalone: true,
	imports: [WinnersTableComponent, MatPaginatorModule],
	templateUrl: './winners-page.component.html',
	styleUrl: './winners-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinnersPageComponent {
	public readonly pageSize = LIMIT_WINNERS_PAGE;

	private readonly keeperService = inject(WinnersKeeperService);

	public readonly page = this.keeperService.page;
	public readonly totalCountWinner = this.keeperService.totalCountWinner;

	public changePage(event: PageEvent): void {
		const page = event.pageIndex + 1;

		this.keeperService.page.set(page);
	}
}
