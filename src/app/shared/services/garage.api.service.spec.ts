import { TestBed } from '@angular/core/testing';

import { GarageApiService } from './garage.api.service';

describe('CarApiService', () => {
	let service: GarageApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GarageApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
