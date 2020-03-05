"use strict"
$(function() {
    $(".choose_employee_btn").click(function(){
        $('body').append('<div class="modal"></div>');
        $('.modal').append('<div class="head_modal">Заголовок</div>');
        $('.head_modal').append('<button class="close_btn_modal">X</button>');
        $('.modal').append('<div class="choose_container_modal"></div>');
        $('.modal').append('<div class="controls_modal"></div>');
        $('.controls_modal').append('<div class="controls_inter_modal"></div>');
        $('.controls_inter_modal').append('<button class="btn_modal">ОК</button>');
        $('.controls_inter_modal').append('<button class="btn_modal">Отмена</button>');

        $('body').append('<div class="gray_screen_modal"></div>');

        $(".close_btn_modal").click(function(){
            $('.modal').remove();
            $('.gray_screen_modal').remove();
        });
    });
});
