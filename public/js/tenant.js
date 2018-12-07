$(function() {
  // POST Request for Maintenance Request
  $("#submitBtn").on("click", function() {
    // maintenance request object
    const maintRequest = {
      // name: $("#name").val(),
      requestType: $("#requestType").val(),
      // address: $("#address").val(),
      description: $("#description").val(),
      // need landlord id after authenticated

    };

    //Post request for maintenace request
    $.ajax("/tenant/maintenance", {
      type: "POST",
      data: maintRequest
    }).then(function() {
      console.log("new maintenance request submitted successfully");
      location.reload();
    });

    console.log(maintRequest);
  });

  // Post Request for Rent Payment
  $("#submitPaymentBtn").on("click", function() {
    // payment request objec
    const paymentObj = {
      name: $("#paymentName").val(),
      address: $("#paymentAddress").val(),
      cardNumber: $("#cardNumber").val(),
      amount: $("#paymentAmount").val()
    };

    // POST request
    // TODO: need to grab the leaseId from HTML somehow
    $.ajax(`/tenant/payment/2`, {
      type: "PUT"
      // ,
      // data: paymentObj
    }).then(function() {
      console.log("Payment Submitted Successfuly");
      location.reload();
    });

    console.log(paymentObj);
  });

  // GET request to pull in maint requests for this tenant
  // take maintenance requests and place them in cards
});
