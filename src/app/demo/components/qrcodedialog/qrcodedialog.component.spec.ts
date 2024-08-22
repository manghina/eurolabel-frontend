import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodedialogComponent } from './qrcodedialog.component';

describe('QrcodedialogComponent', () => {
  let component: QrcodedialogComponent;
  let fixture: ComponentFixture<QrcodedialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrcodedialogComponent]
    });
    fixture = TestBed.createComponent(QrcodedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
