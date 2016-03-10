app.controller('MeetingsController', ['$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', MeetingsController]);

function MeetingsController($rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
    var mc = this;
    var ref = new Firebase(FIREBASE_URL),
        auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser) {
        if (authUser) {
            var meetingRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/meetings');
            var meetingsInfo = $firebaseArray(meetingRef);
            mc.meetings = meetingsInfo;

            meetingsInfo.$loaded().then(function() {
                $rootScope.howManyMeetings = meetingsInfo.length;
            });
            meetingsInfo.$watch(function() {
                $rootScope.howManyMeetings = meetingsInfo.length;
            });

            mc.addMeeting = function() {
                meetingsInfo.$add({
                    name: mc.meetingname,
                    date: Firebase.ServerValue.TIMESTAMP
                }).then(function() {
                    mc.meetingname = '';
                });
            }; // Add meeting

            mc.deleteMeeting = function(key) {
                meetingsInfo.$remove(key);
            }; // Remove meeting
        }
    });


    mc.message = 'Success!';
}
