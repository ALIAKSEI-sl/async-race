import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
	selector: 'race-root',
	standalone: true,
	imports: [RouterOutlet, MatButtonModule, RouterLink],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {}
