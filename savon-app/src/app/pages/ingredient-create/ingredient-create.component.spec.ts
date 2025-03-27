import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientFormComponent } from './ingredient-create.component';

describe('IngredientCreateComponent', () => {
  let component: IngredientFormComponent;
  let fixture: ComponentFixture<IngredientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
