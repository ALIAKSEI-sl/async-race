import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'race-garage-page',
	standalone: true,
	imports: [],
	templateUrl: './garage-page.component.html',
	styleUrl: './garage-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaragePageComponent {}
