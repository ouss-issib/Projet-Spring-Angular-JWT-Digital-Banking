import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAccountsByTypeComponent } from './dashboard-accounts-by-type.component';

describe('DashboardAccountsByTypeComponent', () => {
  let component: DashboardAccountsByTypeComponent;
  let fixture: ComponentFixture<DashboardAccountsByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAccountsByTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAccountsByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
