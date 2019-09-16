$(document).ready(function() {



    //**********functions declaration**********

    //name input field validation
    function name_input_validation(name) {

        //function returns false if the length are shorter than 2 or field are completely empty
        return (name.val().length >= 2 && name.val() != '') ? true : false;
    }

    //phone input field validation
    function phone_input_validation(phone) {

        //function returns false if the field are completely empty
        return (phone.val() != '') ? true : false;
    }

    //**********the end of the functions declaration**********



    //set the phone number input mask	
    $("#phone").mask('+7 (999) 999-99-99');

    //show feedback form modal window
    $("#feedback_button").on('click', function() {
        $("#feedback_modal_window").modal('show');
    });

    //close success message modal window and return it's default value
    $("#close_window").on('click', function() {
        $("#success_modal_window").modal('hide');
        $("#success_modal_window .success-message").html('Данные успешно отправлены');
    });

    //clear feedback form input fields
    $("#clear_button").on('click', function() {
        $("#feedback_modal_window input").val('');
        $("#name, #phone").css('border-color', '#FF0000'); //highlighting by red
    });

    //only Cyrillic symbols input
    $("#name, #comment").keypress(function(key) {

        //input validation
        if (!name_input_validation($(this))) {
            $(this).css('border-color', '#FF0000'); //highlighting by red if validation fails
        } else if (name_input_validation($(this))) {
            $(this).css('border-color', '#00FF00'); //highlighting by green if validation pass
        }

        //making possible typing only Cyrillic symbols
        if (key.charCode != 1025 && (key.charCode < 1040 || key.charCode > 1105) && key.charCode != 32) return false;

    });

    //checking the name field on blur
    $("#name").blur(function() {

        //input validation
        if (!name_input_validation($(this))) {
            $(this).css('border-color', '#FF0000'); //highlighting by red if validation fails
        } else if (name_input_validation($(this))) {
            $(this).css('border-color', '#00FF00'); //highlighting by green if validation pass
        }
    });

    //checking the phone number on blur
    $("#phone").blur(function() {

        //input validation
        if (!phone_input_validation($(this))) {
            $(this).css('border-color', '#FF0000'); //highlighting by red if validation fails
        } else if (phone_input_validation($(this))) {
            $(this).css('border-color', '#00FF00'); //highlighting by green if validation pass
        }
    });

    //send feedback to the mySQL database
    $("#send_button").on('click', function(event) {

        event.preventDefault();

        //collect feedback form data
        let form_data = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            comment: $("#comment").val()
        };

        //checking required feedback form inputs by declaraded functions conditions
        if (!name_input_validation($("#name")) || !phone_input_validation($("#phone"))) {

            //input validation
            if (!name_input_validation($("#name"))) {
                $("#name").css('border-color', '#FF0000'); //highlighting by red if validation fails
            } else if (name_input_validation($("#name"))) {
                $("#name").css('border-color', '#00FF00'); //highlighting by green if validation pass
            }

            //input validation
            if (!phone_input_validation($("#phone"))) {
                $("#phone").css('border-color', '#FF0000'); //highlighting by red if validation fails
            } else if (phone_input_validation($("#phone"))) {
                $("#phone").css('border-color', '#00FF00'); //highlighting by green if validation pass
            }

        }

        //if all the inputs are valid then send the data to the server
        if (name_input_validation($("#name")) && phone_input_validation($("#phone"))) {
            $.ajax({
                url: "php/feedback.php",
                type: "POST",
                data: form_data,
            })
            //if data was successfully added to the database
            .done(function(data) {

                //close feedback form modal window
                $("#feedback_modal_window").modal('hide');

                //return black color to input's borders
                $("#name").css('border-color', '#000000');
                $("#phone").css('border-color', '#000000');

                //clear feedback input fields
                $("#feedback_modal_window input").val('');                
                $("#success_modal_window").modal('show');
            })
            //if something goes wrong
            .fail(function(data) {

                //close feedback form modal window
                $("#feedback_modal_window").modal('hide');

                //show error message
                $("#success_modal_window .success-message").html('Ошибка записи данных!');
                $("#success_modal_window").modal('show');
                
            })
        }
    })
});