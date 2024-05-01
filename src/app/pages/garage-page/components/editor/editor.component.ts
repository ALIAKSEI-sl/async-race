import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	OnInit,
	inject
} from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GarageApiService } from '../../../../shared/services/garage.api.service';
import { GarageKeeperService } from '../../services/garage.keeper.service';
import { CreationCar } from '../../../../shared/models/garage.model';

@Component({
	selector: 'race-editor',
	standalone: true,
	imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
	templateUrl: './editor.component.html',
	styleUrl: './editor.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
	public createCarForm = new FormGroup({
		name: new FormControl('', [Validators.required]),
		color: new FormControl('#ffffff', [Validators.required])
	});

	public updateCarForm = new FormGroup({
		name: new FormControl({ value: '', disabled: true }, [Validators.required]),
		color: new FormControl({ value: '#ffffff', disabled: true }, [
			Validators.required
		])
	});

	private updateCarId: number | null = null;

	private readonly destroyRef = inject(DestroyRef);
	private readonly apiService = inject(GarageApiService);
	private readonly keeperService = inject(GarageKeeperService);

	public ngOnInit(): void {
		this.subscribeToUpdateCar();
	}

	public createCar(): void {
		const value = this.createCarForm.getRawValue() as CreationCar;

		this.apiService.createCar(value).subscribe(() => {
			this.keeperService.updateGarage();
		});

		this.resetForm(this.createCarForm);
	}

	public updateCar(): void {
		const id = this.updateCarId as number;
		const value = this.updateCarForm.getRawValue() as CreationCar;

		this.apiService
			.updateCar(id, value)
			.subscribe(() => this.keeperService.updateGarage());

		this.resetForm(this.updateCarForm);
		this.updateCarForm.disable();
	}

	private setUpdateCarValue(value: CreationCar): void {
		this.updateCarForm.setValue(value);
		this.updateCarForm.enable();
	}

	private resetForm(form: FormGroup): void {
		form.reset({ name: '', color: '#ffffff' });
	}

	private subscribeToUpdateCar(): void {
		this.keeperService.updateCar$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(({ name, color, id }) => {
				this.updateCarId = id;

				this.setUpdateCarValue({ name, color });
			});
	}
}
