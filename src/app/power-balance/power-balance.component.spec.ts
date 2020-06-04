import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBalanceComponent } from './power-balance.component';

describe('PowerBalanceComponent', () => {
  let component: PowerBalanceComponent;
  let fixture: ComponentFixture<PowerBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
