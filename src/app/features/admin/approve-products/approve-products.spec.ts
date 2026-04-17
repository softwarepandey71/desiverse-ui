import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProducts } from './approve-products';

describe('ApproveProducts', () => {
  let component: ApproveProducts;
  let fixture: ComponentFixture<ApproveProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
