function(){
  async function test() {
    let cartResp = await fetch("https://www.kroger.com/atlas/v1/recommendations/v1/start-my-cart", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "x-kroger-channel": "WEB",
        "x-laf-object": "[{\"fallbackDestination\":\"01800670\",\"createdDate\":1633269198789,\"destination\":{\"address\":{\"postalCode\":\"48170\",\"countryCode\":\"US\"},\"location\":{\"lat\":42.37171173095703,\"lng\":-83.48148345947266}},\"id\":\"55d27c52-6924-4ae9-8dd8-b4d0232c1027\",\"fallbackFulfillment\":\"491DC001\",\"modalityType\":\"SHIP\",\"source\":\"SHIP_AUTOGEN\",\"fulfillment\":[\"491DC001\",\"309DC309\",\"310DC310\",\"DSV00001\",\"MKTPLACE\"],\"isTrustedSource\":false},{\"fallbackFulfillment\":\"01800670\",\"createdDate\":1654444592460,\"destination\":{\"locationId\":\"01800670\"},\"id\":\"733d6300-11fc-44de-a4c5-bc1d088489d1\",\"isCrossBanner\":false,\"modalityType\":\"PICKUP\",\"source\":\"PROFILE\",\"fulfillment\":[\"01800670\",\"540FC010\",\"540DA010\"],\"isTrustedSource\":true},{\"fallbackFulfillment\":\"01800670\",\"createdDate\":1633269204677,\"destination\":{\"locationId\":\"01800670\"},\"id\":\"f96ad13a-c2db-45e7-8797-0192231f920a\",\"isCrossBanner\":false,\"modalityType\":\"IN_STORE\",\"source\":\"PROFILE\",\"fulfillment\":[\"01800670\"],\"isTrustedSource\":true}]"
      },
      "referrer": "https://www.kroger.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    });

    let cartJson = await cartResp.json();

    async function clipUpcs(upcs) {
      let detailsResp = await fetch("https://www.kroger.com/products/api/products/details-basic", {
      "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "x-laf-object": "[{\"fallbackDestination\":\"01800670\",\"createdDate\":1633269198789,\"destination\":{\"address\":{\"postalCode\":\"48170\",\"countryCode\":\"US\"},\"location\":{\"lat\":42.37171173095703,\"lng\":-83.48148345947266}},\"id\":\"55d27c52-6924-4ae9-8dd8-b4d0232c1027\",\"fallbackFulfillment\":\"491DC001\",\"modalityType\":\"SHIP\",\"source\":\"SHIP_AUTOGEN\",\"fulfillment\":[\"491DC001\",\"309DC309\",\"310DC310\",\"DSV00001\",\"MKTPLACE\"],\"isTrustedSource\":false},{\"fallbackFulfillment\":\"01800670\",\"createdDate\":1654444592460,\"destination\":{\"locationId\":\"01800670\"},\"id\":\"733d6300-11fc-44de-a4c5-bc1d088489d1\",\"isCrossBanner\":false,\"modalityType\":\"PICKUP\",\"source\":\"PROFILE\",\"fulfillment\":[\"01800670\",\"540FC010\",\"540DA010\"],\"isTrustedSource\":true},{\"fallbackFulfillment\":\"01800670\",\"createdDate\":1633269204677,\"destination\":{\"locationId\":\"01800670\"},\"id\":\"f96ad13a-c2db-45e7-8797-0192231f920a\",\"isCrossBanner\":false,\"modalityType\":\"IN_STORE\",\"source\":\"PROFILE\",\"fulfillment\":[\"01800670\"],\"isTrustedSource\":true}]"
        },
        "referrer": "https://www.kroger.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify({"upcs": upcs}),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });

      let detailsJson = await detailsResp.json();

      let couponIds = {};

      for (let couponCode in detailsJson.coupons) {
        let couponId = detailsJson.coupons[couponCode].id;
        couponIds[couponId] = true;
      }


      for (let product of detailsJson.products) {
        for (let couponId of product.couponIds) {
          couponIds[couponId] = true;
        }
      }

      for (let couponId in couponIds) {
        let clipResp = await fetch("https://www.kroger.com/atlas/v1/savings-coupons/v1/clip-unclip", {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json"
          },
          "referrer": "https://www.kroger.com/savings/cl/coupons/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "{\"action\":\"CLIP\",\"couponId\":\"" + couponId + "\"}",
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
        });
        console.log(clipResp);
      }
    }

    await clipUpcs(cartJson.data.startMyCart.map(x => x.gtin13));

    let saleResp = await fetch("https://www.kroger.com/atlas/v1/recommendations/v1/my-sale-items", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "x-kroger-channel": "WEB",
        "x-laf-object": "[{\"fallbackDestination\":\"01800670\",\"createdDate\":1633269198789,\"destination\":{\"address\":{\"postalCode\":\"48170\",\"countryCode\":\"US\"},\"location\":{\"lat\":42.37171173095703,\"lng\":-83.48148345947266}},\"id\":\"55d27c52-6924-4ae9-8dd8-b4d0232c1027\",\"fallbackFulfillment\":\"491DC001\",\"modalityType\":\"SHIP\",\"source\":\"SHIP_AUTOGEN\",\"fulfillment\":[\"491DC001\",\"309DC309\",\"310DC310\",\"DSV00001\",\"MKTPLACE\"],\"isTrustedSource\":false},{\"fallbackFulfillment\":\"01800670\",\"createdDate\":1654444592460,\"destination\":{\"locationId\":\"01800670\"},\"id\":\"733d6300-11fc-44de-a4c5-bc1d088489d1\",\"isCrossBanner\":false,\"modalityType\":\"PICKUP\",\"source\":\"PROFILE\",\"fulfillment\":[\"01800670\",\"540FC010\",\"540DA010\"],\"isTrustedSource\":true},{\"fallbackFulfillment\":\"01800670\",\"createdDate\":1633269204677,\"destination\":{\"locationId\":\"01800670\"},\"id\":\"f96ad13a-c2db-45e7-8797-0192231f920a\",\"isCrossBanner\":false,\"modalityType\":\"IN_STORE\",\"source\":\"PROFILE\",\"fulfillment\":[\"01800670\"],\"isTrustedSource\":true}]",
        "x-modality": "{\"type\":\"PICKUP\",\"locationId\":\"01800670\"}"
      },
      "referrer": "https://www.kroger.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    });

    let saleJson = await saleResp.json();

    await clipUpcs(saleJson.data.mySaleItems.map(x => x.gtin13));

    let recentResp = await fetch("https://www.kroger.com/products/api/recent-purchases-compact", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "x-laf-object": "[{\"fallbackDestination\":\"01800670\",\"createdDate\":1633269198789,\"destination\":{\"address\":{\"postalCode\":\"48170\",\"countryCode\":\"US\"},\"location\":{\"lat\":42.37171173095703,\"lng\":-83.48148345947266}},\"id\":\"55d27c52-6924-4ae9-8dd8-b4d0232c1027\",\"fallbackFulfillment\":\"491DC001\",\"modalityType\":\"SHIP\",\"source\":\"SHIP_AUTOGEN\",\"fulfillment\":[\"491DC001\",\"309DC309\",\"310DC310\",\"DSV00001\",\"MKTPLACE\"],\"isTrustedSource\":false},{\"fallbackFulfillment\":\"01800670\",\"createdDate\":1654444592460,\"destination\":{\"locationId\":\"01800670\"},\"id\":\"733d6300-11fc-44de-a4c5-bc1d088489d1\",\"isCrossBanner\":false,\"modalityType\":\"PICKUP\",\"source\":\"PROFILE\",\"fulfillment\":[\"01800670\",\"540FC010\",\"540DA010\"],\"isTrustedSource\":true},{\"fallbackFulfillment\":\"01800670\",\"createdDate\":1633269204677,\"destination\":{\"locationId\":\"01800670\"},\"id\":\"f96ad13a-c2db-45e7-8797-0192231f920a\",\"isCrossBanner\":false,\"modalityType\":\"IN_STORE\",\"source\":\"PROFILE\",\"fulfillment\":[\"01800670\"],\"isTrustedSource\":true}]",
        "x-modality": "{\"modalityTypes\":\"PICKUP,SHIP\",\"locationId\":\"01800670\",\"shipLatLng\":\"42.37171173095703,-83.48148345947266\",\"shipPostalCode\":\"48170\"}"
      },
      "referrer": "https://www.kroger.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    });

    let recentJson = await recentResp.json();

    await clipUpcs(recentJson.products.map(x => x.upc));
   }
  test();
}
