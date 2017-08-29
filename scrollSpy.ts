import { Injectable, NgZone } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ScrollSpyService {

  constructor(private zone: NgZone) { }

  public scrollSpyOn(querySelector) {
    return this.onScrollEvent
      .mergeMap(event => {
        const arr = Array.prototype.slice.call(document.querySelectorAll(querySelector))
          .filter(item => this.isElementInViewport(item));
        return Observable.of(arr)
      })
      .filter(arr => arr.length > 0)
  }

  public scrollSpyOnFirst(querySelector) {
    return this.onScrollEvent
      .map(event =>
        this.isElementInViewport(document.querySelector(querySelector))
      );
  }

  public isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }

  get onScrollEvent() {
    return this.zone.runOutsideAngular(() => {
      return Observable.fromEvent(window, 'scroll');
    });
  }
}

// just inject NgZone and call
// this.zone.runOutsideAngular( () => { //stuff you don't want angular to know about till it's ready} )
// then when you want to emit an event
// this.zone.run(()=> { //event you want angular to know about}
