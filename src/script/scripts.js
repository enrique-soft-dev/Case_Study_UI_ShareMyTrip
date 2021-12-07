
// General ready function that contains all the functions
$(document).ready(function(){
  //Sign in open and close buttons
  checkLogged()
  $("#signin_button").click(function(){
    openPopUp("#login-popup")
  })
  $("#login-close").click(function(){
    closePopUp("#login-popup")
  })
  //Change to signup popup from log in
  $("#change-to-signup").click(function(){
    closePopUp("#login-popup")
    openPopUp("#signup-popup")
  })
  $("#signup-close").click(function(){
    closePopUp("#signup-popup")
  })
  $("#exp1").click(function(){
    openPopUp("#exp1_popup");
  })
  $("#exp1_close").click(function(){
    closePopUp("#exp1_popup")
  })
  $("#exp2").click(function(){
    openPopUp("#exp2_popup");
  })
  $("#exp2_close").click(function(){
    closePopUp("#exp2_popup")
  })
  $("#exp3").click(function(){
    openPopUp("#exp3_popup");
  })
  $("#exp3_close").click(function(){
    closePopUp("#exp3_popup")
  })
  $("#exp4").click(function(){
    openPopUp("#exp4_popup");
  })
  $("#exp4_close").click(function(){
    closePopUp("#exp4_popup")
  })
  $("#exp5").click(function(){
    openPopUp("#exp5_popup");
  })
  $("#exp5_close").click(function(){
    closePopUp("#exp5_popup")
  })
  $("#exp6").click(function(){
    openPopUp("#exp6_popup");
  })
  $("#exp6_close").click(function(){
    closePopUp("#exp6_popup")
  })
  //Sign up form
  $("#signup-content").submit(function(e){
    e.preventDefault();
    //Get all the attributes from the form
    let email = document.getElementById("semail").value;
    let name = document.getElementById("sname").value;
    let surname = document.getElementById("ssurname").value;
    let username = document.getElementById("susername").value;
    let password = document.getElementById("spassword").value;
    let dob = document.getElementById("dob").value;
    let path = $("#profile-img").val();
    let avatar = "images/avatars/";
    console.log(avatar)
    if (!path) {
            avatar += "default.jpg";
        }
    else {
            path = path.replace(/^.*\\/, "");
            avatar += path;
    }
    console.log(avatar)
    let result = setCookie(email, name, surname, username, password, dob, avatar, 30);
    //Check if the user already exists and if so reset the form
    // Else show the user menu get the profile for the user and close the popup
    if (result == ""){
      $("#signup-content")[0].reset();
      setLogged(0, "");
    } else {
      changeToUser(result.split(","));
      setLogged(1, email);
      getProfile(result.split(","), email);
      closePopUp("#signup-popup");
      $("#signup-content")[0].reset();
    }
  })
  //Login form
  $("#login-content").submit(function(e){
    e.preventDefault()
    let lemail = document.getElementById("lemail").value;
    let lpassword = document.getElementById("lpassword").value;
    //Check if cookie exists and if so close popup and show menu else do nothing
    let checked = checkCookie(lemail, lpassword);
    if (checked != "") {
      changeToUser(checked);
      console.log("Logged");
      setLogged(1, lemail);
      getProfile(checked, lemail);
    } else {
      setLogged(0, "");
    }
  })
  $("#add_plan").click(function(){
    changePage("add_plan.html");
  })
  $("#home").click(function(){
    changePage("index.html");
  })
  $("#ranking").click(function(){
    changePage("ranking.html");
  })
  $("#messages_icon").click(function(){
    changePage("messages.html");
  })
  $("#user_img").click(function(){
    changePage("my_profile.html");
  })
});

//Generic function to open popups
function openPopUp(id) {
  $(id).fadeIn("slow");
  $(id).css("display", "flex");
  $("body").css("overflow", "hidden");
}

//Generic function to close popups
function closePopUp(id){
  $(id).fadeOut("slow");
  $(id).css("display", "none");
  $("body").css("overflow", "auto");
}

//Function to change navbar to show user logged
function changeToUser(cookie_val){
  $("#signin_button").hide();
  $("#user_username").html(cookie_val[2]);
  $("#user_img").attr("src", cookie_val[5]);
  $("#user_logged").css("display", "flex");
}

function checkLogged(){
  let loggedCookie = getCookie("logged");
  loggedCookie = loggedCookie.split(",");
  let logged = loggedCookie[0];
  if (logged == 1){
    let email = loggedCookie[1];
    let result = getCookie(email);
    result = result.split(",");
    $("#signin_button").hide();
    $("#user_username").html(result[2]);
    $("#user_img").attr("src", result[5]);
    $("#user_logged").css("display", "flex");
  }
}

function changePage(new_page){
  location.href = new_page;
}

//Function to create a new cookie if it does not exists already
function setCookie(email, name, surname, username, password, dob, avatar, exdays){
  let exists = getCookie(email);
  if (exists == ""){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    let cname = name + "," + surname +
    "," + username + "," + password + "," +
    dob + "," + avatar;
    document.cookie = email + "=" + cname +
    ";" + expires + ";path=/";
    return cname;
  } else {
    alert("This email already has an account");
    return "";
  }
}

function setLogged(logged, email){
  const d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000));
  let expires = "expires=" + d.toGMTString();
  console.log("Enters");
  document.cookie = "logged=" + logged + "," + email + ";" + expires + ";path=/";
}

//Function to get a cookie from the list of cookies
function getCookie(email){
  let name = email + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++){
    let c = ca[i];
    while (c.charAt(0) == ' '){
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0){
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Function to check if a cookie exists when logging in and check if password is the correct one
function checkCookie(email, password){
  let user = getCookie(email);
  if (user == ""){
    alert("There is no account for that user");
    $("#login-content")[0].reset()
    return "";
  } else {
    let passincookie = user.split(",");
    for(let i = 0; i < passincookie.length; i++){
      let s = passincookie[i];
      if (s == password){
        closePopUp("#login-popup");
        $("#login-content")[0].reset()
        return passincookie;
      }
    }
    alert("Incorrect password");
    return "";
  }
}
