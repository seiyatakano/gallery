'use strict';
$(function() {
    $('#gallery').each(function () {
        var $container = $(this);

        $container.masonry({
            columnWidth: 230,
            gutter: 10,
            itemSelector: '.gallery-item'
        });

        //JSONファイルをリクエストし、成功したら関数を実行する
        $.getJSON('./data/content.json', function(data) {
            //ループで生成したDOM要素を一時的に保存する配列
            var elements = [];

            //JSONのファイ列の要素をループ処理
            $.each(data, function(i, item) {
                var itemHTML ='<li class="gallery-item is-loading">'+'<a href="'+item.images.large+'">'+'<img src="'+item.images.thumb+'"alt="'+item.title+'">'+'</a>'+'</li>';
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
});