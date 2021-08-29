import { LightningElement, api } from "lwc";

export default class ColorBar extends LightningElement {
  @api percentage;

  get style() {
    return `width: ${this.percentage}%`;
  }
}
