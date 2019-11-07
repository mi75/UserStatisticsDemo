import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersStatisticComponent } from './users-statistic.component';

describe('UsersStatisticComponent', () => {
  let component: UsersStatisticComponent;
  let fixture: ComponentFixture<UsersStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
