// Saves options to chrome.storage
function save_options() {
  var User = document.getElementById('User').value;
  var Pass = document.getElementById('Pass').value;
  var DBID = document.getElementById('DBID').value;
  var ArchID = document.getElementById('ArchID').value;
  chrome.storage.sync.set({
    Username: User,
    Password: Pass,
    DatabaseID: DBID,
    ArchiveID: ArchID
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2500);
  });
}

// Restores text box states using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    Username: '',
    Password: '',
    DatabaseID: '1',
    ArchiveID: '2'
  }, function(items) {
    document.getElementById('User').value = items.Username;
    document.getElementById('Pass').value = items.Password;
    document.getElementById('DBID').value = items.DatabaseID;
    document.getElementById('ArchID').value = items.ArchiveID;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);