import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideAnimations()],
    })
      .overrideComponent(App, { set: { template: '<div></div>' } })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have title "attus"', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance['title']()).toBe('attus');
  });
});
