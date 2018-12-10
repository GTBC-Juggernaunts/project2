$(function() {
  // POST Request for Maintenance Request
  $("#submitBtn").on("click", function() {
    // Grab property references
    let landlordId = $(this).data("landlordid");
    let tenantId = $(this).data("tenantid");
    let property = $(this).data("propertyid");

    const maintRequest = {
      requesttypeId: $("#requestType").val(),
      description: $("#description").val(),
      landlordId: landlordId,
      tenantid: tenantId,
      propertyId: property
    };

    //Post request for maintenance request
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
    // payment request object
    const paymentObj = {
      name: $("#paymentName").val(),
      address: $("#paymentAddress").val(),
      cardNumber: $("#cardNumber").val(),
      amount: $("#paymentAmount").val()
    };

    // PUT request
    let leasedId = $(this).data("lease");
    $.ajax({
      url: `/tenant/payment/${leasedId}`,
      type: "PUT"
    }).then(function() {
      console.log("Payment Submitted Successfully");
      location.reload();
    });
    console.log(paymentObj);
  });
});
