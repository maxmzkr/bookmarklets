javascript:(
  function() {
    function makeRequest(listOfCoupons, currentIndex) {
      if (currentIndex >= listOfCoupons.length) {
        return;
      }
      var c = listOfCoupons[currentIndex];
      if (c["offer"]["hatText"] == "Online Exclusive") {
        makeRequest(listOfCoupons, currentIndex+1);
        return;
      }
      fetch("https://www.meijer.com/bin/meijer/card/clip-unclip?meijerOfferId=" + c.offer.meijerOfferId + "&action=Clip&timestamp=1609165114465", {
        "headers": {
          "accept": "application/json,text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache,no-store, must-revalidate, max-age=-1, private",
          "sec-ch-ua": "\"Google Chrome\";v=\"87\",\" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
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
      }).then(x => x.json().then(y => {
          console.log(y);
          if (y["code"] != 20) {
            makeRequest(listOfCoupons, currentIndex+1);
          }
        })
      );
    }
    fetch("https://www.meijer.com/bin/meijer/offer", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache, no-store, must-revalidate, max-age=-1, private",
        "content-type": "application/json;charset=UTF-8",
        "csrf-token": "undefined",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrer": "https://www.meijer.com/mperks/coupons.html",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"searchCriteria\":\"\",\"sortType\":0,\"clippedFromTS\":null,\"pageSize\":9999,\"currentPage\":1,\"ceilingCount\":0,\"ceilingDuration\":0,\"rewardCouponId\":0,\"categoryId\":\"L5-000076,L5-000015,L5-000024,L5-000013,L5-000068,L5-000011,L5-000054,L5-000002,L5-000064,L5-000019,L5-000059,L5-000016,L5-000065,L5-000001,L5-000017,L5-000056,20201227inad,\",\"offerClass\":1,\"tagId\":\"\",\"getOfferCountPerDepartment\":false,\"upcId\":0,\"showClippedCoupons\":false,\"showOnlySpecialOffers\":false,\"showRedeemedOffers\":false,\"offerIds\":[],\"showBackToAllCoupons\":false,\"type\":1}",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(a => a.json().then(b => makeRequest(b.listOfCoupons, 0)));
  }
)();
