import { TestBed } from '@angular/core/testing';

import { WinnersApiService } from './winners.api.service';

describe('WinnersApiService', () => {
	let service: WinnersApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WinnersApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
