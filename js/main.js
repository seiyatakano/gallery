'use strict';

$(function() {
    console.log('attempt2');
    $('#gallery').each(function () {
        var $container = $(this);

        $container.masonry({
            columnWidth: 230,
            gutter: 15,
            itemSelector: '.gallery-item'
        });

        //JSONファイルをリクエストし、成功したら関数を実行する
        $.getJSON('./data/content.json', function(data) {
            //ループで生成したDOM要素を一時的に保存する配列
            var elements = [];

            //JSONのファイ列の要素をループ処理
            $.each(data, function(i, item) {
                var itemHTML =
                '<li class="gallery-item is-loading">'+
                '<a href="'+item.images.url+'">'+
                '<p>'+
                '<img src="'+
                item.images.thumb+
                '"alt="'+item.title+'">'+
                '<strong>'+
                item.title+
                '</strong><span></span>'+
                '</p>'+
                '</a>'+
                '</li>';
                
                //HTML文字列をDOM要素化し配列に追加
                elements.push($(itemHTML).get(0));
            });

            //DOMを挿入
            $container.append(elements);

            //画像の読み込みが完了したらMasonryレイアウト
            $container.imagesLoaded(function(){
                $(elements).removeClass('is-loading');
                $container.masonry('appended', elements);
            });
        });
    });

    var duration = 300;

    var $images = $('.gallery-item p');

    $images.on('mouseover', function() {
            $(this).find('strong, span').stop(true).animate({
                opacity: 1
            }, duration);
        })
        .on('mouseout', function() {
            $(this).find('strong, span').stop(true).animate({
                opacity: 0
            }, duration);
        }); 
});