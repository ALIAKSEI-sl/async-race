import { TestBed } from '@angular/core/testing';

import { CarGenerationService } from './car-generation.service';

describe('CarGenerationService', () => {
	let service: CarGenerationService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CarGenerationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
