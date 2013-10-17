'use strict';

// App wrapper for developing offline

angular.module('AppDev', ['ngMockE2E', 'App'])

  .run(['$httpBackend', 'uuid4', function ($httpBackend, uuid4) {

    // Methods for managing contact data (normally in REST API on server)
    var contactApi = {

      contacts: {},

      get: function (id) {
        return contactApi.contacts[id];
      },

      list: function () {
        return contactApi.contacts;
      },

      add: function (contact) {
        contact.id = uuid4.generate();
        contactApi.contacts[contact.id] = contact;
        return contact;
      },

      update: function (contact) {
        if (!contactApi.contacts[contact.id]) {
          return null;
        }
        contactApi.contacts[contact.id] = contact;
        return contact;
      },

      del: function (id) {
        var contact = this.get(id);
        if (!contact) {
          return null;
        }
        delete contactApi.contacts[id];
        return contact;
      }

    };

    // Mocked REST API
    $httpBackend.whenGET(/^\/api\/contacts\/?$/).respond(function (method, url, data) {
      return [200, Object.keys(contactApi.contacts).map(function (id) { return contactApi.contacts[id]; })];
    });
    $httpBackend.whenGET(/^\/api\/contacts\/.+/).respond(function (method, url, data) {
      var id = url.split('/').pop();
      var contact = contactApi.get(id);
      return [contact ? 200 : 404, contact];
    });
    $httpBackend.whenGET(/^api\/.*/).respond(404);

    $httpBackend.whenPOST(/^\/api\/contacts\/?$/).respond(function (method, url, data) {
      console.log(1, arguments);
      return [200, contactApi.add(JSON.parse(data))];
    });
    $httpBackend.whenPOST(/^\/api\/contacts\/.+/).respond(function (method, url, data) {
      console.log(2, arguments);
      var id = url.split('/').pop();
      var contact = JSON.parse(data);
      contact.id = id;
      var savedContact = contactApi.update(contact);
      return [savedContact ? 200 : 404, savedContact];
    });
    $httpBackend.whenPOST(/^api\/.*/).respond(404);

    $httpBackend.whenGET(/.*/).passThrough();
    // $httpBackend.whenHEAD(/.*/).response();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).respond(function(method, url, data) {
      return [204];
    });

    // Boostrap some contact data
    [{
      contactName: 'Dr. Eldon Tyrell',
      companyName: 'Tyrell Corp.',
      address: '2019 Nexus Circle\nLos Angeles, CA 90006',
      email: 'e.tyrell@tyrellcorp.com',
      phone: '+1 (734) 523-8342',
      url: 'http://tyrellcorp.com/'
    },
    {
      contactName: 'Lord John Whorfin',
      companyName: 'Yoyodyne Propulsion Systems',
      address: '8th Dimension\nGrover\'s Mill, NJ 07294',
      email: 'john@redlectroids.net',
      phone: '+1 (734) 523-8342',
      url: 'http://redlectroids.net/'
    },
    {
      contactName: 'Dick Jones',
      companyName: 'Omni Consumer Products',
      address: '209 Boddicker Lane\nOld Detroit, MI 48209',
      email: 'john@redlectroids.net',
      phone: '+1 (734) 523-8342',
      url: 'http://redlectroids.net/'
    }].forEach(function (contact) {
      contactApi.add(contact);
    });

  }])
  ;
