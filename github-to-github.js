javascript:(function() {
  var branchClasses = document.getElementsByClassName("commit-ref");
  var branchClass = branchClasses[branchClasses.length-1];
  var branchName = branchClass.textContent;
  var branchSplits = branchName.split('-');
  var jiraNameParts = branchSplits.slice(0, 2);
  var jiraName = jiraNameParts.join('-');
  window.open("https://github.com/pulls?q=is%3Apr+is%3Aopen+archived%3Afalse+sort%3Aupdated-desc+"+jiraName+"+user%3Adeepfield", "_blank");
})();
