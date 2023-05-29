import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesMobilitesComponent } from './gestion-des-mobilites.component';

describe('GestionDesMobilitesComponent', () => {
  let component: GestionDesMobilitesComponent;
  let fixture: ComponentFixture<GestionDesMobilitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDesMobilitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDesMobilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
