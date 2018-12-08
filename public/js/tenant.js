$(function() {
  // POST Request for Maintenance Request
  $("#submitBtn").on("click", function() {
    const maintRequest = {
      // name: $("#name").val(),
      requesttypeId: $("#requestType").val(),
      // address: $("#address").val(),
      description: $("#description").val(),
      // TODO: need after authentication:
      landlordId: 1, // maintenancerequest.landlordId,
      tenantid: 1, // maintenancerequest.tenantId,
      propertyId: 1 // maintenancerequest.propertyId
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
    // TODO: need to grab the leaseId from HTML via data-attribute
    $.ajax(`/tenant/payment/${id}`, {
      type: "PUT"
      // ,
      // data: paymentObj
    }).then(function() {
      console.log("Payment Submitted Successfuly");
      location.reload();
    });
    console.log(paymentObj);
  });
});
