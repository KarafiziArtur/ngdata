app.controller('CheckinsController', ['$rootScope', '$firebaseObject', '$firebaseArray', '$stateParams', '$location', 'FIREBASE_URL', CheckinsController]);

function CheckinsController($rootScope, $firebaseObject, $firebaseArray, $stateParams, $location, FIREBASE_URL) {
    var cc = this;
    cc.whichuser = $stateParams.uId;
    cc.whichmeeting = $stateParams.mId;
    var ref = new Firebase(FIREBASE_URL + 'users/' + cc.whichuser + '/meetings/' + cc.whichmeeting + '/checkins');

    var checkinsList = $firebaseArray(ref)
    cc.checkins = checkinsList;
    cc.query = '';
    cc.order = 'firstname';
    cc.direction = null;
    cc.recordId = '';

    cc.addCheckin = function() {
        var checkinsInfo = $firebaseArray(ref);
        var data = {
            firstname: cc.user.firstname,
            lastname: cc.user.lastname,
            email: cc.user.email,
            date: Firebase.ServerValue.TIMESTAMP
        };

        checkinsInfo.$add(data).then(function() {
            $location.path('/checkins/' + cc.whichuser + '/' + cc.whichmeeting + '/checkinsList')
        });
    }; // AddCheckin

    cc.deleteCheckin = function(id) {
        var refDel = new Firebase(FIREBASE_URL + 'users/' + cc.whichuser + '/meetings/' + cc.whichmeeting + '/checkins/' + id);
        var record = $firebaseObject(refDel);
        record.$remove(id);
    }; // DeleteCheckin

    cc.pickRandom = function() {
        var whichRandom = Math.round(Math.random() * (checkinsList.length - 1));
        cc.recordId = checkinsList.$keyAt(whichRandom);
    }; // PickRandom

    cc.showLove = function(myCheckin) {
        myCheckin.show = !myCheckin.show;
        myCheckin.userState == 'expanded' ? myCheckin.userState = '' : myCheckin.userState = 'expanded'
    }; // ShowLove
    
    cc.giveLove = function(myCheckin, myGift) {
        var refLove = new Firebase(FIREBASE_URL + 'users/' + cc.whichuser + '/meetings/' + cc.whichmeeting +
            '/checkins/' + myCheckin.$id + '/awards');
        var checkinsArray = $firebaseArray(refLove);
        var data = {
            name: myGift,
            date: Firebase.ServerValue.TIMESTAMP
        };
        checkinsArray.$add(data);
    }; // GiveLove
    
    cc.deleteAward = function(checkinId, awardId) {
        var refAward = new Firebase(FIREBASE_URL + 'users/' + cc.whichuser + '/meetings/' + cc.whichmeeting +
            '/checkins/' + checkinId + '/awards/' + awardId);
        var recordAward = $firebaseObject(refAward);
        recordAward.$remove();
    }; // DeleteAward
    
    
    
    

    
    
    
    
    
}

































