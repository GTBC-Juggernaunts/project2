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
        success: function() {
          console.log("Thanks for logging in Landlord");
        }
      });
    } else {
      $.ajax({
        type: "POST",
        url: "/login/tenant",
        data: login,
        success: function() {
          console.log("Thanks for logging in Tenant");
        }
      });
    }
  });
});
