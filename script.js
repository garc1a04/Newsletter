var hasMsgError = false;

mouseIn(".button");
mouseIn(".button2");

function mouseIn(selector){
    $(selector).mousemove(function (e) { 
        $(selector).addClass("background-button");
    });

    $(selector).mouseleave(function () { 
        $(selector).removeClass("background-button");
    });
}

$("input").on("click", function () {
    $(this).addClass("input-border-click");
    $(this).removeClass('input-error');
});

sendEmail('.button','click');
sendEmail('input','keypress');

function sendEmail(selector, event){

    $(selector).on(event, function (e) {
        if(event == 'keypress' && e.key != 'Enter'){
            return;
        }

        verification($('input').val());
    });
}

function verification(text) {
    const regex = new RegExp('^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    var isOk = regex.test(text);
    
    if(!isOk){
        if(hasMsgError){
            $('input').addClass('input-error');
            return;
        }

        $('input').addClass('input-error');
        $('.text-Email').after('<p class="message-Error">Valid Email Required</p>');
        hasMsgError = true;
        return;
    }

    pageSucess(text);
}

function pageSucess(text) {
    $('.container').css('display', 'none');

    $('.title-sucess').after('<p class="roboto text-p">A confirmation email has been sent to <span class="bold-span">'+text+'.</span>Please open it and click the button inside to confirm your subscription.</p>');
    $('.container2').css('display', 'flex');
}

$('.button2').click(function (e) { 
    resetPageInitial();
    resetPageSucess();
    $('.container').css('display', 'flex');
    $('.container2').css('display', 'none');
});

function resetPageInitial(){
    $('input').removeClass('input-error');
    $('input').val('');
    $('.message-Error').remove();
    hasMsgError = false;
}

function resetPageSucess(){
    $('.text-p').remove();
}