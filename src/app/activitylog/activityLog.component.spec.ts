import { ComponentFixture, TestBed } from '@angular/core/testing';

import { activityLogComponent } from './activityLog.component';

describe('activityLogComponent', () => {
  let component: activityLogComponent;
  let fixture: ComponentFixture<activityLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [activityLogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(activityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
