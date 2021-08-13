import { TestBed } from '@angular/core/testing'

import { LoginComponentGuard } from './login-component.guard'

describe('LoginComponentGuard', () => {
  let guard: LoginComponentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginComponentGuard)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy()
  });
});
