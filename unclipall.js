javascript:(
  function() {
    function makeRequest(listOfCoupons, currentIndex) {
      console.log("Index " + currentIndex);
      if (currentIndex >= listOfCoupons.length) {
        console.log("hit end of list");
        return;
      }
      var c = listOfCoupons[currentIndex];
fetch("https://www.meijer.com/bin/meijer/card/clip-unclip?meijerOfferId=" + c.offer.meijerOfferId +"&action=Unclip&timestamp=1609725898431", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache, no-store, must-revalidate, max-age=-1, private",
    "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://www.meijer.com/mperks/coupons.html",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
	   makeRequest(listOfCoupons, currentIndex+1);
    }
    fetch("https://www.meijer.com/bin/meijer/offer", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache, no-store, must-revalidate, max-age=-1, private",
        "content-type": "application/json;charset=UTF-8",
        "csrf-token": "undefined",
        "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrer": "https://www.meijer.com/mperks/coupons.html",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"searchCriteria\":\"\",\"sortType\":0,\"clippedFromTS\":null,\"pageSize\":9999,\"currentPage\":1,\"ceilingCount\":0,\"ceilingDuration\":0,\"rewardCouponId\":0,\"categoryId\":\"\",\"offerClass\":1,\"tagId\":\"\",\"getOfferCountPerDepartment\":false,\"upcId\":0,\"showClippedCoupons\":false,\"showOnlySpecialOffers\":false,\"showRedeemedOffers\":false,\"offerIds\":[],\"type\":2}",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(a => a.json().then(b => makeRequest(b.listOfCoupons, 0)));
  }
)();
