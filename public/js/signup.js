$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let firstNameInput = $("input#first-name-input");
  let lastNameInput = $("input#last-name-input");
  let usernameInput = $("input#username-input");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    let userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.firstName || !userData.lastName || !userData.username || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstName, userData.lastName, userData.username, userData.email, userData.password);
    firstNameInput.val("");
    lastNameInput.val("");
    usernameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  signUpUser = (firstName, lastName, username, email, password) => {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  handleLoginErr = err => {
    $("#alert .msg").text("Oops! Something went wrong. Try again!");
    $("#alert").fadeIn(500);
  }
});
