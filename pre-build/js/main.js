function pagiCount(){               // 팝업존 아이템 총 갯수
    $('.noticeWrap .pagi .pagiLength').text($('.slickNotice').slick('getSlick').slideCount);
    if($('.slickNotice').slick('getSlick').slideCount <= 4){            // 아이템 4개 이하일때 버튼그룹 삭제
        $('.noticeWrap .btnGroup').hide();
        $('.noticeWrap').siblings('.btnArea').css('position','static');
    }
}
function widthChk(){

    if($(window).width() <= 1280){
        $('.btnSlickPlay').show();
        $('.btnSlickPause').hide();
    }else{
        $('.btnSlickPlay').hide();
        $('.btnSlickPause').show();
    }
}
/* 비디오 랜덤재생 */
function videoShuffle(){
    var videoArray = new Array();
    videoArray[0] = "../video/1040381390-hd.mp4";
    videoArray[1] = "../video/1037189444-hd.mp4";
    var videoNum = Math.round(Math.random()*1);
    var objVideo = $('#video video source')
    objVideo.attr({src:videoArray[videoNum],"data-src":videoArray[videoNum]})
}
$(window).resize(function(){
    widthChk();
})


$(document).ready(function(){
    widthChk();
    videoShuffle();

    $('.slickNotice').on('afterChange',function(){          //팝업존 현제 페이지 번호
        $('.noticeWrap .pagi .thisPagi').text($('.slickNotice').slick('slickCurrentSlide')+1)
    })


    $('.slickNotice').slick({           //팝업존 slick
        draggable:false,
        autoplay:true,
        autoplaySpeed: 2000,        // 오토플레이 속도
        slidesToShow: 4,
        prevArrow:$('.btnSlickPrev'),
        nextArrow:$('.btnSlickNext'),
        responsive: [
            {
                breakpoint: 1281,               // 1280에서 3개로
                settings:{
                    autoplay:false,
                    slidesToShow: 3
                }
            }
        ],

    });


    $('.titPop').on({       //팝업존 버튼 클릭시 slick 리빌드
        "click":function(){
            setTimeout(function(){
                $('.slickNotice').slick('setPosition');
            },1)
        }
    });


    $('.noticeWrap .btnGroup .btnSlickPause').on({      //팝업존 슬릭 일시정지
        "click":function(){
            $('.slickNotice').slick('pause');
            $(this).hide().siblings('.btnSlickPlay').show();
        }
    })
    $('.noticeWrap .btnGroup .btnSlickPlay').on({        //팝업존 슬릭 재생
        "click":function(){
            $('.slickNotice').slick('play');
            $(this).hide().siblings('.btnSlickPause').show();
        }
    });



    pagiCount();
    /* section2 기본통계 그래프-테이블 토글버튼 */
    $('.graphData .btnGroup button').on({
        "click":function(){
            $(this).addClass('active').siblings().removeClass('active');
            if($(this).index() == 0){
                $(this).closest('.titArea').siblings('.graphBox').show().siblings('.tableBox').hide();
            }else{
                $(this).closest('.titArea').siblings('.tableBox').show().siblings('.graphBox').hide();
            }
        }
    });

    /* slide4 간편지도제작 */
    /* 주제영역 탭*/
    $('.makeTheme .type01 .topic li').on({
        "click":function(){
            var idx = $(this).index();
            $('.makeTheme .type02 .topic').eq(idx).addClass('on').siblings('.topic').removeClass('on');
            $(this).addClass('active').siblings().removeClass('active');
        }
    })
    /* 주제 탭 */
    $('.makeTheme .type02 .topic li').on({
        "click":function (){
            $(this).toggleClass('active');
            $(this).children('.checkbox').children('input[type="checkbox"]').prop('checked', function () {
                return !$(this).prop('checked');
            })
            var groupNum = $(this).closest('.col').siblings('.type01').children('.topic').children('.active').index()+1;
            var idx= $(this).index()+1;

            $(this).closest('.col').siblings('.type03').children('.localSelect').find('.group'+groupNum+'-'+idx).toggle()
        }

    });
    /* 주제 탭 (체크박스 클릭이벤트) */
    $('.makeTheme .type02 .topic li .checkbox input[type="checkbox"]').on({
        "click": function () {
            var groupNum = $(this).closest('.col').siblings('.type01').children('.topic').children('.active').index()+1;
            var idx= $(this).closest('li').index()+1;
            $(this).closest('li').toggleClass('active')
            $(this).closest('.col').siblings('.type03').children('.localSelect').find('.group'+groupNum+'-'+idx).toggle()
        }
    });
    /* 상세조건 클릭이벤트 */
    $(document).on('click', '.makeTheme .type03 li', function (e) {
       $(this).toggleClass('active');
    });

    /* 초기화 */
    $('.txtTerms .btnInit').on({
       "click":function(){
           var $setTerm =  $(this).closest('.txtTerms').siblings('.setTerms');
           //주제영역 - 토지로 리셋
           $setTerm.children('.type01').find('.topic li').eq(0).addClass('active').siblings().removeClass('active');
           //주제 - 토지컨텐츠로 리셋
           $setTerm.children('.type02').find('.topic').eq(0).addClass('on').siblings('.topic').removeClass('on');
           //주제 - 체크 리셋
           $setTerm.children('.type02').find('li').removeClass('active').find('input[type="checkbox"]').prop('checked',false);
           //상세조건 - 리셋
           $setTerm.children('.type03').find('li').removeClass('active').hide();

       }
    });
    /* 지역선택 셀렉트박스 */
    //셀렉트박스 슬라이드
    $('.localSel .locationSelDiv span').on({
        "click":function(){
            $(this).siblings('ul').stop().slideToggle();
        }
    });
    //셀렉트박스 선택내용 표출
    $('.localSel .locationSelDiv li').on({
        "click":function (){
            var desc = $(this).html();
            $(this).closest('ul').stop().slideUp().siblings('span').text(desc);
        }
    });

    $('.galleryArea .favorite').on({
        "click":function (){
            $(this).toggleClass('active');
        }
    })

});


//외부영역 클릭시 커스텀셀렉트박스 slideUp
$(document).mouseup(function (e){
    var LayerPopup = $('.locationSelect .ul, .localSel .locationSelDiv ul')
    console.log(LayerPopup.has(e.target).length)
    if(LayerPopup.has(e.target).length === 0){
        LayerPopup.stop().slideUp();
    }
});