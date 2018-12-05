$(function() {
  $("#submitBtn").on("click", function(event) {
    event.preventDefault();

    // maintenance request object
    const maintRequest = {
      requestType: $("#requestType").val(),
      address: $("#address"),
      description: $("#textarea1").val()
    };

    //Post request for maintenace request
    //
    //////////////////////////////////
    // $.ajax("/tenant/maintenance", {
    //   type: "POST",
    //   data: maintRequest
    // }).then(function() {
    //   console.log("new maintenance request submitted successfully");
    //   location.reload();
    // });

    console.log(maintRequest);
  });
});

// take maintenance requests and place them in cards
