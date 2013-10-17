'use strict';

describe('Controller: MainCtrl', function () {
  var scope, ctrl, httpBackend;

  var contacts = [{
      id: 'xxx-xxx-xxx-xxx',
      contactName: 'Dr. Eldon Tyrell',
      companyName: 'Tyrell Corp.',
      address: '2019 Nexus Circle\nLos Angeles, CA 90006',
      email: 'e.tyrell@tyrellcorp.com',
      phone: '+1 (734) 523-8342',
      url: 'http://tyrellcorp.com/'
    },
    {
      id: 'yyy-yyy-yyy-yyy',
      contactName: 'Lord John Whorfin',
      companyName: 'Yoyodyne Propulsion Systems',
      address: '8th Dimension\nGrover\'s Mill, NJ 07294',
      email: 'john@redlectroids.net',
      phone: '+1 (734) 523-8342',
      url: 'http://redlectroids.net/'
    },
    {
      id: 'zzz-zzz-zzz-zzz',
      contactName: 'Dick Jones',
      companyName: 'Omni Consumer Products',
      address: '209 Boddicker Lane\nOld Detroit, MI 48209',
      email: 'john@redlectroids.net',
      phone: '+1 (734) 523-8342',
      url: 'http://redlectroids.net/'
    }];


  beforeEach(angular.mock.module('App'));
  beforeEach(angular.mock.inject(function ($rootScope, $controller, $httpBackend) {
    scope = $rootScope.$new();
    $controller('MainCtrl', { $scope: scope });
    httpBackend = $httpBackend;
    httpBackend.whenGET(/^\/api\/contacts\/?$/).respond(contacts);
    httpBackend.whenPOST(/^\/api\/contacts\/?$/).respond(function (method, url, data) {
      var contact = JSON.parse(data);
      contact.id = 'ttt-ttt-ttt-ttt';
      return [200, contact];
    });
  }));

  it("should have currentContact == empty contact", function ($scope) {
    // dump(Object.keys(scope));
    expect(scope.currentContact).toEqual(scope.ContactSvc.create());
  });

  it('should load a list of contacts', function () {
    expect(scope.contacts).toEqual({});

    httpBackend.flush();

    expect(Object.keys(scope.contacts).length).toBe(3);
  });

  it('should be able to add a contact', function () {
    expect(scope.selectedContact).toBeUndefined();

    scope.currentContact.contactName = 'Dick Jones';
    scope.currentContact.companyName = 'Omni Consumer Products';
    scope.currentContact.address = '209 Boddicker Lane\nOld Detroit, MI 48209';
    scope.currentContact.email = 'john@redlectroids.net';
    scope.currentContact.phone = '+1 (734) 523-8342';
    scope.currentContact.url = 'http://redlectroids.net/';
    scope.addContact(scope.currentContact);
    httpBackend.flush();

    expect(Object.keys(scope.contacts).length).toBe(4);
    expect(scope.contacts['ttt-ttt-ttt-ttt']).toBeDefined();
    expect(scope.selectedContact).toBeUndefined();
    expect(scope.currentContact).toEqual(scope.ContactSvc.create());
  });

});
