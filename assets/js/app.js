function getPath()
{
    var defaultPath;
    defaultPath= ((window.location.protocol === "https:") ? "https:" : "http:") + "//" + document.location.host;
    return defaultPath;
}
var defaultPath = getPath();

/**
 * pops an event in the browser stack that had been pushed during navigation.
 * @event event stacked browser event
 */
window.onpopstate = function(event) {
    if(event) {
        location.reload(); 
    }
}

function userdetail(){
    $.ajax({
        type: "get",
        url: 'user_detail/',
        success: function (response) {
            if(response.user == "not logged"){
                $("#content").load("templates/page-login.html"); 
            }else{
                $("#content").load("templates/page-list-of-icons.html"); 
            }
        }
    });
}

// login
function loginSubmit(form) {
    //get the form values
    var userid = $('#' + form + '-user_id').val().trim();
    var password = $('#' + form + '-password').val().trim(); 
    
    var Data = {usrnm:userid, pswd: password};
    
    if (userid && password) {
        $.ajax({
            type: "POST",
            data : Data,
            url: 'login/',
            success: function (response) {
                
                $('html, body').animate({scrollTop: 0}, 1000);
                var usergroups = { content: '', url: defaultPath+'/userGroups' };
                history.pushState(usergroups, "Chamaz | App", defaultPath+'/userGroups');
                $('#content').load('templates/page-list-of-icons.html');
                $('.reg').text(response.user_id);
                $('.login').text('Logout');
            }
        });
    }
 
}



function navigation(val){
    //$('.overlay-chart-container').show();
    $('html, body').animate({scrollTop: 0}, 1000);
    if(val == "login"){
        $("#site-content").load("templates/page-login.html");
        var home = { content: '', url: defaultPath+'/' };
        history.pushState(home, "Chamaz | App", defaultPath+'/');
    }
}

