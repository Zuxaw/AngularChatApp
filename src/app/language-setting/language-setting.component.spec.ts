import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSettingComponent } from './language-setting.component';

describe('LanguageSettingComponent', () => {
  let component: LanguageSettingComponent;
  let fixture: ComponentFixture<LanguageSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
