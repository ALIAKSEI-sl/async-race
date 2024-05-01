import { Car } from './garage.model';

type Order = 'ASC' | 'DESC';
export type Sort = 'id' | 'wins' | 'time';

export type WinnersParam = [number, OrderWinners];

export interface Winner {
	id: number;
	wins: number;
	time: number;
}

export interface FullWinner extends Winner, Car {}
export interface CreationWinner extends Omit<Winner, 'id'> {}

export interface GettingWinners {
	page: number;
	sort: Sort;
	order: Order;
	limit?: number;
}

export interface OrderWinners {
	sort: Sort;
	order: Order;
}

export interface WinnerResult {
	id: number;
	time: string;
}

export interface DialogData {
	name: string;
	time: string;
}

export interface SortingLabel {
	id: string;
	wins: string;
	time: string;
}
