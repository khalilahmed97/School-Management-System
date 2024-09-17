import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserCellComponent } from './custom-user-cell.component';

describe('CustomUserCellComponent', () => {
  let component: CustomUserCellComponent;
  let fixture: ComponentFixture<CustomUserCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomUserCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomUserCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
