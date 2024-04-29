export type Status = 'started' | 'stopped' | 'drive';

export interface Movement {
	velocity: number;
	distance: number;
}

export interface DriveStatus {
	success: boolean;
}
