/*jslint node: true */
'use strict';

module.exports = function(req, res) {
    res.json([
      {
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
      }
    ]);
};