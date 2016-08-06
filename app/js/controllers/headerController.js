
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('HeadListCtrl', function ($scope) {
  $scope.options = [
     {'oname': 'ELECTRONICS',
     },
     {'oname': 'HOME & KITCHEN',
     },
     {'oname': 'MEN',
     },
     {'oname': 'WOMEN',
     },
     {'oname': 'BABY & KIDS',
     },
     {'oname': 'BOOKS & MEDIA',
     },
     {'oname': 'MORE STORES',
     },
     {'oname': 'OFFER ZONE',
     },
  ];
});;	