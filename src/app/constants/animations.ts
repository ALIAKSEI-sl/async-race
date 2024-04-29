import { state, style, animate, transition } from '@angular/animations';
import { MoveAnimation } from '../models/garage.model';

export const moveAnimation = [
	state(
		'start',
		style({
			transform: 'translateX({{ startX }}px)'
		}),
		{ params: { startX: 0 } }
	),
	state(
		'end',
		style({
			transform: 'translateX({{ endX }}px)'
		}),
		{ params: { endX: 0 } }
	),
	transition('start => end', animate('{{ duration }}s linear')),
	transition('end => start', animate('0s'))
];

export const animationInit: MoveAnimation = {
	end: 0,
	start: 0,
	duration: '0',
	state: 'start'
};
