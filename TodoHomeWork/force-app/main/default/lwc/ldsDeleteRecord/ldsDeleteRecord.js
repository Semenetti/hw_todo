import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import { deleteRecord } from "lightning/uiRecordApi";
import getTodoList from "@salesforce/apex/TodosController.getTodoList";
import { reduceErrors } from "c/ldsUtils";

export default class LdsDeleteRecord extends LightningElement {
  todos;
  error;

  /** Wired Apex result so it can be refreshed programmatically */
  wiredTodosResult;

  @wire(getTodoList)
  wiredTodos(result) {
    this.wiredTodosResult = result;
    if (result.data) {
      this.todos = result.data;
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.todos = undefined;
    }
  }

  deleteTodo(event) {
    const recordId = event.target.dataset.recordid;
    deleteRecord(recordId)
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Todo deleted",
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
