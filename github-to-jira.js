javascript:(function() {
  var branchClasses = document.getElementsByClassName("commit-ref");
  var branchClass = branchClasses[branchClasses.length-1];
  var branchName = branchClass.textContent;
  var branchSplits = branchName.split('-');
  var jiraNameParts = branchSplits.slice(0, 2);
  var jiraName = jiraNameParts.join('-');
  window.open("https://deepfield.atlassian.net/browse/"+jiraName, "_blank");
})();
