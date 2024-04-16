import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersPageComponent } from './winners-page.component';

describe('WinnersPageComponent', () => {
	let component: WinnersPageComponent;
	let fixture: ComponentFixture<WinnersPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WinnersPageComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(WinnersPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
