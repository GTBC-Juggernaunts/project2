$(function() {
  // POST Request for Maintenance Request
  $("#submitBtn").on("click", function() {
    // Grab property references
    let landlordId = $(this).data("landlordid");
    let tenantId = $(this).data("tenantid");
    let property = $(this).data("propertyid");

    const maintRequest = {
      requesttypeId: $("#requestType").val(),
      description: $("#description")
        .val()
        .trim(),
      landlordId: landlordId,
      tenantId: tenantId,
      propertyId: property
    };

    $.ajax("/tenant/maintenance", {
      type: "POST",
      data: maintRequest
    }).then(function() {
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
      type: "PUT",
      data: paymentObj
    }).then(function() {
      location.reload();
    });
    console.log(paymentObj);
  });
});
