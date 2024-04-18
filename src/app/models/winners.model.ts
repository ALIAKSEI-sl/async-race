type Sort = 'id' | 'wins' | 'time';

type Order = 'ASC' | 'DESC';

export interface IWinner {
	id: number;
	wins: number;
	time: number;
}

export interface IWinnersParam {
	page: number;
	sort: Sort;
	order: Order;
	limit?: number;
}

export interface IOrder {
	sort: Sort;
	order: Order;
}
