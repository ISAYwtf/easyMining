<?php
    include_once "simplehtmldom\simple_html_dom.php";

    $url = "easymining/catalog.html";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $page = curl_exec($ch);

    $dom = new simple_html_dom();
    $html = str_get_html($page);

    $goodsContainer = $html->find(".goods__wrap");

    foreach ($goodsContainer as $key => $value) {
        echo $value;
    }
?>