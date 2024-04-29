import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	Input,
	OnInit,
	computed,
	inject,
	signal
} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Car } from '../../../../models/garage.model';
import { MatButtonModule } from '@angular/material/button';
import { SvgIconComponent } from 'angular-svg-icon';
import { GarageKeeperService } from '../../services/garage.keeper.service';
import { GarageApiService } from '../../../../services/garage.api.service';
import { ControllingDirective } from '../../directives/controlling.directive';
import { RaceControlService } from '../../services/race.control.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { trigger } from '@angular/animations';
import { animationInit, moveAnimation } from '../../../../constants/animations';
import { CAR_WIDTH } from '../../../../constants/limits';

@Component({
	selector: 'race-car',
	standalone: true,
	imports: [
		AngularSvgIconModule,
		MatButtonModule,
		SvgIconComponent,
		ControllingDirective
	],
	templateUrl: './car.component.html',
	styleUrl: './car.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [trigger('moveAnimation', moveAnimation)]
})
export class CarComponent implements OnInit {
	@Input() public car!: Car;

	public readonly carWidth = CAR_WIDTH;

	public stoppingStatus = signal(false);
	public moveAnimations = signal(animationInit);
	public carStatus = signal<boolean | null>(null);

	private readonly destroyRef = inject(DestroyRef);
	private readonly apiService = inject(GarageApiService);
	private readonly keeperService = inject(GarageKeeperService);
	private readonly controlService = inject(RaceControlService);

	public canStart = computed(() => this.carStatus() || this.stoppingStatus());

	public ngOnInit(): void {
		this.checkRaceStatus();
	}

	public emitUpdateCar(): void {
		this.keeperService.updateCar$.next(this.car);
	}

	public removeCar(): void {
		this.apiService
			.removeCar(this.car.id)
			.subscribe(() => this.keeperService.updateGarage());
	}

	public startCar(): void {
		if (!this.carStatus()) {
			this.controlService.increaseCountStartedCar();

			this.carStatus.set(true);
		}
	}

	public stopCar(): void {
		if (this.carStatus()) this.carStatus.set(false);
	}

	private checkRaceStatus(): void {
		this.controlService.raceStatus$
			.pipe(
				filter((status) => status !== null),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe((status) => {
				if (status) this.startCar();
				else this.stopCar();
			});
	}
}
