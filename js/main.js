var data = [
    {
        img: 'pic1.png',
        caption: '2016年手游数据报告(扫描二维码)',
        site: 'https://github.com/onlyfzz/webapp'
    },
    {
        img: 'pic2.jpg',
        caption: 'web版网易云音乐(点击进入)',
        site: 'https://github.com/onlyfzz/music-player-PC'
    },
    {
        img: 'pic3.png',
        caption: 'Vue2.0创建外卖app(扫描二维码)',
        site: 'https://github.com/onlyfzz/sell-app'
    },
    {
        img: 'pic4.jpg',
        caption: '构建商城整站(点击进入)',
        site: 'https://github.com/onlyfzz/complete-website'
    }
];
var flag = true;
//翻面控制,点击的海报居中控制
function turn(ele) {
    var n = ele.attr('id').split("-")[1];
    var cls = ele.className;
    /*检测点击的海报有没有居中,没有则让其居中*/
    if (!/center/.test(cls)) {
        return resort(n);
    }
}
//取一个[]范围内的随机数
function random(range) {
    var max = Math.max(range[0],range[1]);
    var min = Math.min(range[0],range[1]);
    var diff = max - min + 1;
    return Math.floor(Math.random() * diff + min);
}
//计算左右分区的范围,range对象来存储范围
function range(){
    var range = {
        left:
            {x:[],
             y:[]},
        right:
            {x:[],
             y:[]}
    };
    //wrap的宽高
    var wrap = {
        w: $("#wrap").width(),
        h: $("#wrap").height()
    };
    //photo的宽高
    var photo={
        w: $(".photo").eq(0).width(),
        h: $(".photo").eq(0).height()
    };
    range.left.x = [photo.w/2, wrap.w/2 - photo.w - photo.w/2];
    range.left.y = [0 - photo.h/4, wrap.h - photo.h/2];
    range.right.x = [wrap.w/2 + photo.w/2, wrap.w-photo.w/4];
    range.right.y = [0 - photo.h/4, wrap.h - photo.h/2];
    return range;
}
//渲染海报版面
function resort(n) {
    var _photos = $(".photo");
    var photoArr = [];
    //清除样式,然后给#photo-n赋予一个center样式
    for(var i = 0;i<_photos.length;i++){
        _photos.eq(i).removeClass('center');
        _photos.eq(i).css({
            left: '',
            top: '',
            transform: 'rotate(0deg) scale(1.2)'
        });
        photoArr.push(_photos.eq(i));
    }
    var photo = $("#photo-"+n);
    photo.addClass('center');
    photoArr.splice(n,1);
    //把海报分为左右两个部分
    var photos_left = photoArr.splice(0,Math.ceil(photoArr.length/2));
    var photos_right = photoArr;
    var ranges = range();
    /*为没有被选中的每个photo添加位置和旋转样式*/
    photos_left.forEach(function(item){
        item.css({
            left: random(ranges.left.x)+"px",
            top: random(ranges.left.y)+"px",
            transform: 'rotate('+random([-150,150])+'deg) scale(1)'
        });
    });
    photos_right.forEach(function(item){
        item.css({
            left: random(ranges.right.x)+"px",
            top: random(ranges.right.y)+"px",
            transform: 'rotate('+random([-150,150])+'deg) scale(1)'
        });
    });
    /*为按钮添加样式*/
    var navs = $(".i");
    for(var i=0;i<navs.length;i++){
        navs.removeClass('i_current');
    }
    $("#nav_"+n).addClass('i_current');
}

/*添加数据*/
function addPhotos() {
    var wrap = $("#wrap");
    var old_html = wrap.html();
    var new_html = "";
    var nav = "";
    for(var i=0;i<data.length;i++){
        new_html += '<div  id="photo-'+i+'" class="photo" onclick="turn($(this))">'+
                        '<div  class="photo-wrap">'+
                            '<div class="side-front">'+
                                '<img class="img-center" src="img/'+data[i].img+'">'+
                                '<h2 class="caption"><a href="'+data[i].site+'" target="_blank">'+data[i].caption+'</a></h2>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        nav += '<span id="nav_'+i+'" onclick="turn($(\'#photo-'+i+'\'))" class="i">&nbsp;</span>';
    }
    nav = '<div class="nav">'+nav+'</div>';
    wrap.html(old_html + new_html + nav);
    resort(random([0,data.length - 1]));
}
function changeBottom() {
    if (window.innerHeight < 600) {
        $('.page1').find('.head').css('paddingBottom', 0);
    }
}
changeBottom();

$('#fullpage').fullpage({
    sectionsColor: ['#22c3aa', '#7baece', '#fff', '#7baece'],
    navigation: true,
    navigationColor: '#f5f5f5',
    navigationPosition: 'right',
    showActiveTooltip: true,
    afterLoad: function(anchorLink, index) {
        switch (index){
            case 1:
                move('.page1 .page-left').set('left','0').end();
                move('.page1 .page-right').set('right','0').end();
                if (flag) {
                    addPhotos(); 
                    flag = false; 
                }
                break;
            case 2: 
                move('.page2 .content').set('opacity', 1).duration('1s').end();
                break;
            case 3:
                resort(random([0,data.length - 1]));
                break;
            case 4: 
                move('.page4 .content').set('opacity', 1).duration('1s').end();
                break;
            default :
                break;
        }
        $('.section').removeClass('leave').addClass('load');
    },
    onLeave: function(index, nextIndex, direction) {
        switch (index){
            case 1:
                move('.page1 .page-left').set('left','-100%').end();
                move('.page1 .page-right').set('right','-100%').end();
                break;
            case 2: 
                move('.page2 .content').set('opacity', 0).end();
                break;
            case 3:
                resort(random([0,data.length - 1]));
                break;
            case 4: 
                move('.page4 .content').set('opacity', 0).end();
                break;
            default :
                break;
        }
    }
});



