import { LightningElement } from "lwc";

import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Modal extends LightningElement {
  openModal = false;

  showModal() {
    this.openModal = true;
  }

  closeModal() {
    this.openModal = false;
  }

  handleSuccess() {
    if (this.recordId !== null) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "SUCCESS!",
          message: "New record has been created.",
          variant: "success"
        })
      );
    }
    this.openModal = false;
  }
}
