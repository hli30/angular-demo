import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewticketComponent } from './modal-newticket.component';

describe('ModalNewticketComponent', () => {
  let component: ModalNewticketComponent;
  let fixture: ComponentFixture<ModalNewticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
