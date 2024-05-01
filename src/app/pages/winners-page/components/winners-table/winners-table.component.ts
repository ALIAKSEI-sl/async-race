import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { WinnersKeeperService } from '../../../../shared/services/winners.keeper.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SvgIconComponent } from 'angular-svg-icon';
import { SortingLabel, Sort } from '../../../../shared/models/winners.model';
import { SORTING_LADLE } from '../../../../shared/constants/sorting';
import { columns } from '../../../../shared/constants/winners-table';

@Component({
	selector: 'race-winners-table',
	standalone: true,
	imports: [MatTableModule, AngularSvgIconModule, SvgIconComponent],
	templateUrl: './winners-table.component.html',
	styleUrl: './winners-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinnersTableComponent {
	private readonly label = SORTING_LADLE;
	public readonly displayedColumns = columns;

	private readonly keeperService = inject(WinnersKeeperService);

	public readonly dataSource = this.keeperService.winners;

	public sortingLabel = computed<SortingLabel>(() => {
		const { order, sort } = this.keeperService.orderWinners();

		return { ...this.label, [sort]: order === 'ASC' ? '&#8595;' : '&#8593;' };
	});

	public sort(tag: Sort): void {
		const { sort } = this.keeperService.orderWinners();

		if (tag === sort) this.keeperService.changeOrder();
		else this.keeperService.changeSorting(tag);
	}
}
