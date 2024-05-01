import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../../shared/models/winners.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'race-dialog',
	standalone: true,
	imports: [MatButtonModule],
	templateUrl: './dialog.component.html',
	styleUrl: './dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
	public readonly data: DialogData = inject(MAT_DIALOG_DATA);

	private readonly dialogRef = inject(MatDialogRef<DialogComponent>);

	closeDialog(): void {
		this.dialogRef.close();
	}
}
