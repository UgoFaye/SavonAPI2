import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteIndexComponent } from './recette-index.component';

describe('RecetteIndexComponent', () => {
  let component: RecetteIndexComponent;
  let fixture: ComponentFixture<RecetteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecetteIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecetteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
