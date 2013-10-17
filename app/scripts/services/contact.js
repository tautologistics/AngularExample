'use strict';

angular.module('App')

  .factory('ContactSvc', ['$resource', function ($resource) {
    var svc = $resource('/api/contacts/:id', { id: '@id' }, {});
    /* Helper method for creating new, blank Contacts or cloning
     * existing ones. If data (hash or contact) is passed, its
     * values are copied to the new instance, otherwise an empty
     * contact instance is created
     */
    svc.create = function (data) {
      return new svc(data || {
        id: undefined,
        companyName: '',
        contactName: '',
        address: '',
        email: '',
        phone: '',
        url: ''
      });
    };
    return svc;
  }]);
