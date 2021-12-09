
var numOfColls = 0;
var numOfExps = 0;
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
  $("#change-to-signin").click(function(){
    openPopUp("#login-popup")
    closePopUp("#signup-popup")
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
    closePopUp("#exp6_popup");
  })
  $("#burger_result").click(function(){
    openPopUp("#burger_popup");
  })
  $("#burger_close").click(function(){
    closePopUp("#burger_popup")
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

    if (!path) {
            avatar += "default.jpg";
        }
    else {
            path = path.replace(/^.*\\/, "");
            avatar += path;
    }

    let result = setCookie(email, name, surname, username, password, dob, avatar, 30);
    //Check if the user already exists and if so reset the form
    // Else show the user menu get the profile for the user and close the popup
    if (result == ""){
      $("#signup-content")[0].reset();
      setLogged(0, "");
    } else {
      changeToUser(result.split(","));
      setLogged(1, email);
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
      setLogged(1, lemail);
    } else {
      setLogged(0, "");
    }
  })
  $("#log-out").click(function(){
    let r = confirm("Do you really want to log out?")
    if (r == true){
      $("#user_logged").css("display", "none")
      $("#signin_button").css("display", "none")
      setLogged(0, "")
      changePage("index.html")
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
  $("#user_logged").click(function(){
    $("#sidebar_user").animate({width:'toggle'},350);
  })
  $("#sidebar_close").click(function(){
    $("#sidebar_user").animate({width:'toggle'},350);
  })
  $("#my-messages").click(function(){
    changePage("messages.html");
  })
  $("#my-profile").click(function(){
    changePage("my_profile.html");
  })
  $("#search_button").click(function(e){
    e.preventDefault()
    showResults();
  })
  $("#reset_button").click(function(e){
    e.preventDefault()
    resetResults();
  })

  $("#change_profile").click(function(){
    openPopUp("#change_profile_popup");
  })
  $("#change_profile_close").click(function(){
    closePopUp("#change_profile_popup");
  })

  $("#submit_profile_info").click(function(){
    let username = $("#text_username_change").val();
    let avatar = $("#file_avatar_change").val();
    let instagram = $("#instagram_account").val();
    let twitter = $("#twitter_account").val();
    let facebook = $("#facebook_account").val();
    let interests = $("#interests_info").val();
    let email = $("#profile_email").text();
    setCookieExtended(email,username,avatar,instagram,twitter,facebook,interests);
    checkLogged();
  })

  $("#button_collections").click(function(){
    $("#button_coll").css("background-color", "#4C61FF")
    $("#button_coll").css("color", "#FFFFFF")
    $("#button_exp").css("background-color", "#9ce6ff")
    $("#button_exp").css("color", "#000000")
    $("#collections_display").css("display", "flex")
    $("#experiences_display").css("display", "none")
  })
  $("#button_experiences").click(function(){
    $("#button_exp").css("background-color", "#4C61FF")
    $("#button_exp").css("color", "#FFFFFF")
    $("#button_coll").css("background-color", "#9ce6ff")
    $("#button_coll").css("color", "#000000")
    $("#collections_display").css("display", "none")
    $("#experiences_display").css("display", "flex")
  })
  $("#search_button").click(function(e){
    e.preventDefault()
    window.scroll({top: 350, left: 0, behavior: 'smooth'});
    var value = $("#search_text").val().toLowerCase();
    var showingDivs = 0;
    //We filter by the introduced text when the button is clicked
    $("#results_list .result_experience").filter(function(){
      if(value != ""){
        if (document.getElementById("landmarks_checkbox").checked || document.getElementById("food_checkbox").checked || document.getElementById("activities_checkbox").checked){
          $(this).toggle(($(this).text().toLowerCase().indexOf(value) > -1) && ((document.getElementById("landmarks_checkbox").checked && $(this).text().indexOf("#Landmark") > -1) || (document.getElementById("food_checkbox").checked && $(this).text().indexOf("#Food") > -1) || (document.getElementById("activities_checkbox").checked && $(this).text().indexOf("#Activity") > -1)));
        } else {
          $(this).toggle(($(this).text().toLowerCase().indexOf(value) > -1));
        }
        document.getElementById("results_text").innerHTML = 'Showing results for "' + $("#search_text").val() + '"';
      } else {
        $(this).toggle(((document.getElementById("landmarks_checkbox").checked && $(this).text().indexOf("#Landmark") > -1) || (document.getElementById("food_checkbox").checked && $(this).text().indexOf("#Food") > -1) || (document.getElementById("activities_checkbox").checked && $(this).text().indexOf("#Activity") > -1)));
        document.getElementById("results_text").innerHTML = 'Showing results';
      }
      if ($(this).css("display") != "none"){
        showingDivs += 1;
      }
    })

    if (showingDivs == 0){
      document.getElementById("results_text").innerHTML = "No results found..."
    }
  })
  $("#add_new_collection").click(function(){
    openPopUp("#add_collection_popup");
  })
  $("#add_collection_close").click(function(){
    closePopUp("#add_collection_popup")
    $("#coll_img").attr("src", "./images/no-image.png")
  })
  $("#add_coll_form").submit(function(e){
    e.preventDefault();

    let title = document.getElementById("add_coll_text").value;
    let path = document.getElementById("add_coll_img").value;
    let experience = "./images/experiences/";
    path = path.replace(/^.*\\/, "");
    experience += path;

    addCollection(experience, title);
    $("#add_coll_form")[0].reset();
    closePopUp("#add_collection_popup")
    $("#coll_img").attr("src", "./images/no-image.png")
  })
  $("#edit_collection_close").click(function(){
    closePopUp("#edit_collection_popup");
    let title = document.getElementById("edit_coll_text").value;
    let path = document.getElementById("edit_image").src;
    addCollection(path, title);
    $("#edit_coll_form")[0].reset();
    $("#edit_image").attr("src", "./images/no-image.png")
  })
  $("#edit_coll_form").submit(function(e){
    console.log("Enters")
    e.preventDefault();

    let title = document.getElementById("edit_coll_text").value;
    let path = document.getElementById("edit_coll_img").value;
    console.log(path)
    let experience = "./images/experiences/";
    if (!path){
      experience = document.getElementById("edit_image").src;
    } else {
      path = path.replace(/^.*\\/, "");
      experience += path;
    }

    addCollection(experience, title);
    $("#edit_coll_form")[0].reset();
    closePopUp("#edit_collection_popup")
    $("#edit_image").attr("src", "./images/no-image.png")

  })
  $("#add_coll_img").on("change", function(){
    let path = document.getElementById("add_coll_img").value;
    let experience = "./images/experiences/";
    path = path.replace(/^.*\\/, "");
    experience += path;
    $("#coll_img").attr("src", experience)
  })
  $("#edit_coll_img").on("change", function(){
    let path = document.getElementById("edit_coll_img").value;
    let experience = "./images/experiences/";
    path = path.replace(/^.*\\/, "");
    experience += path;
    $("#edit_image").attr("src", experience)
  })
  $("#add_new_experience").click(function(){
    openPopUp("#add_experience_popup");
  })
  $("#add_exp_close").click(function(){
    closePopUp("#add_experience_popup")
  })
  $("#add_exp_form").submit(function(e){
    e.preventDefault()
    let title = document.getElementById("add_exp_where").value;
    let path = document.getElementById("add_exp_img").value;
    let experience = "./images/experiences/";
    path = path.replace(/^.*\\/, "");
    experience += path;
    let collaborators = document.getElementById("add_exp_collab").value;
    collaborators = collaborators.split(" ")
    collaborators = collaborators.join("¿")
    let desc = document.getElementById("add_exp_desc").value
    let cats = ""
    cats += document.getElementById("cat1").checked + "¡";
    cats += document.getElementById("cat2").checked + "¡";
    cats += document.getElementById("cat3").checked;
    let tags = ""
    tags += document.getElementById("feature1").checked + "¡";
    tags += document.getElementById("feature2").checked + "¡";
    tags += document.getElementById("feature3").checked + "¡";
    tags += document.getElementById("feature4").checked + "¡";
    tags += document.getElementById("feature5").checked

    addExperience(experience, title, collaborators, desc, cats, tags);
    $("#add_exp_form")[0].reset();
    closePopUp("#add_experience_popup")
  })

  $("#edit_exp_close").click(function(){
    closePopUp("#edit_experience_popup");
    let title = document.getElementById("edit_exp_where").value;
    let path = document.getElementById("edit_img_exp").src;
    let collab = document.getElementById("edit_exp_collab").value
    collab = collab.split(" ").join("¿")
    let desc = document.getElementById("edit_exp_desc").value
    let cats = ""
    cats += document.getElementById("cat1_edit").checked + "¡";
    cats += document.getElementById("cat2_edit").checked + "¡";
    cats += document.getElementById("cat3_edit").checked;
    let tags = ""
    tags += document.getElementById("feature1_edit").checked + "¡";
    tags += document.getElementById("feature2_edit").checked + "¡";
    tags += document.getElementById("feature3_edit").checked + "¡";
    tags += document.getElementById("feature4_edit").checked + "¡";
    tags += document.getElementById("feature5_edit").checked
    addExperience(path, title, collab, desc, cats, tags);
    $("#edit_exp_form")[0].reset();
    $("#edit_img_exp").attr("src", "./images/no-image.png")
  })

  $("#edit_exp_form").submit(function(e){
    e.preventDefault()
    closePopUp("#edit_experience_popup");
    let title = document.getElementById("edit_exp_where").value;
    let path = document.getElementById("edit_exp_img").value;
    let experience = "./images/experiences/";
    if (!path){
      experience = document.getElementById("edit_img_exp").src;
    } else {
      path = path.replace(/^.*\\/, "");
      experience += path;
    }
    let collab = document.getElementById("edit_exp_collab").value
    collab = collab.split(" ").join("¿")
    let desc = document.getElementById("edit_exp_desc").value
    let cats = ""
    cats += document.getElementById("cat1_edit").checked + "¡";
    cats += document.getElementById("cat2_edit").checked + "¡";
    cats += document.getElementById("cat3_edit").checked;
    let tags = ""
    tags += document.getElementById("feature1_edit").checked + "¡";
    tags += document.getElementById("feature2_edit").checked + "¡";
    tags += document.getElementById("feature3_edit").checked + "¡";
    tags += document.getElementById("feature4_edit").checked + "¡";
    tags += document.getElementById("feature5_edit").checked
    addExperience(experience, title, collab, desc, cats, tags);
    $("#edit_exp_form")[0].reset();
    $("#edit_img_exp").attr("src", "./images/no-image.png")
  })

  $("#add_exp_img").on("change", function(){
    let path = document.getElementById("add_exp_img").value;
    let experience = "./images/experiences/";
    path = path.replace(/^.*\\/, "");
    experience += path;
    $("#exp_img").attr("src", experience)
  })
  $("#edit_exp_img").on("change", function(){
    let path = document.getElementById("edit_exp_img").value;
    let experience = "./images/experiences/";
    path = path.replace(/^.*\\/, "");
    experience += path;
    $("#edit_img_exp").attr("src", experience)
  })

  $("#exp_close").click(function(){
    closePopUp("#exp_popup")
  })

});

function like(not_liked, liked){
  let loggedCookie = getCookie("logged");
  loggedCookie = loggedCookie.split(",");
  let logged = loggedCookie[0];
  if (logged == 1){
    $(not_liked).css("display", "none")
    $(liked).css("display", "flex")
  } else{
    alert("You have to sign in to use this option")
  }
}

function dislike(not_liked, liked){
  $(not_liked).css("display", "flex")
  $(liked).css("display", "none")
}

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
  $("#username_user").html(cookie_val[2]);
  $("#img_user").attr("src", cookie_val[5]);
  $("#user_logged").css("display", "flex");
  $("#my_profile_avatar").attr("src",cookie_val[5]);
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
    $("#username_user").html(result[2]);
    $("#img_user").attr("src", result[5]);
    $("#user_logged").css("display", "flex");
    $("#profile").attr("src",result[5]);
    $("#profile_name").html(result[0] + ' ' + result[1]);
    $("#profile_username").html(result[2]);
    $("#profile_dob").html(result[4]);
    $("#profile_email").html(email);
    $("#instagram_profile").html("Instagram: " + result[6]);
    $("#twitter_profile").html("Twitter: " + result[7]);
    $("#facebook_profile").html("Facebook: " + result[8]);
    $("#interests_profile").html(result[9]);
    $("#my_profile_avatar").attr("src",result[5]);
  }
}

function changePage(new_page){
  location.href = new_page;
}

function showResults(){
  $("#experiences").hide();
  $("#search_results").css("display","flex");
}

function applyFilter(filter){
  $("#results_list .result_experience").filter(function(){
    $(this).toggle($(this).text().indexOf(filter) > -1);
  });
}

function resetResults(){
  $("#search_results").hide();
  $("#results_list .result_experience").show()
  $("#experiences").show();
  $("#search_form")[0].reset();
}

function openOptions(id){
  $(id).css("display", "flex");
}

function closeOptions(id){
  $(id).css("display", "none")
}

function addCollection(image, title){
  let newhtml = "<div class='collection' id='coll" + numOfColls + "'> <img id='image_coll" + numOfColls + "' src='" + image + "' alt='collection'> <h3 id='title_coll" + numOfColls + "'>" + title + "</h3>"
  newhtml += "<div class='like-circle' onclick=openOptions('#coll" + numOfColls + "_opt')>"
  newhtml += "<ion-icon name='ellipsis-vertical-outline'></ion-icon> </div> <div class='options' id='coll" + numOfColls + "_opt'>";
  newhtml += "<button class='close' onclick=closeOptions('#coll" + numOfColls + "_opt')>&times;</button>"
  newhtml += "<p onclick=editCollection('" + numOfColls + "')>Edit collection</p> <p onclick=deleteCollection('" + numOfColls + "')>Delete colletion</p> </div> </div>"

  $("#collections_display").append(newhtml);
  numOfColls += 1;
}

function editCollection(id){
  openPopUp("#edit_collection_popup");
  $("#edit_image").attr("src" , document.getElementById("image_coll" + id).src)
  $("#edit_coll_text").attr("value", document.getElementById("title_coll" + id).innerHTML)
  deleteCollection(id, '1');
}

function deleteCollection(id, flag = '0'){

  if (flag=='1'){
    $("#coll" + id).remove();
    numOfColls -= 1;
  } else {

    let r = confirm("Do you really want to remove the collection?")
    if (r == true){
      $("#coll" + id).remove();
      numOfColls -= 1;
    } else {
      closeOptions("#coll" + id + "_opt");
    }
  }
}

function addExperience(image, title, collab, desc, topics, tags){
  let value = title + "¡" + image + "¡" + collab + "¡" + desc + "¡" + topics + "¡" + tags
  localStorage.setItem("exp" + numOfExps, value)
  let newhtml = '<div class="experience" id="exp' + numOfExps + '"> <img id="image_exp' + numOfExps + '" src="' + image + '" alt="experience"> <h4 id="title_exp' + numOfExps + '" onclick=openExperience("exp' + numOfExps + '")>' + title + '</h4>'
  newhtml += "<div class='like-circle' onclick=openOptions('#exp" + numOfExps + "_opt')> <ion-icon name='ellipsis-vertical-outline'></ion-icon> </div>"
  newhtml += "<div class='options_exp' id='exp" + numOfExps + "_opt'> <button class='close' onclick=closeOptions('#exp" + numOfExps + "_opt')>&times;</button>"
  newhtml += "<p onclick=editExperience('" + numOfExps + "')>Edit experience</p> <p onclick=deleteExperience('" + numOfExps + "')>Delete experience</p>"
  newhtml += "<p onclick=addToCollection('" + numOfExps + "')>Add to collection</p> </div> </div>"

  $("#experiences_display").append(newhtml);
  numOfExps += 1;
}

function editExperience(id){
  let experience = localStorage.getItem("exp" + id)
  experience = experience.split("¡");
  openPopUp("#edit_experience_popup");
  $("#edit_img_exp").attr("src" , experience[1])
  $("#edit_exp_where").attr("value", experience[0])
  $("#edit_exp_collab").attr("value", experience[2].split("¿").join(" "))
  $("#edit_exp_desc").val(experience[3])
  if (experience[4] == "true"){
    $("#cat1_edit").attr("checked", "checked")
  }
  if (experience[5] == "true"){
    $("#cat2_edit").attr("checked", "checked")
  }
  if (experience[6] == "true"){
    $("#cat3_edit").attr("checked", "checked")
  }
  if (experience[7] == "true"){
    $("#feature1_edit").attr("checked", "checked")
  }
  if (experience[8] == "true"){
    $("#feature2_edit").attr("checked", "checked")
  }
  if (experience[9] == "true"){
    $("#feature3_edit").attr("checked", "checked")
  }
  if (experience[10] == "true"){
    $("#feature4_edit").attr("checked", "checked")
  }
  if (experience[11] == "true"){
    $("#feature5_edit").attr("checked", "checked")
  }
  deleteExperience(id, '1');
}

function deleteExperience(id, flag = '0'){
  if (flag=='1'){
    $("#exp" + id).remove();
    localStorage.removeItem("exp" + id)
    numOfExps -= 1;
  } else {
    let r = confirm("Do you really want to remove the experience?")
    if (r == true){
      $("#exp" + id).remove();
      localStorage.removeItem("exp" + id)
      numOfExps -= 1;
    } else {
      closeOptions("#exp" + id + "_opt");
    }
  }
}

function openExperience(id){
  let experience = localStorage.getItem(id)
  experience = experience.split("¡");
  openPopUp("#exp_popup");
  console.log(experience[1]);
  $("#generic_img").attr("src" , experience[1])
  $("#generic_title").text(experience[0])
  $("#generic_collaborators").text(experience[2].split("¿").join(" "))
  $("#generic_desc").text(experience[3])
  $("#generic_author").text(document.getElementById("profile_name").innerHTML)
  if (experience[4] == "false"){
    $("#generic_land").css("display", "none");
  }
  if (experience[5] == "false"){
    $("#generic_food").css("display", "none");
  }
  if (experience[6] == "false"){
    $("#generic_act").css("display", "none");
  }
  if (experience[7] == "false"){
    $("#generic_ff").css("display", "none");
  }
  if (experience[8] == "false"){
    $("#generic_gr").css("display", "none");
  }
  if (experience[9] == "false"){
    $("#generic_bk").css("display", "none");
  }
  if (experience[10] == "false"){
    $("#generic_ur").css("display", "none");
  }
  if (experience[11] == "false"){
    $("#generic_in").css("display", "none");
  }
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
    dob + "," + avatar + ",,,," ;
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

function setCookieExtended(email,username,avatar,instagram,twitter,facebook,interests){
  const d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000));
  let expires = "expires=" + d.toGMTString();
  let cookie = getCookie(email);
  let split_cookie = cookie.split(",");
  if (username != ""){
    split_cookie[2]= username;
  }
  if (avatar != ""){
    split_cookie[5]= avatar;
  }
  if (instagram != ""){
    split_cookie[6]= instagram;
  }
  if (twitter != ""){
    split_cookie[7]= twitter;
  }
  if (facebook != ""){
    split_cookie[8]= facebook;
  }
  if (interests != ""){
    split_cookie[9]= interests;
  }
  let new_cookie = split_cookie.join();

  document.cookie = email + "=" + new_cookie + ";" + expires + ";path=/";
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
