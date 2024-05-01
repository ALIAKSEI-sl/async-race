import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../constants/message';

@Injectable({
	providedIn: 'root'
})
export class SnackBarService {
	private readonly message = Message;
	private readonly snackBar = inject(MatSnackBar);

	public openWithCarNotFound(): void {
		this.snackBar.open(this.message.NOT_FOUND, 'Ok');
	}

	public openWithDuplicateIdError(): void {
		this.snackBar.open(this.message.DUPLICATE_ID, 'Ok');
	}

	public openWithDriveInProgressError(): void {
		this.snackBar.open(this.message.DRIVE_IN_PROGRESS, 'Ok');
	}
}
