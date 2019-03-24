(function(){
    document.addEventListener('DOMContentLoaded', function() {
        menu();
        topSlider('.top-slider');
        topSlider('.product_slider');
        map();
        valid();
        nemuScroll();
       

        var skillsDiv = $('#skill');

        $(window).on('scroll', function(){
            var winT = $(window).scrollTop(),
              winH = $(window).height(),
              skillsT = skillsDiv.offset().top;
          if(winT + winH  > skillsT){
              $(".skills").each(function(){
              $(this).find('.skill-bar').animate({
                width:$(this).attr('data-percent')
              },6000);
            });
          }
        });
        
		
        })
}());


function menu(){
    var button = document.querySelector(".burger_menu");
    var menu = document.querySelector(".small_menu nav")
    button.addEventListener('click', function(){
        button.classList.toggle("change");
        if(button.className=="change"){
            menu.parentElement.style.width = "30px";
            this.style.width="20px";
        }else{
                menu.parentElement.style.width = "auto";
            }
        
        menu.classList.toggle("close");
    })
    
}
function topSlider(name){
    $(name).slick({
        dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  cssEase: 'linear'
    });
		
}
function map(){
	var mapProp= {
  center:new google.maps.LatLng(49.8272808,24.0191034),
  zoom:15,
	disableDefaultUI: true,
	scrollwheel: true,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
function valid(){
   
        $(".send").click(function (){	  
  
  var name = $(".full_name").val().trim();
  var email = $(".email_input").val().trim();
  var massege = $(".massege").val().trim();
  var checkbox = $("#checkbox-input-1").prop('checked');
  
 
  var error_arr = [];
  if(name.length == 0) error_arr.push('name');
  if(email.length == 0) error_arr.push('email');
  if(massege.length == 0) error_arr.push('massege');	  
  
  
  if(error_arr.length > 0 || checkbox==true){
	alert("Ви не заповнили всі поля поля\n");
	
	return false;
  }else{
    
	console.log("Помилок немає");
  }  	  
});
    
}
function nemuScroll(){
    $(".global_menu a, .logo_link").click(function(){
        var element = $(this).attr("href");
        var dist = $(element).offset().top-90;

        $("html,body").animate({"scrollTop":dist},1000);

        return false;
    });




    $(window).scroll(function(){
        $("section[id]").each(function(){
            var id = $(this).attr("id");
            if ($(this).offset().top-100<$(window).scrollTop()){
                $('.global_menu a[href="#'+id+'"]').addClass("active").parent().siblings().children().removeClass("active");
            }
            if($(window).scrollTop()<10){
                $(".global_menu a").removeClass("active");
            }
        })
    })
}

