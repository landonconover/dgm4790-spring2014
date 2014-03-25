angular.module('starter.controllers', [])



// Login Controller
.controller('loginCtrl', function($scope, loginService) {
  // "Login" is a service returning mock data (services.js)
  console.log('LoginCtrl fired');
})

// Login Controller
.controller('registerCtrl', function($scope, loginService, tempDataService) {
  // "Login" is a service returning mock data (services.js)
  console.log('Regster fired');
})

.controller('deanCtrl', function($scope, eventService, tempDataService, $stateParams) {
        $scope.myClass = "grey"; //not sure what this is doing...

        var events = eventService.getEvents(); //Create events from eventService service

        events.get(function(response) { //call the get method of our $resource returned from eventService.getEvents();

            $scope.events = response.rows; //Add all the events to the scope.

            for (var i=0; i<response.rows.length; i++) { //loop through and find the cliicked on event (event-details view)
                var doc = response.rows[i].value;

                if (doc.eventName === $stateParams.eventName) {
                   $scope.theEvent =  doc;
                }
            }
        }, function(error) {
            console.log(error); // show the error
        });
}).controller('addEventCtrl', ['$scope', '$resource', 'eventService', function($scope, $resource, eventService){

  $scope.event = {}; //initiate the empty object that will house data being sent to cloudant.

    //temp model of departments for add-event.html
    $scope.departments = [
        {name:"Automotive Technology", abrv:"AT"},
        {name:"Computer Science", abrv:"CS"},
        {name:"Construction Technology", abrv:"CT"},
        {name:"Culinary Arts", abrv:"CA"},
        {name:"Digital Media", abrv:"DGM"},
        {name:"Engineering Graphics & Design", abrv:"EG&D"},
        {name:"Engineering Technology", abrv:"ET"},
        {name:"Information Systems & Technology", abrv:"IS&T"},
        {name:"Technology Management", abrv:"TM"}
    ];

  //Add Event Function
  $scope.submitEvent = function() {

    //Add the depticon icon based on which department was given example: at-green.png
    if ("deparment" in $scope.event)
    {
      console.log('department exists');
    }


    console.log($scope.event);                //Log the details about to be sent to the server
    //var newEvent = eventService.addEvent();   //Create a $resource that points to our API endpoint
    //newEvent.save([], $scope.event);          //POST the data in $scope.event to the Cloudant Server
  };

}]);

function forceOrder($scope) {
      $scope.event = 'value.startDate';
      $scope.resetSearch = function(){$scope.search = "";} //clear search bar
}