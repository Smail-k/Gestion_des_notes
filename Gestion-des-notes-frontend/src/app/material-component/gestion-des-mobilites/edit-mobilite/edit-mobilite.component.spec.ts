import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMobiliteComponent } from './edit-mobilite.component';

describe('EditMobiliteComponent', () => {
  let component: EditMobiliteComponent;
  let fixture: ComponentFixture<EditMobiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMobiliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMobiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
