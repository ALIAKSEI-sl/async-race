import { TestBed } from '@angular/core/testing';

import { GarageKeeperService } from './garage.keeper.service';

describe('GarageKeeperService', () => {
	let service: GarageKeeperService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GarageKeeperService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
