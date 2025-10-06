import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovesPageComponent } from './edit-moves-page.component';

describe('EditMovesPageComponent', () => {
  let component: EditMovesPageComponent;
  let fixture: ComponentFixture<EditMovesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMovesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMovesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
