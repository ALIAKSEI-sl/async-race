import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RaceControlService } from '../../services/race.control.service';
import { CarGenerationService } from '../../services/car-generation.service';

@Component({
	selector: 'race-controller',
	standalone: true,
	imports: [MatButtonModule],
	templateUrl: './controller.component.html',
	styleUrl: './controller.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerComponent {
	private readonly controlService = inject(RaceControlService);
	private readonly carGenerationService = inject(CarGenerationService);

	public canStartRace = computed(() => {
		const count = this.controlService.countStartedCar();

		return count === 0 ? true : false;
	});

	public startRace(): void {
		this.controlService.startRace();
	}

	public stopRace(): void {
		this.controlService.stopRace();
	}

	public generateCars(): void {
		this.carGenerationService.generateRandomCars();
	}
}
