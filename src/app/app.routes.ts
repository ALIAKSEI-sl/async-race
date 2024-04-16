import { Routes } from '@angular/router';
import { GaragePageComponent } from './pages/garage-page/garage-page.component';
import { WinnersPageComponent } from './pages/winners-page/winners-page.component';

export const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '', redirectTo: 'garage', pathMatch: 'full' },
			{ path: 'garage', component: GaragePageComponent },
			{
				path: 'winners',
				loadComponent: (): Promise<typeof WinnersPageComponent> =>
					import('./pages/winners-page/winners-page.component').then(
						(m): typeof WinnersPageComponent => m.WinnersPageComponent
					)
			}
		]
	}
];
