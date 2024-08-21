import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElabelViewComponent } from './elabel-view.component';

describe('ElabelViewComponent', () => {
  let component: ElabelViewComponent;
  let fixture: ComponentFixture<ElabelViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElabelViewComponent]
    });
    fixture = TestBed.createComponent(ElabelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
