$(function() {
  // Sign-up listener
  $("#sign-up").on("click", function(event) {
    event.preventDefault();
    let registration = {
      userType: $("#register-user-type")
        .val()
        .trim(),
      name:
        $("#first-name")
          .val()
          .trim() +
        " " +
        $("#last-name")
          .val()
          .trim(),
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };
    console.log(registration); // TODO: Clear from linting
    console.log(`Name: ${regName}\nEmail: ${email}\nPassword: ${password}`);
  });

  // Login listener
  $("#login").on("click", () => {
    // Login Object
    let login = {
      userType: $("#login-user-type")
        .val()
        .trim(),
      username: $("#username")
        .val()
        .trim(),
      password: $("#login-password")
        .val()
        .trim()
    };

    // Check user type before sending to appropriate route
    if (login.userType === "Landlord") {
      $.ajax({
        type: "POST",
        url: "/login/landlord",
        data: login,
        dataType: "json",
        success: function() {
          console.log("Sending request to login tenant");
        },
        error: function(data) {
          console.log(JSON.parse(data));
        }
      });
    } else {
      $.ajax({
        type: "POST",
        url: "/login/tenant",
        data: login,
        success: function() {
          console.log("Sending request to login tenant");
        },
        error: function() {
          // Clear login form
          $("#login-user-type").val("Tenant");
          $("#login-password").val("");
          $("#username").val("");
        }
      })
        .done(data => {
          console.log(typeof data);
          console.log(data);
          if (data) {
            window.location.replace(data.route);
          } else {
            console.log("clear the form");
          }
        })
        .catch(() => {
          // console.log("PLEASE HELP");
        });
    }
  });
});
