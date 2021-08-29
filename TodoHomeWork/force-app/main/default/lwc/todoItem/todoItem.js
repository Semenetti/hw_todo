import { LightningElement } from "lwc";

import TODO_NAME from "@salesforce/schema/Todo__c.Name";
import TODO_DESCRIPTION from "@salesforce/schema/Todo__c.Description__c";
import TODO_PRIORITY from "@salesforce/schema/Todo__c.Priority__c";
import TODO_CATEGORY from "@salesforce/schema/Todo__c.Category__c";
import TODO_STATUS from "@salesforce/schema/Todo__c.isDone__c";
import TODO_OBJECT from "@salesforce/schema/Todo__c";

export default class TodoItem extends LightningElement {
  objectApiName = TODO_OBJECT;
  todoName = TODO_NAME;
  todoDescription = TODO_DESCRIPTION;
  todoPriority = TODO_PRIORITY;
  todoCategory = TODO_CATEGORY;
  todoStatus = TODO_STATUS;

  handleSuccess() {
    this.dispatchEvent(new CustomEvent("success"));
  }
}
