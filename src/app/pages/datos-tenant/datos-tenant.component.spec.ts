import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTenantComponent } from './datos-tenant.component';

describe('DatosTenantComponent', () => {
  let component: DatosTenantComponent;
  let fixture: ComponentFixture<DatosTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
