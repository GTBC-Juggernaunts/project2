$(function() {
  // POST Request for Landlord Properties
  $("#submitPropteryBtn").on("click", function() {
    // maintenance request object
    const newProperty = {
      tenantName: $("#tenant-name").val(),
      address: $("#prop-address"),
      description: $("#prop-description").val(),
      capacity: $("#capacity").val(),
      rent: $("#monthly-rent").val()
    };

    //Post request for maintenace request
    $.ajax("/tenant/maintenance", {
      type: "POST",
      data: newProperty
    }).then(function() {
      console.log("new property added sucessfully");
      location.reload();
    });
    console.log(newProperty);
  });

  // PUT Request for resolving maintenance requests
  $("#resolvedBtn").on("click", function() {
    // maintenance request object
    const maintId = $(this).data("maint-id");

    // PUT request for resolving maintenace request
    $.ajax("/tenant/maintenance", {
      type: "PUT",
      data: maintId
    }).then(function() {
      console.log("new property added sucessfully");
      location.reload();
    });
    console.log(maintId);
  });

  // GET request to pull in maint requests for this tenant
  // take maintenance requests and place them in cards
});
