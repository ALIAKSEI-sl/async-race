import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'race-winners-page',
	standalone: true,
	imports: [],
	templateUrl: './winners-page.component.html',
	styleUrl: './winners-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinnersPageComponent {}
