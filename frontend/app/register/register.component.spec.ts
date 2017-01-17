/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WfLogin } from './register.component';

describe('WfLogin', () => {
  let component: WfLogin;
  let fixture: ComponentFixture<WfLogin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfLogin ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
