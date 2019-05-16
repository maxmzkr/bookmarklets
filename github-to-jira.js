javascript:(function() {
  var branchClasses = document.getElementsByClassName("commit-ref");
  var branchClass = branchClasses[branchClasses.length-1];
  var branchName = branchClass.textContent;
  window.open("https://deepfield.atlassian.net/browse/"+branchName, "_target");
})();
