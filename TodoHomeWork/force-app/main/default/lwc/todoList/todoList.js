import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import { updateRecord } from "lightning/uiRecordApi";
import getTodoList from "@salesforce/apex/TodosController.getTodoList";
import { reduceErrors } from "c/ldsUtils";

import ID_FIELD from "@salesforce/schema/Todo__c.Id";
import TODO_NAME from "@salesforce/schema/Todo__c.Name";
import TODO_DESCRIPTION from "@salesforce/schema/Todo__c.Description__c";
import TODO_PRIORITY from "@salesforce/schema/Todo__c.Priority__c";
import TODO_CATEGORY from "@salesforce/schema/Todo__c.Category__c";
import TODO_STATUS from "@salesforce/schema/Todo__c.isDone__c";
import TODO_OBJECT from "@salesforce/schema/Todo__c";
import TODO_IMG from "@salesforce/schema/Todo__c.Image__c";

export default class TodoList extends LightningElement {
  objectApiName = TODO_OBJECT;
  todoName = TODO_NAME;
  todoDescription = TODO_DESCRIPTION;
  todoPriority = TODO_PRIORITY;
  todoCategory = TODO_CATEGORY;
  todoStatus = TODO_STATUS;
  todoImg = TODO_IMG;

  id = "";
  newName = "";
  newDescription = "";
  newPriority = "";
  newStatus = "";
  newCategory = "";

  openModal = false;

  showModal(event) {
    this.openModal = true;

    this.id = event.target.dataset.recordid;
  }

  closeModal() {
    this.openModal = false;
  }

  todos;
  error;

  /** Wired Apex result so it can be refreshed programmatically */
  wiredTodosResult;

  @wire(getTodoList)
  wiredTodos(result) {
    this.wiredTodosResult = result; // почему не result.data??
    if (result.data) {
      this.todos = result.data;
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.todos = undefined;
    }
  }

  handleInputName(event) {
    this.newName = event.target.value;
  }
  handleInputDescription(event) {
    this.newDescription = event.target.value;
  }
  handleInputPriority(event) {
    this.newPriority = event.target.value;
  }
  handleInputCategory(event) {
    this.newCategory = event.target.value;
  }
  handleInputStatus(event) {
    this.newStatus = event.target.checked;
  }

  updateTodo() {
    this.newName = this.template.querySelector(".inputName").value;
    this.newDescription =
      this.template.querySelector(".inputDescription").value;
    this.newPriority = this.template.querySelector(".inputPriority").value;
    this.newStatus = this.template.querySelector(".inputStatus").value;
    this.newCategory = this.template.querySelector(".inputCategory").value;

    const fields = {};
    fields[ID_FIELD.fieldApiName] = this.id;
    fields[TODO_NAME.fieldApiName] = this.newName;
    fields[TODO_DESCRIPTION.fieldApiName] = this.newDescription;
    fields[TODO_PRIORITY.fieldApiName] = this.newPriority;
    fields[TODO_CATEGORY.fieldApiName] = this.newCategory;
    fields[TODO_STATUS.fieldApiName] = this.newStatus;

    const recordInput = { fields };
    this.openModal = false;

    updateRecord(recordInput)
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Todo updated",
            variant: "success"
          })
        );
        return refreshApex(this.wiredTodosResult); // почему нельзу просто todos рефрешить?
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error deleting record",
            message: reduceErrors(error).join(", "),
            variant: "error"
          })
        );
      });
  }
}
