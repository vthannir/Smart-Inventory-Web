document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    var issueId = chance.guid();
    var issueMobileName = document.getElementById('issueMobileNameInput').value;
    var issueDescription = document.getElementById('issueDesciption').value;
    var issueNumberOfDevices = document.getElementById('issueMobilesInput').value;
    var issuePrice = document.getElementById('issuePriceInput').value;
    var issueStatus = 'Open';
    
    var issue = {
      id: issueId,
      MobileName: issueMobileName,
      description: issueDescription,
      NumberOfDevices: issueNumberOfDevices,
      price: issuePrice,
      status: issueStatus
    }
    
    if (localStorage.getItem('issues') === null) {
      var issues = [];
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    } else {
      var issues = JSON.parse(localStorage.getItem('issues'));
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    }
    
    document.getElementById('issueInputForm').reset();
   
    fetchIssues();
    
    e.preventDefault(); 
  }

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for(var i=0; i < issues.length; i++){
    if(issues[i].id == id) {
      issues[i].status = 'Request send to Admin';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function setStatusCancel(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
  
    for(var i=0; i < issues.length; i++){
      if(issues[i].id == id) {
        issues[i].status = 'Request has been cancelled';
      }
    }
  
    localStorage.setItem('issues', JSON.stringify(issues));
  
    fetchIssues();
  }

function deleteIssue(id) {

  var issues = JSON.parse(localStorage.getItem('issues'));

  for(var i=0; i < issues.length; i++){
    if(issues[i].id == id) {
      issues.splice(i,1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();

}

function fetchIssues () {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    for (var i = 0; i < issues.length; i++) {
      var id = issues[i].id;
      var MobileName = issues[i].MobileName;
      var Specification = issues[i].description;
      var NumberOfDevices = issues[i].NumberOfDevices;
      var price = issues[i].price;
      var status = issues[i].status;
      
      issuesList.innerHTML +=   '<div class="well">'+
                                // '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3> Mobile Name: ' + MobileName + '</h3>'+
                                '<h4> Description: ' + Specification + '</h4>'+
                                '<p><span class="glyphicon glyphicon-phone"></span> ' + NumberOfDevices + ' '+
                                '<span class="glyphicon glyphicon-usd"></span> ' + price + '</p>'+
                                '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Accept</a> '+
                                '<a href="#" class="btn btn-warning" onclick="setStatusCancel(\''+id+'\')">Cancel</a> '+
                                
                                '</div>'
    }
  }