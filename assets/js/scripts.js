jQuery(document).ready(function($) {


	// MOBILE MENU
	$("#menu-toggler").click(function(e) {
		e.preventDefault();
		$("#mobile-menu").slideToggle(300);
	});


	// HERO SLIDER
	// Initiate slider
	var swiper = new Swiper('.hero-slider', {
		slidesPerView: 1.3,
	  	spaceBetween: 24,
	  	freeMode: true,
	  	watchSlidesVisibility: true,
	  	navigation: {
	    	nextEl: '.swiper-button-next',
	    	prevEl: '.swiper-button-prev'
	  	},
	  	breakpoints: {
		  	430:{
			  	slidesPerView: 1.5,
			  	spaceBetween: 24,
		  	},
		  	640: {
			  	slidesPerView: 2,
			  	spaceBetween: 24,
		  	},
		  	768: {
			  	slidesPerView: 2,
			  	spaceBetween: 32,
		  	},
		  	1024: {
			  	slidesPerView: 2.3,
			  	spaceBetween: 40,
		  	},
		  	1200: {
			  	slidesPerView: 2.3,
			  	spaceBetween: 72,
		  	},
	  	}
	});


	// TABLE
	// Table dropdown button
	var dropdownButton = $(".dropdown-button");
	var dropdownMenu = $(".dropdown-menu");

	dropdownButton.click(function(e) {
		e.preventDefault();
		if($(this).hasClass("open")) {
			$(this).siblings(dropdownMenu).slideUp(300);
			$(this).removeClass("open");
		} else {
			$(this).addClass("open");
			$(this).siblings(dropdownMenu).slideDown(300);
			$(this).parent().siblings().find(dropdownButton).removeClass("open");
			$(this).parent().siblings().find(dropdownMenu).slideUp(300);
		}
	})
	// Table filtration
	var dropdownMenuLink = $(".dropdown-menu__link");
	var filters = [];

	dropdownMenuLink.click(function(e) {
		e.preventDefault();
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			var attr = $(this).attr("filter-attr");
			var index = filters.indexOf(attr);
			if (index > -1) {
			  	filters.splice(index, 1);
			}
		} else {
			$(this).addClass("active");
			var attr = $(this).attr("filter-attr");
			filters.push(attr);
			var siblingattr = $(this).siblings(".active").attr("filter-attr");
			var index = filters.indexOf(siblingattr);
			if (index > -1) {
			  	filters.splice(index, 1);
			}
			$(this).siblings(".active").removeClass("active");
		}
		$("#offers-table tbody tr").each(function() {
		    var elementClasses = $(this)[0].className.split(/\s+/);
		    if(filters.every(function(val) { return elementClasses.indexOf(val) > -1; })) {
		    	$(this).show();
		    } else {
		    	$(this).hide();
		    }
		});
	});


	// UNSPLASH API
	$.getJSON("https://api.unsplash.com/search/photos?query=alps&client_id=6nwI-8958oTATT93f7GMiGdYQrX-4j_hxsHjDmKiHjA", function(data){
	    var imageList = data.results;
	    var countImg = 0; 
	    $(".news article").each(function(){
	    	$(this).prepend('<a href="' + imageList[countImg].urls.full + '" class="news-gallery-img" data-fancybox="news-gallery"><img width="380" height="380" src="' + imageList[countImg].urls.small + '" alt="' + imageList[countImg].alt_description + '" title="Article picture" class="article__image"></a>');
	    	countImg++;
	    })
	});


	// CONTACT FORM

	// Variables
	var emailValidRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

	// Form input fields
	var inputField = $("#contact-form input:not(#form-submit-button):not(#sender-email)");
	var senderName = $("#sender-name");
	var senderEmail = $("#sender-email");
	var senderPhone = $("#sender-phone");
	var senderMessage = $("#sender-message");
	var formCheckbox = $("#form-checkbox");

	// Enable input fields once the document is ready
	$("#contact-form input:not(#form-submit-button)").removeAttr("disabled");

	// Phone number field accepts only numbers, +, 1 space character in a row, and doesn't allow the first character to be a space
	senderPhone.on("input", function(e) {
        $(this).val($(this).val().replace(/[^0-9+ ]/g, "").replace(/  +/g," ").replace(/^ /g,""));
    });

	// Validate input fields
	inputField.focusout(function() {
		if(!$(this).val() && !$(this).hasClass("error")) {
			$(this).addClass("error");
			$(this).after("<p class='error-message'>Privalomas laukas</p>");
		} else if ($(this).val() && $(this).hasClass("error")) {
			$(this).removeClass("error");
			$(this).next(".error-message").remove();
		}
	});

	// Validate email field
	senderEmail.focusout(function() {
		if(!$(this).val()) {
			$(this).addClass("error");
			$(this).next(".error-message").remove();
			$(this).after("<p class='error-message'>Privalomas laukas</p>");
		} else if ($(this).val() && !$(this).val().match(emailValidRegEx)) {
			$(this).addClass("error");
			$(this).next(".error-message").remove();
			$(this).after("<p class='error-message'>Įvestas neteisingas el. paštas</p>");
		} else if ($(this).val() && $(this).val().match(emailValidRegEx)) {
			$(this).removeClass("error");
			$(this).next(".error-message").remove();
		}
	});

	// Validate checkbox
	formCheckbox.focusout(function() {
		if(!$(this).is(":checked")) {
			$(this).addClass("error");
			$(this).after("<p class='error-message'>Privalomas laukas</p>");
		} else if ($(this).is(":checked")) {
			$(this).removeClass("error");
			$(this).next(".error-message").remove();
		}
	});

	// Enable submit button once all fields are properly filled
    $("#contact-form input").on("keyup change",function(){
    	if(senderName.val() && senderPhone.val() && senderMessage.val() && formCheckbox.is(":checked") && senderEmail.val() && senderEmail.val().match(emailValidRegEx)){
	    	$("#form-submit-button").removeAttr("disabled");
	    } else {
	    	$("#form-submit-button").attr("disabled", "disabled");
	    }
    })

    // Submit form with AJAX
    $("#contact-form").submit(function (e) {
    	e.preventDefault();
	    $.ajax({
		    type: "POST",
		    url: "mail.php",
		    data: 'senderName='+senderName.val()+'&senderEmail='+senderEmail.val()+'&senderPhone='+senderPhone.val()+'&senderMessage='+senderMessage.val()+'&formCheckbox='+formCheckbox.val(),
		    success: function(data) {
				$("#form-message").html(data);
			}
	    })
	});
}); 