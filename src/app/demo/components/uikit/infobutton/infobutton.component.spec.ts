import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobuttonComponent } from './infobutton.component';

describe('InfobuttonComponent', () => {
  let component: InfobuttonComponent;
  let fixture: ComponentFixture<InfobuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfobuttonComponent]
    });
    fixture = TestBed.createComponent(InfobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
