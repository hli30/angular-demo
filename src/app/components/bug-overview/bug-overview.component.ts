import { Component, OnInit } from '@angular/core';
import { Bug } from 'src/app/interfaces/Bug';
import { BugService } from 'src/app/services/bug.service';
import { UserService } from 'src/app/services/user.service';
import { concatMap } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewticketComponent } from '../modal-newticket/modal-newticket.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bug-overview',
  templateUrl: './bug-overview.component.html',
  styleUrls: ['./bug-overview.component.css'],
})
export class BugOverviewComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'owner',
    'subject',
    'description',
    'actions',
  ];
  dataSource: any = [];
  bugs: Bug[] = [];
  currentUserId: number = -1;

  constructor(
    private bugService: BugService,
    private userService: UserService,
    private ticketDialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.currentUserId = Number(params['userId']);
    });
  }

  ngOnInit(): void {
    this.getBugList();
  }

  openTicketDialog(
    formData: any = { type: 'create', ownerId: this.currentUserId }
  ) {
    // Open dialog with data from url param
    const dialogRef = this.ticketDialog.open(ModalNewticketComponent, {
      width: '50%',
      data: formData,
    });

    // Reload data list after dialog closed
    dialogRef.afterClosed().subscribe((shouldReload: boolean) => {
      if (shouldReload) {
        this.getBugList();
      }
    });
  }

  getBugList() {
    this.bugService
      .getBugs()
      .pipe(
        concatMap((bugs: Bug[]) => {
          // Cache bugs for the following user http call
          this.bugs = bugs;
          // Prevent dups by using Set
          let ownerIdsSet = new Set<number>();
          bugs.forEach((bug) => ownerIdsSet.add(bug.ownerId));
          // Covert to array and send to service for another http call
          let ids: number[] = Array.from(ownerIdsSet.values());
          return this.userService.getUsers(ids);
        })
      )
      .subscribe((users: User[]) => {
        // Join the two sets of data on id of User
        this.dataSource = this.bugs.map((bug) => ({
          ...users.find((user) => user.id == bug.ownerId),
          ...bug,
        }));
      });
  }

  deleteBug(bugId: number) {
    this.bugService.deleteBug(bugId).subscribe((_) => {
      this.getBugList();
    });
  }

  editBug(row: any) {
    row.type = 'update';
    this.openTicketDialog(row);
  }
}
