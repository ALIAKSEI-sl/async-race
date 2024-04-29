import { CAR_MODELS } from '../constants/cars-model';

export type CarNames = keyof typeof CAR_MODELS;

export interface Car {
	name: string;
	color: string;
	id: number;
}

export interface CreationCar extends Omit<Car, 'id'> {}

export interface MoveAnimation {
	state: 'start' | 'end';
	start: number;
	end: number;
	duration: string;
}
