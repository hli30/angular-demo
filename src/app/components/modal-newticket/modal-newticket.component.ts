import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { BugService } from 'src/app/services/bug.service';
import { Bug } from 'src/app/interfaces/Bug';

@Component({
  selector: 'app-modal-newticket',
  templateUrl: './modal-newticket.component.html',
  styleUrls: ['./modal-newticket.component.css'],
})
export class ModalNewticketComponent implements OnInit {
  subject = new FormControl('');
  description = new FormControl('');
  formTitle = 'Create New Bug Ticket';

  constructor(
    public dialogRef: MatDialogRef<ModalNewticketComponent>,
    private bugService: BugService,
    @Inject(MAT_DIALOG_DATA) public formData: any
  ) {}

  ngOnInit(): void {
    // type is either 'create' or 'update'
    if (this.formData.type == 'create') return;

    // Set prefilled values if we are editing the ticket
    this.subject.setValue(this.formData.subject);
    this.description.setValue(this.formData.description);
    this.formTitle = 'Edit Bug Ticket';
  }

  onSubmitClick() {
    const newBug: Bug = {
      ownerId: this.formData.ownerId,
      subject: this.subject.value || '',
      description: this.description.value || '',
    };

    // can show spinner here while waiting for this modal to be closed

    // If there's no id then create new entry
    if (this.formData.type == 'create') {
      this.bugService
        .createBug(newBug)
        .subscribe((_) => this.dialogRef.close(true));
      return;
    }
    // Otherwise, update existing entry
    newBug.id = this.formData.id;
    this.bugService
      .updateBug(newBug)
      .subscribe((_) => this.dialogRef.close(true));
  }
}
