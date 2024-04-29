import { TestBed } from '@angular/core/testing';

import { EngineApiService } from './engine.api.service';

describe('EngineApiService', () => {
	let service: EngineApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EngineApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
