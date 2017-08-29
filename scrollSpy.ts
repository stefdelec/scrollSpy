import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ScrollSpyService {

  constructor() { }

  public scrollSpyOn(querySelector) {
    return Observable.fromEvent(window, 'scroll')
      .mergeMap(event => {
        const arr = Array.prototype.slice.call(document.querySelectorAll(querySelector))
          .filter(item => this.isElementInViewport(item));
        return Observable.of(arr)
      })
      .filter(arr => arr.length > 0)
  }

  public scrollSpyOnFirst(querySelector) {
    return Observable.fromEvent(window, 'scroll')
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
}
