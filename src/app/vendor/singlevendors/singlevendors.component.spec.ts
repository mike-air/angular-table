import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglevendorsComponent } from './singlevendors.component';

describe('SinglevendorsComponent', () => {
  let component: SinglevendorsComponent;
  let fixture: ComponentFixture<SinglevendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglevendorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglevendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
