app.service('BoardService', function ($http, $location) {
    console.log('BoardService Loaded');
    var self = this;
    self.commentArray = { list: [] };
    self.campaignId = '';
    self.newComment = { content: '' };

    self.getComments = function (campaignId) {
      self.campaignId = campaignId;
      $http({
        method: 'GET',
        url: '/board/all/' + campaignId,
      }).then(function(response){
        console.log(response.data);
        self.commentArray.list = response.data;
      })
    };

    self.postComment = function (newCommentObject) {
      newCommentObject.campaign_id = self.campaignId;
      $http({
        method: 'POST',
        url: '/board/post',
        data: newCommentObject,
      }).then(function (response){
        console.log(response);
        self.getComments(self.campaignId);
        self.newComment.content = '';
      })
    }
  });
  