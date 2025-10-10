import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleCenterComponent } from './battle-center.component';

describe('BattleCenterComponent', () => {
  let component: BattleCenterComponent;
  let fixture: ComponentFixture<BattleCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
