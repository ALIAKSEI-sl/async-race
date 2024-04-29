import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CarComponent } from '../car/car.component';
import { GarageKeeperService } from '../../services/garage.keeper.service';

@Component({
	selector: 'race-garage',
	standalone: true,
	imports: [CarComponent],
	templateUrl: './garage.component.html',
	styleUrl: './garage.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarageComponent {
	private readonly keeperService = inject(GarageKeeperService);

	public readonly cars = this.keeperService.cars;
	public readonly page = this.keeperService.page;
}
