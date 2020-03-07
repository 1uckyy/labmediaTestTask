"use strict"
var employee_prev_id = null;
var employee_age = null;
var position_prev_id = null;
var position_min_age = null;
var position_max_age = null;
var organization_prev_id = null;
var subdivision_prev_id = null;
var clicked_id = null;
var helper_id = null;

$(function() {
    /**
     * Modal wnd markup.
    */
    function general_modal(text_head) {
        $('body').append('<div class="modal"></div>');
        $('.modal').append('<div class="head_modal">' + text_head + '</div>');
        $('.head_modal').append('<button class="close_btn_modal">X</button>');
        $('.modal').append('<div class="choose_container_modal"></div>');
        $('.choose_container_modal').append('<table class="choose_table_modal"></table>');
        $('.modal').append('<div class="controls_modal"></div>');
        $('.controls_modal').append('<div class="controls_inter_modal"></div>');
        $('.controls_inter_modal').append('<button class="btn_modal ok_btn_modal">ОК</button>');
        $('.controls_inter_modal').append('<button class="btn_modal cancel_btn_modal">Отмена</button>');

        $('body').append('<div class="gray_screen_modal"></div>');
    }

    /**
     * Close and cancel buttons.
    */
    function cancel_btns() {
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
    }

    /**
     * Sorting an array by desired field.
     * @param {Array} array array for sort
     * @param {String} sort_by value which array is sorted
     */
    function arr_sort(array, sort_by) {
        array.sort(function (a, b) {
            if (a[sort_by] > b[sort_by]) {
                return 1;
            }
            if (a[sort_by] < b[sort_by]) {
                return -1;
            }
            return 0;
        });
    }

    /**
     * Fill modal window.
     * @param {Array} arr array with data
     */
    function fill_modal(arr) {
        for(let i=0; i<arr.length; i++) {
            let info;
            for(let j=1; j<arguments.length; j++)
                info += '<td>' + arr[i][arguments[j]] + '</td>'
            $('.choose_table_modal').append('<tr id=' + i + '>' + info + '</tr>');
        }
    }

    /**
     * Choose row
     */
    function choose_row(prev_id) {
        $('.choose_table_modal > #' + prev_id).css('background-color', 'lightgreen');

        $('.choose_table_modal > tr').click(function(){
            clicked_id = $(this).attr('id');
            if(clicked_id != prev_id)
                $('.choose_table_modal > #' + clicked_id).css('background-color', 'gray');

            if(helper_id != null && prev_id != clicked_id)
                $('.choose_table_modal > #' + helper_id).css('background-color', 'white');
            
            if(prev_id != clicked_id)
                helper_id = clicked_id;
        });
    }

    /**
     * Calculating age.
     * @param {String} value 
     */
    function calc_age(value) {
        var arr_date = value.split('.');
        var person_mounth = parseInt(arr_date[1], 10);
        var now_mounth = new Date().getMonth()+1;
        var age = new Date().getFullYear() - parseInt(arr_date[2], 10);
        if(now_mounth < person_mounth)
            age -= 1;
        else if(now_mounth == person_mounth) {
            if(new Date().getDate() < parseInt(arr_date[0],10))
                age -= 1;
        }

        return age;
    }

    //employee
    $(".choose_employee_btn").click(function(){
        general_modal('Выбор сотрудника');

        //data for modal wnd
        $.getJSON("../data/persons.json", function(persons) {
            arr_sort(persons, 'lastname');

            fill_modal(persons, 'lastname', 'middlename', 'firstname', 'birthday');

            clicked_id = null;
            helper_id = null;
            choose_row(employee_prev_id);

            //ok btn
            $(".ok_btn_modal").click(function(){
                if(clicked_id != null) {

                    //check age
                    if(position_min_age) {
                        let emp_age = calc_age(persons[clicked_id].birthday);
                        if(emp_age<position_min_age || emp_age>position_max_age)
                            console.log('bad age');
                    }

                    
                    $('.employee_selection_cell').empty();
                    $('.employee_selection_cell').append('<div><div class="text_selection">' + persons[clicked_id].lastname + ' ' + persons[clicked_id].middlename + ' ' + persons[clicked_id].firstname + '</div><button class="btn_X btn_X_employee">X</button></div>');
                    employee_prev_id = clicked_id;
                    employee_age = calc_age(persons[clicked_id].birthday);
                    $(".btn_X_employee").click(function(){
                        $('.employee_selection_cell').empty();
                        employee_prev_id = null;
                        employee_age = null;
                    });
                }
                $('.modal').remove();
                $('.gray_screen_modal').remove();
            });
        });

        cancel_btns();
    });

    //position
    $(".choose_position_btn").click(function() {
        general_modal('Выбор должности');

        //data for modal wnd
        $.getJSON("../data/positions.json", function(positions) {
            arr_sort(positions, 'name');

            fill_modal(positions, 'name', 'min_age', 'max_age');

            clicked_id = null;
            helper_id = null;
            choose_row(position_prev_id);

            //ok btn
            $(".ok_btn_modal").click(function(){

                //check age
                if(employee_prev_id) {
                    if(positions[clicked_id].min_age > employee_age || positions[clicked_id].max_age < employee_age)
                        console.log("bad position");
                }

                if(clicked_id != null) {
                    $('.position_selection_cell').empty();
                    $('.position_selection_cell').append('<div><div class="text_selection">' + positions[clicked_id].name + '</div><button class="btn_X btn_X_position">X</button></div>');
                    position_prev_id = clicked_id;
                    position_min_age = positions[clicked_id].min_age;
                    position_max_age = positions[clicked_id].max_age;
                    $(".btn_X_position").click(function(){
                        $('.position_selection_cell').empty();
                        position_prev_id = null;
                        position_min_age = null;
                        position_max_age = null;
                    });
                }
                $('.modal').remove();
                $('.gray_screen_modal').remove();
            });
        });

        cancel_btns();
    });

    //organization
    $(".choose_organization_btn").click(function() {
        general_modal('Выбор организации');

        //data for modal wnd
        $.getJSON("../data/orgs.json", function(organizations) {
            arr_sort(organizations, 'name');

            fill_modal(organizations, 'name', 'country');

            clicked_id = null;
            helper_id = null;
            choose_row(organization_prev_id);

            //ok btn
            $(".ok_btn_modal").click(function(){
                if(clicked_id != null) {
                    $('.organization_selection_cell').empty();
                    $('.organization_selection_cell').append('<div><div class="text_selection">' + organizations[clicked_id].name + '</div><button class="btn_X btn_X_organization">X</button></div>');
                    organization_prev_id = clicked_id;
                    $(".btn_X_organization").click(function(){
                        $('.organization_selection_cell').empty();
                        organization_prev_id = null;
                    });
                }
                $('.modal').remove();
                $('.gray_screen_modal').remove();
            });
        });

        cancel_btns();
    });

    //subdivision
    $(".choose_subdivision_btn").click(function() {
        general_modal('Выбор подразделения');

        //data for modal wnd
        $.getJSON("../data/subs.json", function(subdivisions) {
            arr_sort(subdivisions, 'name');

            fill_modal(subdivisions, 'name', 'org_id');

            clicked_id = null;
            helper_id = null;
            choose_row(subdivision_prev_id);

            //ok btn
            $(".ok_btn_modal").click(function(){
                if(clicked_id != null) {
                    $('.subdivision_selection_cell').empty();
                    $('.subdivision_selection_cell').append('<div><div class="text_selection">' + subdivisions[clicked_id].name + '</div><button class="btn_X btn_X_subdivision">X</button></div>');
                    subdivision_prev_id = clicked_id;
                    $(".btn_X_subdivision").click(function(){
                        $('.subdivision_selection_cell').empty();
                        subdivision_prev_id = null;
                    });
                }
                $('.modal').remove();
                $('.gray_screen_modal').remove();
            });
        });

        cancel_btns();
    });
});
