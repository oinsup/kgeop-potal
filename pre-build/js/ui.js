function rect() {
    /* 상단 정사각형 애니메이션 */
    var animateSpeed = 500;
    var txtSpeed = 250;
    $(".headingMsg .line .top").animate({
        "width": '100%'
    }, animateSpeed, function () {
        $(".headingMsg .line .right").animate({
            "height": "100%"
        }, animateSpeed, function () {
            $(".headingMsg .line .bottom").animate({
                "width": "100%"
            }, animateSpeed, function () {
                $(".headingMsg .line .left").animate({
                    "height": "100%"
                }, animateSpeed, function () {

                    $(".headingMsg>p").eq(0).addClass("active", txtSpeed, function () {
                        $(".headingMsg>p").eq(1).addClass("active", txtSpeed, function () {
                            $(".headingMsg>p").eq(2).addClass("active", txtSpeed, function () {
                                $(".headingMsg>p").eq(3).addClass("active", txtSpeed)
                            })
                        })
                    });
                })
            })
        })
    });
}

function rectReset() {
    $(".headingMsg>p").stop().removeClass('active');
    $(".headingMsg .line .top").stop().css('width', 0);
    $(".headingMsg .line .right").stop().css('height', 0);
    $(".headingMsg .line .bottom").stop().css('width', 0);
    $(".headingMsg .line .left").stop().css('height', 0);

}

$(document).ready(function () {

    var sHeight = $('#header').outerHeight()+$('.tabContWrap.fix .tabNav').outerHeight();  // 헤더 + sticky tabNav 높이값
    $('.bgGroup').slick({
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        draggable: false
    });
    /* 헤더 fix 스크롤 */
    $(window).on({
        "scroll": function () {
            if ($(window).scrollTop() != 0) {
                $('#header').addClass('fixed');
                $('#header > h1 > img').attr('src', '../images/common/logo.png');
                $('.bookmark').css('top',$(document).scrollTop()+20)
            } else {
                $('#header').removeClass('fixed');
                $('#header > h1 > img').attr('src', '../images/common/logo_white.png')
                $('.bookmark').css('top',0)
            }
            for(i = 0; i < $('.tabContWrap.fix .tabList li').length; i++) {

                if ($(window).scrollTop() >= $('.tabContWrap.fix .tabCont').eq(i).offset().top-sHeight) {
                    $('.tabContWrap.fix .tabList li').eq(i).addClass('active').siblings().removeClass('active')
                }
            }
        }
    })


    /* 헤더 검색창 open,close */
    $('.btnSearchOpen').on({
        "click": function () {
            $(this).parent('.util').siblings('.searchContain').stop().slideToggle("fast");
        }
    });
    $('.btnSearchClose').on({
        "click": function () {
            $(this).closest('.searchContain').stop().slideUp("fast");
        }
    });

    /* 2번 슬라이드 슬릭 */
    function slickReset(){
        $('.contDesc .contGroup').slick('setPosition')
    }

    function slickGroup(){
        $('.contDesc .contGroup').each(function(key, item) {
            var sliderIdName = 'mCont' + key;
            var sliderPrevIdName = 'mContPrev' + key;
            var sliderNextIdName = 'mContNext' + key;

            this.id = sliderIdName;
            $('.btnContPrev')[key].id = sliderPrevIdName;
            $('.btnContNext')[key].id = sliderNextIdName;

            var sliderId = '#' + sliderIdName;
            var sliderPrevId = '#' + sliderPrevIdName;
            var sliderNextId = '#' + sliderNextIdName;
            $(sliderId).slick({
                prevArrow:$(sliderPrevId),
                nextArrow:$(sliderNextId),
                draggable:false,
            })


        });
    }

    /* 검색순위 롤링 */
    function looper(i) {
        setTimeout(function () {
            $('.searchArea .selectBox >a').html($('.searchArea .selectBox dd >a').eq(i).html())
            if ($('.searchArea .selectBox dd').length - 1 > i) {
                i++;
                looper(i);
            } else if (i == $('.searchArea .selectBox dd').length - 1) {
                i = 0;
                looper(i)
            }
        }, 5000)
    };
    looper(1)

    /* 검색순위 롤링(메인) */
    function looper2(i) {
        setTimeout(function () {
            $('.selectMain.last .label').html($('.selectMain.last dl dd').eq(i).html())
            if ($('.selectMain.last dl dd').length - 1 > i) {
                i++;
                looper2(i);
            } else if (i == $('.selectMain.last dl dd').length - 1) {
                i = 0;
                looper2(i)
            }
        }, 5000)
    };
    looper2(1)

    /* 우측 aside dd 토글 */
    $('aside.right dd > a').on({
        "click": function () {
            $(this).parent('dd').addClass('active').siblings('dd').removeClass('active');
        }
    });
    $(document).on('click', 'aside.right .landPop > .btnClose', function (e) {
        $(this).parent('.landPop').remove();
    });

    /* aside 신청지역 토글 */
    $('.typeSelect > select').on({
        "click": function () {
            if ($(this).val() == "Y") {
                $(this).siblings('.radioGroup').show();
            } else {
                $(this).siblings('.radioGroup').hide();
            }
        }
    });
    /* lnb 탭 */
    $('.lnbMenu > li > a').on({
        "click": function (e) {
            $(this).closest('li').toggleClass('active').siblings('li').removeClass('active');
            if ($(this).parent('li').hasClass('innerMenu')) {
                $(this).parent('li').siblings('li').children('.depth2').children('li').removeClass('active');
                e.preventDefault();
            }
        }
    });
    /* 모두드림 즐겨찾기 토글 */
    $('.btnBookmarkLarge').on({
        "click":function(){
            $('.bookmark').toggle();
        }
    });
    /* 모두드림 즐겨찾기 닫기 */
    $('.bookmark .btnClose').on({
        "click":function(){
            $(this).closest('.bookmark').hide();
        }
    });
    /* 모두드림 상세 평가하기 버튼 툴팁 */
    $('.newStarBox .btnArea .btnEdit').on({
        "mouseover": function () {
            $(this).siblings('.tooltip').fadeIn().delay(8000).fadeOut();
        },
        "click":function(){
            $(this).closest('.newStarBox').siblings('.newCommentBox').slideDown();
        }
    });
    /* 모두드림 오류신고 리스트 탭 토글*/
    $('.replyList.report .replyBox').on({
        "click": function () {
            $(this).toggleClass('active');
        }
    });
    /* 모두드림 데이터셋 연관검색어 펼침*/
    $('.btnChartOpen').on({
        "click": function (e) {
            e.preventDefault();
            $(this).toggleClass('active').siblings('.btnChartClose').toggleClass('active').siblings('.tabContWrap').toggleClass('active');
        }
    });
    /* 모두드림 데이터셋 연관검색어 접힘*/
    $('.btnChartClose').on({
        "click": function (e) {
            e.preventDefault();
            $(this).toggleClass('active').siblings('.btnChartOpen').toggleClass('active').siblings('.tabContWrap').toggleClass('active');
        }
    });
    /* 모두드림 데이터셋 선택조건 활성화*/
    $('.btnFilterClose').on({
        "click": function () {
            $('.searchFilter').hide();
        }
    });
    $('.btnFilterOpen').on({
        "click": function () {
            $('.searchFilter').show();
        }
    });

    /* 모두드림 데이터셋 선택조건 제거*/
    $(document).on('click', '.filterList > li > a', function (e) {
        e.preventDefault();
        $(this).closest('li').remove();                                             // 이 태그 제거
        var chkLength = $('.innerFilter li>.checkbox > input[type="checkbox"]').length;   // 체크박스 수
        var idx = $('.innerFilter li');   // 체크박스 부모  li
        for (i = 0; i < chkLength; i++) {                                                 // 체크박스 수 만큼 반복
            if (idx.eq(i).find('label').text() == $(this).html()) {                                               //체크
                idx.eq(i).find('input[type="checkbox"]').prop('checked', false)
            }
        }
    });
    /* 모두드림 데이터셋 필터 초기화 버튼 */
    $('.btnFilterReset').on({
        "click": function () {
            $('.innerFilter li>.checkbox>input[type="checkbox"]').prop('checked', false)
            $('.filterList >li').remove();
        }
    });


    $(document).on('click', '.innerFilter li>.checkbox label', function () {
        if ($(this).siblings('input[type="checkbox"]').is(":checked") == true) {
            for (i = 0; i < $('.filterList >li').length; i++) {
                if ($(this).html() == $('.filterList').children('li').eq(i).children('a').html()) {
                    $('.filterList').children('li').eq(i).remove();
                }
            }
        } else {
            $('.filterList ').append('<li>\n' +
                '                                <a href="#">' + $(this).html() + '</a>\n' +
                '                            </li>')
        }

    });

    /* 마이데이터 평가하기 - 오류신고 평가쓰기 버튼 클릭*/
    $('.evalList .btnEval').on({
        "click": function () {
            $(this).closest('.summary').siblings('.commentBox').slideDown();
        }
    });

    /* 마이데이터 평가하기 - 오류신고 평가쓰기 의견 등록 클릭*/
    $('.evalList .btnCommentSubmit').on({
        "click": function () {
            $(this).closest('.commentBox').slideUp();
        }
    });


    /* 통계드림 상세 - 댓글 내용 접기 펼치기*/
    $('.btnListDown').on({
        "click": function () {
            $(this).hide().siblings('.btnListUp').show();
            $(this).closest('.btnGroup').siblings('.text').children('strong').addClass('down').siblings().show();
            $(this).parents('.replyBox').addClass('active');
            $(this).closest('.replyWrap').siblings('.ansArea').show();
        }
    });
    $('.btnListUp').on({
        "click": function () {
            $(this).hide().siblings('.btnListDown').show();
            $(this).closest('.btnGroup').siblings('.text').children('strong').removeClass('down').siblings().hide();
            $(this).parents('.replyBox').removeClass('active')
            $(this).closest('.replyWrap').siblings('.ansArea').hide();
        }
    });
    $('.btnListEdit').on({
        "click": function () {
            $(this).closest('.btnGroup').siblings('.newCommentBox').slideDown();
        }
    });
    $('.btnListRemove').on({
        "click": function () {
            $(this).closest('.replyBox').remove();
        }
    });

    $('.btnEnter').on({
       "click":function(){
           $(this).closest('.titleArea').next('.newCommentBox').slideDown();
       }
    });

    /* lnb 탭 2뎁스*/
    $('.innerMenu > .depth2 > li > a').on({
        "click": function () {
            $(this).closest('li').toggleClass('active').siblings('li').removeClass('active');
        }
    });
    /* 탭메뉴 */

    $('.tabList > li > a').on({
        "click": function (e) {
            e.preventDefault();
            idx = $(this).closest('li').index();
            if($(this).closest('.tabContWrap').hasClass('fix')){    // 모두드림, 통계드림 상세페이지 탭 스크롤
                $('html,body').animate({scrollTop:$(this).closest('.tabNav').siblings('.tabCont').eq(idx).offset().top-sHeight+5},500)
            }else{
                var idx = $(this).parent('li').index();
                $(this).parent('li').addClass('active').siblings('li').removeClass('active');

                if ($(this).parent('li').parent('.tabList').hasClass('hasTotal')) {
                    if (idx != 0) {
                        $(this).parent().parent().parent('.tabNav').siblings('.tabCont').eq(idx - 1).addClass('active').siblings('.tabCont').removeClass('active');
                    } else {
                        $(this).parent().parent().parent('.tabNav').siblings('.tabCont').addClass('active')
                    }
                } else {
                    $(this).parent().parent().parent('.tabNav').siblings('.tabCont').eq(idx).addClass('active').siblings('.tabCont').removeClass('active');
                }
            }
        }
    });

    $('.toggleStyle > button').on({
        "click": function () {
            $(this).addClass('active').siblings('button').removeClass('active');
            var idx = $(this).index();
            $(this).parent('.toggleStyle').siblings('.contStyle').eq(idx).addClass('active').siblings('.contStyle').removeClass('active');
        }
    });
    /* 검색어 토글 */
    $('.btnSearchWord').on({
        "click": function () {
            $(this).addClass('active').siblings().removeClass('active');
        }
    });
    /* 검색순위 토글 */
    $('.searchArea .selectBox > a').on({
        "click": function () {
            $(this).siblings('dl').toggle();
        }
    });

    /* 검색영역 스크롤 다운시 숨김*/
    $("html, body").on('mousewheel DOMMouseScroll', function (e) {
        var E = e.originalEvent;
        delta = 0;
        if (E.detail) {
            delta = E.detail * -40;
        } else {
            delta = E.wheelDelta;
        }
        ;

        if (delta < 0) {
            if ($('html, body').scrollTop() >= 160) {

                $('.searchBox.type4.toggle').slideUp()
                $('.searchCondition').show();
            }
        }

    });
    /* 검색영역 보이기 */
    $('.searchCondition > .btnCondition').on({
        "click": function () {
            $('.searchBox.type4.toggle').slideDown()
            $('.searchCondition').hide();
        }
    });


    /* slider 체크박스 토글 */
    $('.sliderCont .checkbox input[type="checkbox"]').on({
        "click": function () {
            $(this).parents('.box').toggleClass('active')
        }
    });
    $('.sliderCont .boxWrap').on({
        "click": function (e) {
            if (!$(e.target).hasClass("greyType")) {
                $(this).parents('.box').toggleClass('active')
                $(this).siblings('.checkbox').children('input[type="checkbox"]').prop('checked', function () {
                    return !$(this).prop('checked');
                })
            }
        }
    });
    $('.btnSliderMore').on({
        "click": function () {
            $(this).hide();
            $('.btnSliderMore2').show();
            $('.sliderMain').slick('unslick');
        }
    })

    $('.btnSliderMore2').on({
        "click": function () {
            $('.btnSliderMore').show();
            $(this).hide()
            $('.sliderMain').slick({

                slidesToShow: 5,
                slidesToScroll: 1,
            });
        }
    })

    /* slick control (모두드림에서 사용) */
    $('.sliderDetail').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite:false,
    });

    $('.sliderDetail').on('afterChange',function (){
        if($('.sliderDetail').slick('getSlick').slideCount - $('.sliderDetail').slick('slickCurrentSlide') == 4){
            $(this).children('.slick-next').hide();
            $(this).children('.slick-prev').show();
        }else if($('.sliderDetail').slick('slickCurrentSlide') == 0){
            $(this).children('.slick-prev').hide();
            $(this).children('.slick-next').show();
        }else{
            $(this).children('.slick-prev').show();
            $(this).children('.slick-next').show();
        }
    })
    $('.sliderDetail').children('.slick-prev').hide();

    /* 공지사항 slick

    $('.totalNum').text($('.noticePop .item').length)
    $('.noticePop .popupMain').slick({
        prevArrow:$('.btnNoticePrev'),
        nextArrow:$('.btnNoticeNext'),
        draggable:false
    })
    $('.btnNoticePrev').on({
        'click':function (){
            $('.thisNum').text($(this).closest('.popupFooter').siblings('.popupMain').find('.slick-active').index())
        }
    })
    $('.btnNoticeNext').on({
        'click':function (){
            $('.thisNum').text($(this).closest('.popupFooter').siblings('.popupMain').find('.slick-active').index())
        }
    })
    */

    /* 스토리맵 만들기 팝업 */
    $(".btnStoryClose").on({
        "click": function () {
            $(this).closest(".popMakeStory").hide();
            $("#dimmed").remove();
        }
    });
    $(".thumbList li").on({
        "click": function () {
            $(this).addClass("active").siblings().removeClass("active");
        }
    });


    /* 비밀번호 아이디찾기 탭 이벤트 */
    $(".accountTab li").on({
        "click": function () {
            var idx = $(this).index();
            $(".accountInner").eq(idx).show().siblings(".accountInner").hide();
            $(this).addClass("active").siblings().removeClass("active");
        }
    });
    /*테이블 필터링 탭*/
    $('.tabTable > li > a').on({
        "click": function () {
            $(this).closest('li').addClass('active').siblings('li').removeClass('active');
        }
    });
    /* 얼럿 팝업 닫기 */
    $('.alert .btnClose').on({
        "click": function () {
            $(this).closest('.alert').hide();
        }
    });
    $('.btnClose').on({
        "click": function () {
            $(this).closest('.popup').hide();
            $('#dimmed').hide();
        }
    });

    /* 레이어 검색 팝업 탭 토글*/
    $('.hasDepth').on({
        "click": function () {
            $(this).toggleClass('active').siblings('.innerDepth').toggle();
            $(this).closest('li').siblings('li').children('a').removeClass('active').siblings('.innerDepth').hide().children('li').removeClass('active');
        }
    });

    $('.innerDepth > li > a').on({
        "click": function () {
            $(this).closest('li').toggleClass('active').siblings('li').removeClass('active');
        }
    });
    $('.btnShowHide').on({
        "click": function () {
            $(this).toggleClass('active');
        }
    });
    $('.alert, .popup').draggable({
        cancel: '.popupMain',
        containment: "window"
    });

    /* datePicker */
    $(".cal").datepicker({
        dateFormat: "yy-mm-dd",
        monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: "년"
    });


    /* 메인화면일때 풀페이지 라이브러리 실행 */
    if ($('#main').length) {
        //anchors: ['slide1', 'slide2', 'slide3', 'slide4', 'slide5']
        $('#main').fullpage({
            anchors: ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'],
            scrollingSpeed: 470,
            verticalCentered: false,
            afterLoad: function (section, origin) {
                $('.cLocation li').eq(origin-1).addClass('active').siblings('li').removeClass('active').closest('.cLocation').show();
                if (origin == 1) {
                    rect();
                    videoShuffle();
                    $('.btnTop').hide();
                    $('.aside').hide()
                } else if (origin == 2) {
                    $('.mainMapArea').addClass('visible');
                    //$('.sec2 .dataStatus').addClass('visible');
                    $('.countNum').counterUp({
                        delay: 10,
                        time: 300
                    });
                    rectReset();
                     $('.aside').show();
                     $('.btnTop').show();
                } else if (origin == 3) {
                    $('.sec3 h3, .sec3 .mainSearchBox, .sec3 .mainSwiper, .sec3 .cardControl').addClass('visible');
                    $('.aside').show();
                    $('.btnTop').show();
                } else if (origin == 4) {
                    $('.sec4 .makeTheme').addClass('visible');
                    $('.aside').show();
                    $('.btnTop').show();
                } else if (origin == 5) {
                    $('.sec5 .list3d h3, .sec5 .list3d .txtDesc, .sec5 .anchor, .sec5 .tooltip3d, .sec5 .btnDetail').addClass('visible');
                    $('.aside').show();
                    $('.btnTop').show();
                } else if (origin == 6) {
                    rectReset();
                    $('.cLocation').hide();
                    $('.aside').show();
                    $('.btnTop').show();
                }
            }
        });
        var mainSwiper = new Swiper('.mainSwiper', {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 15,
            navigation: {
                nextEl: '.pagiNext',
                prevEl: '.pagiPrev',
            },
            pagination: {
                el: '.card-pagination',
                type: 'fraction',
            },
            loop: true,
        });




    }

    /*
    if($('.mainPopSwiper .swiper-slide').length == 1){
        $('.mainPopSwiper').addClass('len1').removeClass('len2,len3,len4');
        $('.btnDirection').hide();
        var mainPopSwiper = new Swiper('.mainPopSwiper', {
            slidesPerView:1,
            loop: false,
        });
    }
    else if($('.mainPopSwiper .swiper-slide').length == 2){
        $('.mainPopSwiper').addClass('len2').removeClass('len1,len3,len4');
        $('.btnDirection').hide();
        var mainPopSwiper = new Swiper('.mainPopSwiper', {
            slidesPerView:2,
            loop: false
        });


    }else if($('.mainPopSwiper .swiper-slide').length == 3){
        $('.mainPopSwiper').addClass('len3').removeClass('len1,len2,len4');
        $('.btnDirection').hide();
        var mainPopSwiper = new Swiper('.mainPopSwiper', {
            slidesPerView:3,
            loop: false,
        });
    }else{
        $('.btnDirection').show();
        var mainPopSwiper = new Swiper('.mainPopSwiper', {
            slidesPerView:4,
            spaceBetween: 24,
            loop: true,
            pagination: {
                el: '.popPagi',
                clickable: true,
            },
            navigation: {
                nextEl: '.btnDirection .btnNext',
                prevEl: '.btnDirection .btnPrev',
            },
        });
    }
    */


    /* 메인 레이어팝업 닫기 */
    $(".popupZone .btnPopClose").on({
        "click": function () {
            $(this).closest(".popupZone").hide();
        }
    });

    /* 메인 오늘하루닫기 레이어팝업 */
    cookiedata = document.cookie;
    if (cookiedata.indexOf("mainPop=done") < 0) {
        $(".popupZone").show();
    } else {
        $(".popupZone").hide();
    }
    if (cookiedata.indexOf("noticePop=done") < 0) {
        $(".noticePop").show();
    } else {
        $(".noticePop").hide();
    }
    function deleteCookie(name, layername) {
        setCookie(name,'','Thu, 01 Jan 1999 00:00:10 GMT;');
        $(layername).show();
    }
    function setCookie(name, value, expiredays) {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }


    function closePop(cookiename, layername) {
        setCookie(cookiename, "done", 1);
        $(layername).hide();
    }

    $(".popupZone .btnTodayClose").on({
        "click": function () {
            closePop("mainPop", ".popupZone")
        }
    });
    $(".noticePop .btnNoticeClose").on({
        "click": function () {
            if($(this).siblings('.checkbox').find('input[type="checkbox"]').is(':checked') == true){
                closePop("noticePop", ".noticePop")
            }else{
                $(this).closest('.popup').hide();
            }
        }
    });

    /* 퀵메뉴
    $(".aside .btnAsideClose").on({
        "click": function () {
            $(this).closest(".popupArea").hide();
            $(this).hide();
            $(".aside .btnAsideOpen").show();
        }
    });

    $(".aside .btnAsideOpen").on({
        "click": function () {
            $(this).hide();
            $(this).siblings('.popupArea').show();
            $(".aside .btnAsideClose").show();
        }
    });*/
    $(".aside .titPopZone").on({
        "click": function () {
            $(this).siblings("ul").show();
            $(this).hide();
        }
    });
    $(".aside .titPop").on({
        "click":function(){
            deleteCookie("mainPop", ".popupZone");
        }
    });

    /* 메인 전국 시도 데이터현황 셀렉트박스 토글 */
    $(".locationSelect").on({
        "click": function () {
            $(this).find(".ul").stop().slideToggle("fast");
            slickReset();
        }
    });
    $(".locationSelect li").on({
        "click": function () {
            var txt = $(this).find("span").text();
            $(this).closest(".locationSelect").find(">span").text(txt);
            $('.boxShow').hide();
            slickReset();
        }
    });
    /* 메인 간편 주제도 제작 데이터 토글 */
    $('.btnSelectSlide').on({
       "click":function(){
           $(this).toggleClass('active').siblings('.selectList').slideToggle("fast");
       }
    });



    /* 공간정보 검색드림 */
    $(".mainSwiper .box").on({
        "mouseenter": function () {
            $(this).addClass("active").find(".cardWrap").stop().slideDown("fast");
        },
        "mouseleave": function () {
            $(this).removeClass("active").find(".cardWrap").stop().slideUp("fast");
        }
    });
    $(".selectMain .label").on({
        "click": function () {
            $(this).siblings("dl").toggle();
        }
    });
    $(".selectMain li").on({
        "click": function () {
            var option = $(this).text();
            $(this).closest("dl").siblings(".label").text(option);
            $(this).closest("dl").hide();
        }
    })
    /* 맵갤러리 내 스토리맵 토글 */
    $('.btnMyStorymap').on({
        "click":function(){
            $(this).toggleClass('active').parent('div').siblings('div').toggle();
        }
    });
    /* 인풋 파일 패스 표시 */
    $('.fileSelect input[type="file"]').change(function () {
        var path = $(this).val();
        $(this).siblings('.fileLocal').val(path)
    });
    /* 메인 3차원 정보드림 토글*/
    $('.info3d .anchor a').on({
        "click": function () {
            $(this).closest('.anchor').addClass('active').siblings('.anchor').removeClass('active');
            var idx = $(this).closest('.anchor').index();
            $('.vide3dArea img').eq(idx).addClass('active').siblings('img').removeClass('active');
            $('.tooltip3d .desc').eq(idx).addClass('active').siblings('.desc').removeClass('active');
        }
    });

    function dataHeight() {
        $('.cont .download.left').css('height', $('.dataTop').outerHeight());
    }


    /* 메인 slide2 select */
    $('.locationSelect ul li').on({
        "click":function(){
            $(this).addClass('active').siblings('li').removeClass('active');
            $('.loactionImg').eq($(this).index()).addClass('active').siblings('.loactionImg').removeClass('active');
            $('.dataGroup').eq($(this).index()).addClass('visible').siblings('.dataGroup').removeClass('visible');
            $('.countNum').counterUp({
                delay: 10,
                time: 300
            });

        }
    });

    /* 메인 slide2 이미지 크게보기 */

    $(document).on('click', '.imgDesc .box', function () {
        var $cont = $(this).html();
        if($(this).parent('div').hasClass('boxGroup')){
            $(this).parent('.boxGroup').siblings('.boxShow').fadeIn().find('.innerBox').empty().append($cont);

        }else{
            $(this).siblings('.boxShow').fadeIn().find('.innerBox').empty().append($cont);
        }
    });
    $('.btnImgClose').on({
        "click":function(){
            $(this).closest('.boxShow').fadeOut();
        }
    });


    window.onload = function () {
        dataHeight();
    }

    $('.dataGroup .tabList li a').on({
        "click":function(){
            slickReset();
        }
    })


    slickGroup();

    /* 스크롤바 */

    $('.imgDesc').mCustomScrollbar({
        callbacks:{
            whileScrolling:function(){
                $(this).find('.boxShow').css('top',-this.mcs.top );
            },
            onUpdate:function (){
                $(this).find('.boxShow').css('top',0);
            }
        }
    })

    $('.mScroll.ul').mCustomScrollbar({
        setTop:'0'
    })

    $(".mScroll").mCustomScrollbar({
        scrollbarPosition: "outside",
        setTop: "0"
    });
    /* 스크롤바 */
    $(".mScrollxy").mCustomScrollbar({
        axis: "yx",
        scrollbarPosition: "outside"
    });
    /* 스크롤바 */
    $('.mScrollx').mCustomScrollbar({
        axis: "x",
        scrollbarPosition: "outside"
    })

    /* 오류신고 답변 관련 */
    $('.btnAnsEdit').on({
        "click":function(){
            $(this).closest('.btnGroup').siblings('.textArea').find('button,p,input').toggleClass('show');
            $(this).closest('.btnGroup').toggleClass('show');
        }
    });

    $('.btnAnsSubmit').on({
        "click":function(){
            var str = $(this).siblings('input[type="text"]').val();
            $(this).siblings('p').text(str);
            $(this).toggleClass('show').siblings('p,input').toggleClass('show');
            $(this).closest('.textArea').siblings('.btnGroup').toggleClass('show');
        }
    })
    /* 마이데이타-데이터담기 연관데이터 버튼 이벤트*/
    $('.btnTBShow').on({
        "click":function(){
            $(this).toggleClass('active');
            if($(this).hasClass('active')){
                $(this).closest('tr').siblings('.tgTB').css('display','table-row');
            }else{
                $(this).closest('tr').siblings('.tgTB').css('display','none');
            }
        }
    });
    
    /*마이데이타-데이터담기 다운로드 토글*/
    $('.btnRound').on({
        "click":function(){
            $(this).toggleClass('active');
            $(this).siblings('.btnRound').toggleClass('active');
        }
    });

    /* 사이트맵 */
    $('.btnSitemap').on({
        "click":function (){
            $('.siteMap').addClass('active');
        }
    })
    $('.btnSiteMapClose').on({
        "click":function (){
            $('.siteMap').removeClass('active');
        }
    })

    $('.siteMpaList > li > ul > li .btnSitemapToggle').on({
        "click":function (){
            $(this).closest('li').toggleClass('active');
        }
    })
});
