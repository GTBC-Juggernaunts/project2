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

  // POST Request for new tenant
  $("#submitTenantBtn").on("click", function() {
    // maintenance request object
    const newTenant = {
      name: $("#tenant-name").val(),
      email: $("#tenant-email").val(),
      address: $("#property-address").val(),
      active: $("#tenant-active").val(),
      startDate: $("#lease-start-date").val(),
      endDate: $("#lease-end-date").val(),
      signDate: $("#lease-sign-date").val()
    };

    // PUT request for resolving maintenace request
    $.ajax("/tenant/maintenance", {
      type: "PUT",
      data: newTenant
    }).then(function() {
      console.log("new tenant added sucessfully");
      location.reload();
    });
    console.log(newTenant);
  });

  // GET request to pull in maint requests for this tenant
  // take maintenance requests and place them in cards
});
