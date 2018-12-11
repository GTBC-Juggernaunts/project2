$(function() {
  // POST Request for New Landlord Properties
  $("#submitPropteryBtn").on("click", function() {
    event.preventDefault();
    // Grab landlord id from submit btn
    let landlordId = $(this).data("landlordid");

    // maintenance request object
    const newProperty = {
      tenantName: $("#tenant-name").val(),
      address: $("#prop-address").val(),
      description: $("#prop-description").val(),
      capacity: $("#capacity").val(),
      rent: $("#monthly-rent").val(),
      landlordId: landlordId
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

  // DELETE Request for resolving maintenance requests
  $(".resolvedBtn").on("click", function() {
    // maintenance request object
    const maintId = $(this).data("maint-id");
    console.log(maintId);

    $.ajax(`/landlord/maintenance/${maintId}`, {
      type: "DELETE"
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
