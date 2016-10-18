// Update the declarative rules on install or upgrade.
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // When a page contains a .pdf suffix...
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { urlSuffix: 'pdf'}
        })
      ],
      // ... show the page action.
      actions: [new chrome.declarativeContent.ShowPageAction()]

    }]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab){
  var User;
  var Pass;
  var DBID;
  var ArchID;

  chrome.storage.sync.get({
    Username: '',
    Password: '',
    DatabaseID: '1',
    ArchiveID: '2'
  }, function(items) {
    User = items.Username;
    Pass = items.Password;
    DBID = items.DatabaseID;
    ArchID = items.ArchiveID;

    var EncodedCredentials = btoa(User+':'+Pass);

    //Step 1: Get a license token for our API calls.
    $.ajax({
      type: "GET",
      async: false,
      timeout: 5000,
      headers: {"Authorization":"basic " + EncodedCredentials},
      url: 'http://localhost/square9api/api/licenses ',
      success: function (data)
      {
        var token = data.Token;

        //Step 2: Download the url to the server's cache.
        $.ajax({
          type: "GET",
          async: false,
          timeout: 5000,
          headers: {"Authorization":"basic " + EncodedCredentials},
          url: 'http://localhost/square9api/api/upload?url=' + tab.url + '&token=' + token,
          success: function (data)
          {
            var filename = data;

            //Step 3: Index the document to the desired archive.
            $.ajax({
              type: "POST",
              contentType: "application/json; charset=utf-8",
              async: false,
              timeout: 5000,
              headers: {"Authorization":"basic " + EncodedCredentials},
              url: 'http://localhost/square9api/api/dbs/' + DBID + '/archives/' + ArchID + '?token=' + token, 
              data: JSON.stringify(
              {
                "fields":
                [
                  {
                    "name":"5",
                    "value":"Downloaded at Encompass!"
                  }
                ],
                "files":
                [
                  {
                    "name":filename
                  }
                ]
              }),
              success: function (data)
              {
                
                //Step 4: Release the license token we've been using.
                $.ajax({
                  type: "GET",
                  async: false,
                  timeout: 5000,
                  headers: {"Authorization":"basic " + EncodedCredentials},
                  url: 'http://localhost/square9api/api/licenses/' + token, 
                  success: function (data)
                  {
                    console.log("File successfully imported into GlobalSearch Database " + DBID + ", Archive " + ArchID + ".");
                  },
                  error: function (error)
                  {
                    console.log(error);
                  }
                });
                
              },
              error: function (error)
              {
                console.log(error);
              }
            });

          },
          error: function (error)
          {
            console.log(error);
          }
        });

      },
      error: function (error)
      {
        console.log(error);
      }
    });

  });
});