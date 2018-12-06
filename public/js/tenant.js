$(function() {
  // POST Request for Maintenance Request
  $("#submitBtn").on("click", function() {
    // maintenance request object
    const maintRequest = {
      requestType: $("#requestType").val(),
      address: $("#address"),
      description: $("#description").val()
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
    $.ajax(`/tenant/payment/${id}`, {
      type: "PUT",
      data: paymentObj
    }).then(function() {
      console.log("Payment Submitted Successfuly");
      location.reload();
    });

    console.log(paymentObj);
  });

  // GET request to pull in maint requests for this tenant
  // take maintenance requests and place them in cards
});
