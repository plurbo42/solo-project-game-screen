app.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.imageUrl = {};
  self.userRole = { details: [] };
  
  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }

  self.uploadProfilePicture = function () {
    console.log('uploadProfilePicture')
    var fsClient = filestack.init('AR2OVvMAHTTiTRo7bG05Vz');
    function openPicker() {
      fsClient.pick({
        fromSources: ["local_file_system", "url", "imagesearch", "facebook"],
        maxSize: 102400000,
        maxFiles: 5,
        minFiles: 1,
        imageDim: [400, 250],
        transformations:{
          circle:true}
      }).then(function (response) {
        // declare this function to handle response
        self.imageUrl.image_url = response.filesUploaded[0].url;
        console.log('IS THIS EVEN WORKING', self.userObject, self.imageUrl);
        $http({
          method: 'PUT',
          url: '/user/profilePicture',
          data: self.imageUrl
        }).then(function (response) {
          console.log('response', response);
        })
      });
    }
    openPicker();
  };

  self.getRole = function(campaignId) {
    $http({
      method: 'GET',
      url: '/user/role/' + campaignId
    }).then(function (response){
      console.log(response.data);
      self.userRole.details = response.data;
    })
  }

});
