/* ==========================================================================
 * Stencil Popup Menu Component
 *
 * @author: Andre Goncalves (andre@andregoncalves)
 * @project: st-popup-menu
 * @date: Jun 29 2018
 * @copyright: 2018 Andre Goncalves
 * ==========================================================================
 */

import { Component, Prop, State } from '@stencil/core';
import { Trigger } from './st-popup-types';

const throttled = (delay, fn) => {
  let lastCall = (new Date).getTime();
  return function (...args) {
    const now = (new Date).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}

@Component({
  tag: 'st-popup-menu',
  styleUrl: 'st-popup-menu.css',
  shadow: false
})
export class StPopupMenu {

  @Prop() target: string;
  @Prop() trigger: string = Trigger.hover;
  @Prop() delay: number = 500;

  @State() visible: boolean = false;

  targetEl: HTMLElement;
  popupEl: HTMLDivElement;

  popupWidth: number;
  timer: number;
  isTouch: boolean = false;

  outHandler: EventListenerOrEventListenerObject;
  overHandler: EventListenerOrEventListenerObject;

  componentWillLoad () {
    this.targetEl = document.querySelector(this.target);
    this.targetEl.classList.add('st-popup-menu-host');
  }

  componentDidLoad () {
    this.popupEl = document.querySelector('.st-popup-menu');

    // If touch device always trigger with touch
    window.addEventListener('touchstart', _ => this._switchToClickTrigger(), { once: true });
    window.addEventListener('resize', _ => this._calculatePosition());

    this._calculatePosition();


    if (this.trigger === Trigger.hover) {
      this._setTriggerHover();
    }

    if (this.trigger === Trigger.click) {
      this._setTriggerClick();
    }
  }

  _calculatePosition () {
    if (!this.targetEl) {
      console.warn(`Can't find target element`);
      return;
    }

    const targetElSize = this.targetEl.getBoundingClientRect();

    // Position the popup vertically
    const top  = targetElSize.bottom + 10; // 10 px for the arrow

    // Calculate left coordinate
    // Check if popup exceeds viewport left limit
    let left   = (targetElSize.left + (targetElSize.width / 2) - targetElSize.width);
    left       = left < 0 ? 0 : left;

    // Temporarily position popup to make further calculations
    this.popupEl.style.left = `${left}px`;

    const popupRect  = this.popupEl.getBoundingClientRect();
    const vw: number = document.documentElement.clientWidth;

    // Check if popup exceeds viewport right limit
    if ( popupRect.right > vw ) {
      const diff = popupRect.right - vw;
      left = left - diff;
    }

    // Position the popup
    this.popupEl.style.left = `${left}px`;
    this.popupEl.style.top  = `${top}px`;

    // Position the arrow by changing a CSS custom variable
    // Check st-popup-menu.css
    let center = targetElSize.left + (targetElSize.width / 2) - left;
    this.popupEl.style.setProperty('--arrow-pos', `${center}px`);
  }

  _setTriggerHover () {
    // Show if mouse over target *or* popup menu
    this.targetEl.addEventListener('mouseover', this._showPopup);
    this.popupEl.addEventListener('mouseover',  this._showPopup);

    this.outHandler = throttled(1000, this._mouseLeave);
    this.targetEl.addEventListener('mouseout', this.outHandler);

    this.overHandler = throttled(1000, this._mouseLeave);
    this.popupEl.addEventListener('mouseleave', this.overHandler);
  }

  _showPopup = () => {
    this.popupEl.classList.add('visible');
  }

  _hidePopup = () => {
    this.popupEl.classList.remove('visible');
  }

  _togglePopup = () => {
    this.popupEl.classList.toggle('visible');
  }

  _setTriggerClick () {
    this.targetEl.addEventListener('click', this._togglePopup);
  }

  _switchToClickTrigger = () => {
    // Clear event listeners
    this.targetEl.removeEventListener('mouseover', this._showPopup);
    this.popupEl.removeEventListener('mouseover',  this._showPopup);
    this.targetEl.removeEventListener('mouseout', this.overHandler);
    this.popupEl.removeEventListener('mouseleave', this.overHandler);

    this._setTriggerClick();
  }

  _mouseLeave = () => {
    this.timer = window.setTimeout(this._checkMouseOver, this.delay);
  }

  _checkMouseOver = () => {
    const isHover = (el: HTMLElement) => (el.classList.contains('st-popup-menu') || el.classList.contains('st-popup-menu-host'));
    const els = Array.from(document.querySelectorAll(':hover'));
    const isHoverPopup = els.find((el: HTMLElement) => isHover(el));
    if (!isHoverPopup) {
      this._hidePopup();
    }
    else {
      clearTimeout(this.timer);
      this._mouseLeave();
    }
  }


  render() {
    console.log('render');
    const cssClass = `st-popup-menu ${this.visible?'visible':''}`;

    return (
      <div class={cssClass}>
        <slot />
      </div>
    );
  }
}
