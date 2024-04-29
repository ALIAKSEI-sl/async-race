import { TestBed } from '@angular/core/testing';

import { WinnersKeeperService } from './winners.keeper.service';

describe('WinnersKeeperService', () => {
	let service: WinnersKeeperService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WinnersKeeperService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
