<?php
$locale = "ar_AR";
$L = "A";
$title = "PalestineRemix";
$description = "Explore the story of Palestine. Take our content and use our creative remix tool to re-edit our films. Create your own palestine story";
$images = "http://interactive.aljazeera.com/aja/PalestineRemix/transcripts/images/";
$image = "http://interactive.aljazeera.com/aja/PalestineRemix/images/arabic.jpg";
$TROOT = "transcripts/html/";

$titles = ["ضد التيار","قرى تتحدى الجدار","مناطق جيم","خارج الأسوار","الحج المحرم","حياة بالجدول","غزة تعيش","غزة إننا قادمون","الشاباك","الاقتلاع من الغور","اغتيال المدينة","فلسطين في قلوب إيطالية","المستنقع","أقوى من الكلام","ثمن أوسلو الجزء الأول","ثمن أوسلو الجزء الثاني","معركة الأمعاء الخاوية","النكبة الجزء الأول","النكبة الجزء الثاني","النكبة الجزء الثالث","النكبة الجزء الرابع","منسيون خارج الوطن","فسيفساء","حكايات من انتفاضة الحجارة الجزء الأول","حكايات من انتفاضة الحجارة الجزء الثاني","ولدن في النكبة","اهدم بيتك بيدك","مقطع الأوصال"];


$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$url = substr($url, 0, strpos($url, "?"));

function get_include_contents($filename) {
    if (is_file($filename)) {
        ob_start();
        include $filename;
        return ob_get_clean();
    }
    return false;
}

if ($_GET["_escaped_fragment_"]) {
  $frag = explode('/', urldecode($_GET["_escaped_fragment_"]));

  $vid = null;
  $t = null;
  $t2 = null;

  if (!strpos(urldecode($_GET["_escaped_fragment_"]), ':')) {
    // transcript
    $v = $frag[1];
    $vid =$v;
    $t = $frag[2];
    $ts = floor($t / 1000);
    $t2 = $frag[3];
    $image = $images . $v . "/" . $L . "/p/img" . $ts . ".jpg";
    $title = "مقطع من ريمكس فلسطين - " . $titles[$v];
  } else {
    // mix
    for ($i = 1; $i < count($frag); $i++) {
      $vt = explode(":", $frag[$i]);
      $v = $vt[0];
      if (!is_numeric($v)) continue;
      $vid = $v;
      $t = explode(",", $vt[1])[0];
      $ts = floor($t / 1000);
      $t2 = explode(",", $vt[1])[1];
      $image = $images . $v . "/" . $L . "/p/img" . $ts . ".jpg";
      break;
    }

    if ($vid) $title = "ريمكس من ريمكس فلسطين - " . $titles[$vid];

    for ($i = 1; $i < count($frag); $i++) {
      $vt = explode(":", $frag[$i]);
      $v = $vt[0];
      if ($v == "t") {
        $title = explode(",", $vt[1])[0];
      }
    }
    $t2 = $t + $t2;
  } // mix

  $transcript = get_include_contents($TROOT . $L . '/' . $vid . '.html');
  $description = "";

  $lastPara = "";

  require('phpQuery/phpQuery.php');
  $doc = phpQuery::newDocument($transcript);
  phpQuery::selectDocument($doc);
  $words = pq('article')['a'];
  foreach($words as $word) {
    $tw = pq($word)->attr("data-m");
    if ($tw >= $t && $tw <= $t2) {
      //$description .= pq($word)->text();
      $para = pq($word)->parent()->text();
      if ($para != $lastPara) {
        $description .= str_replace("\n", '', $para);
        $lastPara = $para;
      }
    }
  }

  $url .= '#!' . urldecode($_GET["_escaped_fragment_"]);
} // _escaped_fragment_

?>

<meta property="og:locale" content="<?php echo htmlspecialchars($locale); ?>" />

<meta property="og:title" content="<?php echo htmlspecialchars($title); ?>" />
<meta property="og:type" content="video.other" />
<meta property="og:description" content="<?php echo htmlspecialchars($description); ?>" />
<meta property="og:url" content="<?php echo htmlspecialchars($url); ?>" />
<meta property="og:image" content="<?php echo htmlspecialchars($image); ?>" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@PalestineRemix" />

<meta property="twitter:title" content="<?php echo htmlspecialchars($title); ?>" />
<meta property="twitter:description" content="<?php echo htmlspecialchars($description); ?>" />
<meta property="twitter:image:src" content="<?php echo htmlspecialchars($image); ?>" />
