"use strict"
$(function() {
    $(".choose_employee_btn").click(function(){
        //modal wnd markup
        $('body').append('<div class="modal"></div>');
        $('.modal').append('<div class="head_modal">Заголовок</div>');
        $('.head_modal').append('<button class="close_btn_modal">X</button>');
        $('.modal').append('<div class="choose_container_modal"></div>');
        $('.choose_container_modal').append('<table class="choose_table_modal"></table>');
        $('.modal').append('<div class="controls_modal"></div>');
        $('.controls_modal').append('<div class="controls_inter_modal"></div>');
        $('.controls_inter_modal').append('<button class="btn_modal">ОК</button>');
        $('.controls_inter_modal').append('<button class="btn_modal">Отмена</button>');

        $('body').append('<div class="gray_screen_modal"></div>');

        //data for modal wnd
        $.getJSON("../data/persons.json", function(persons) {
            //array sort by lastname
            persons.sort(function (a, b) {
                if (a.lastname > b.lastname) {
                    return 1;
                }
                if (a.lastname < b.lastname) {
                    return -1;
                }
                return 0;
            });

            //fill modal
            for(var i=0; i<persons.length; i++) {
                $('.choose_table_modal').append('<tr><td>' + persons[i].lastname + '</td><td>' + persons[i].middlename + '</td><td>' + persons[i].firstname + '</td><td>' + persons[i].birthday + '</td></tr>');
            }
        });

        $(".close_btn_modal").click(function(){
            $('.modal').remove();
            $('.gray_screen_modal').remove();
        });
    });
});
