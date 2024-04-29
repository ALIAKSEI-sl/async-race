import { TestBed } from '@angular/core/testing';

import { RaceControlService } from './race.control.service';

describe('RaceControlService', () => {
	let service: RaceControlService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RaceControlService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
