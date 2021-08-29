public with sharing class TodosController {
  @AuraEnabled(cacheable=true)
  public static List<Todo__c> getTodoList() {
    return [
      SELECT
        Id,
        Name,
        Description__c,
        Image__c,
        Priority__c,
        isDone__c,
        Title__c,
        Category__c,
        Category_color__c,
        Color__c
      FROM Todo__c
      WITH SECURITY_ENFORCED
    ];
  }
  @AuraEnabled(cacheable=true)
  public static Todo__c getSingleTodo(String id) {
    return [
      SELECT
        Id,
        Name,
        Description__c,
        Image__c,
        Priority__c,
        isDone__c,
        Title__c,
        Category__c,
        Category_color__c,
        Color__c
      FROM Todo__c
      WHERE id = :id
      WITH SECURITY_ENFORCED
      LIMIT 1
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Todo__c> findTodos(String searchKey) {
    String key = '%' + searchKey + '%';
    return [
      SELECT
        Id,
        Name,
        Description__c,
        Image__c,
        Priority__c,
        isDone__c,
        Title__c,
        Category__c
      FROM Todo__c
      WHERE Name LIKE :key OR Category__c LIKE :key
      WITH SECURITY_ENFORCED
    ];
  }
}
