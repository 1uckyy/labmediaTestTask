//"use strict"
var choices_ids = [];

function delete_choice(choice_id) {
    $('.btn_X_'+choice_id).remove();
    $('.text_selection_'+choice_id).remove();

    choices_ids.splice(choices_ids.findIndex(function(elem){
        return elem == choice_id;
    }),1);
}

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
        $('.controls_inter_modal').append('<button class="btn_modal ok_btn_modal">ОК</button>');
        $('.controls_inter_modal').append('<button class="btn_modal cancel_btn_modal">Отмена</button>');

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
            for(let i=0; i<persons.length; i++) {
                $('.choose_table_modal').append('<tr id=' + i + '><td>' + persons[i].lastname + '</td><td>' + persons[i].middlename + '</td><td>' + persons[i].firstname + '</td><td>' + persons[i].birthday + '</td></tr>');
            }

            //gray bg-clr choosed persons
            for(let i = 0; i<choices_ids.length; i++) {
                $('.choose_table_modal > #' + choices_ids[i]).css('background-color', 'lightgreen');
            }
            
            var prev_id = null;
            var clicked_id = null;
            //choose row
            $('.choose_table_modal > tr').click(function(){
                clicked_id = $(this).attr('id');
                if(!choices_ids.find(function(elem){return elem==clicked_id})) {
                    $('.choose_table_modal > #' + clicked_id).css('background-color', 'gray');

                    if(prev_id != null) {
                        $('.choose_table_modal > #' + prev_id).css('background-color', 'white');
                    }

                    prev_id = clicked_id;
                }
            });

            //ok btn
            $(".ok_btn_modal").click(function(){
                if(clicked_id != null && !choices_ids.find(function(elem){return elem==clicked_id})) {
                    $('.employee_selection_cell').append('<div><div class="text_selection text_selection_'+ clicked_id +'">' + persons[clicked_id].lastname + ' ' + persons[clicked_id].middlename + ' ' + persons[clicked_id].firstname + '</div><button class="btn_X btn_X_'+ clicked_id +'" onclick="delete_choice(' + clicked_id + ')">X</button></div>');
                    choices_ids.push(clicked_id);
                }
                $('.modal').remove();
                $('.gray_screen_modal').remove();
            });
        });

        //close btn
        $(".close_btn_modal").click(function(){
            $('.modal').remove();
            $('.gray_screen_modal').remove();
        });

        //cancel btn
        $(".cancel_btn_modal").click(function(){
            $('.modal').remove();
            $('.gray_screen_modal').remove();
        });
    });
});
