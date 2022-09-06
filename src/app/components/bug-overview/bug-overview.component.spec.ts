import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugOverviewComponent } from './bug-overview.component';

describe('BugOverviewComponent', () => {
  let component: BugOverviewComponent;
  let fixture: ComponentFixture<BugOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
