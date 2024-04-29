import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject
} from '@angular/core';
import { GarageComponent } from './components/garage/garage.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { EditorComponent } from './components/editor/editor.component';
import { ControllerComponent } from './components/controller/controller.component';
import { GarageKeeperService } from './services/garage.keeper.service';
import { RaceControlService } from './services/race.control.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogData, WinnerResult } from '../../models/winners.model';

import { LIMIT_GARAGE_PAGE } from '../../constants/limits';

import { WinnersKeeperService } from '../../services/winners.keeper.service';
@Component({
	selector: 'race-garage-page',
	standalone: true,
	imports: [
		GarageComponent,
		EditorComponent,
		ControllerComponent,
		MatPaginatorModule
	],
	templateUrl: './garage-page.component.html',
	styleUrl: './garage-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaragePageComponent {
	public readonly pageSize = LIMIT_GARAGE_PAGE;

	private readonly dialog = inject(MatDialog);
	private readonly garageKeeperService = inject(GarageKeeperService);
	private readonly controlService = inject(RaceControlService);
	private readonly winnersKeeperService = inject(WinnersKeeperService);

	public readonly totalCountCar = this.garageKeeperService.totalCountCar;

	private checkWinner = (): void => {
		const winner = this.controlService.winnerCar();

		if (winner) this.setWinners(winner);
	};

	constructor() {
		effect(this.checkWinner);
	}

	public changePage(event: PageEvent): void {
		const page = event.pageIndex + 1;

		this.garageKeeperService.page.set(page);
	}

	private setWinners({ id, time }: WinnerResult): void {
		const name = this.garageKeeperService.getNameById(id);

		this.openDialog({ name, time });
		this.winnersKeeperService.createWinners(id, time);
	}

	private openDialog(data: DialogData): void {
		this.dialog.open(DialogComponent, { data });
	}
}
