$(function() {
  // POST Request for Landlord Properties
  $("#submitPropteryBtn").on("click", function() {
    event.preventDefault();
    // maintenance request object
    const newProperty = {
      tenantName: $("#tenant-name").val(),
      address: $("#prop-address").val(),
      description: $("#prop-description").val(),
      capacity: $("#capacity").val(),
      rent: $("#monthly-rent").val(),
      landlordId: 1
    };
    console.log(newProperty);

    //Post request for maintenace request
    $.ajax("/landlord/properties", {
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
    // TODO: update maint request where maintId =
    // maintenance request object
    const maintId = $(this).data("maint-id");
    console.log(maintId);

    // PUT request for resolving maintenace request
    $.ajax(`/landlord/maintenance/${maintId}`, {
      type: "DELETE"
      // ,
      // data: maintId
    }).then(function() {
      console.log("maintenance request updated");
      location.reload();
    });
    console.log(maintId);
  });

  // POST Request for new tenant
  $("#submitTenantBtn").on("click", function() {
    event.preventDefault();
    // maintenance request object
    const newTenant = {
      name: $("#tenant-name").val(),
      email: $("#tenant-email").val(),
      address: $("#property-address").val(),
      active: $("#tenant-active").val(),
      startDate: $("#lease-start-date").val(),
      endDate: $("#lease-end-date").val(),
      signDate: $("#lease-sign-date").val()
      // TODO: need to send propertyId and landlordId
    };

    // PUT request for resolving maintenace request
    $.ajax("/landlord/tenants", {
      type: "POST",
      data: newTenant
    }).then(function() {
      console.log("new tenant added sucessfully");
      location.reload();
    });
    console.log(newTenant);
  });
});
