"use strict"
$(function() {
    $(".choose_employee_btn").click(function(){
        $('body').append('<div class="modal"></div>');
        $('.modal').append('<div class="title_modal">Заголовок</div>');
        $('.modal').append('<div class="choose_container_modal"></div>');
        $('.modal').append('<button class="close_btn_modal">X</button>');
        $('.modal').append('<button class="ok_btn_modal">ОК</button>');
        $('.modal').append('<button class="cancel_btn_modal">Отмена</button>');

        $('body').append('<div class="gray_screen_modal"></div>');
    });
});
