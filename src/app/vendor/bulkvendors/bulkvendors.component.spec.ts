import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkvendorsComponent } from './bulkvendors.component';

describe('BulkvendorsComponent', () => {
  let component: BulkvendorsComponent;
  let fixture: ComponentFixture<BulkvendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkvendorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkvendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
