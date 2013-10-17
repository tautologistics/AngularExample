'use strict';

angular.module('App')

  .controller('MainCtrl', ['$scope', '$http', 'ContactSvc', function ($scope, $http, ContactSvc) {

      // Load up contacts from service
      $scope.contacts = {};
      ContactSvc.query(function (contacts) {
        contacts.forEach(function (contact) {
          $scope.contacts[contact.id] = contact;
        });
      });

      // Resets currently edited contact and clears any selected contact
      $scope.clearContact = function (targetForm) {

        $scope.selectedContact = undefined;
        $scope.currentContact = ContactSvc.create();

        /* Reassigning model is not enough, must also clear form's dirty state
         * for validation errors to clear. $setPristine() et al are available
         * in angular 1.1+ so using bower unstable angular packages
         */
        if (targetForm) {
          targetForm.$setPristine();
        }
      };

      $scope.addContact = function (contact, targetForm) {
        contact.id = undefined;
        contact.$save(function (savedContact) {
          $scope.contacts[savedContact.id] = savedContact;
          $scope.clearContact(targetForm);
        });
      };

      $scope.updateContact = function (contact, targetForm) {
        contact.$save(function (savedContact) {
          $scope.contacts[savedContact.id] = savedContact;
          $scope.clearContact(targetForm);
        });
      };

      // Configuration for select2 directive
      $scope.select2cfg = {
        allowClear: true,
        matcher: function (term, text, option) {
          var contact = $scope.contacts[option.val()];
          if (!contact) {
            return false;
          }
          return contact.contactName.toUpperCase().indexOf(term.toUpperCase()) > -1;
        }
      };

      //TODO: switch to using phone.js for validation
      // Check if number starts with a '+' or # followed by one or more #, -, (, ), or ' '
      $scope.phoneRegex = /^\s*[+\d][\d\-\(\)\s]+\s*$|^$/;

      // Formats the label for contact search results
      $scope.formatSearchResult = function (contact) {
        if (!contact) {
          return '';
        }
        return contact.contactName + ' - ' + contact.companyName;
      };

      // When the contact search selects a contact ID, copy the contact for the edit form
      $scope.$watch('selectedContact', function (newVal, oldVal) {
        $scope.currentContact = ContactSvc.create($scope.contacts[newVal]);
      });

      // Initialization
      $scope.ContactSvc = ContactSvc;
      $scope.clearContact();

    }]);
