<?php
$locale = "tr_TR";
$L = "T";
$title = "PalestineRemix";
$description = "Explore the story of Palestine. Take our content and use our creative remix tool to re-edit our films. Create your own palestine story";
$images = "http://interactive.aljazeera.com/ajt/PalestineRemix/transcripts/images/";
$image = "http://interactive.aljazeera.com/ajt/PalestineRemix/images/turkish.jpg";
$TROOT = "transcripts/html/";

$titles = ["İSRAİLLİ RADİKAL GİDEON LEVİ","DUVARA KARŞI","C BÖLGESİ","AÇIK CEZAEVİ","YASAKLAR ÜLKESİ İSRAİL","GAZZE'Yİ KARARTMA","GAZZE YENİDEN","BEKLE BİZİ GAZZE","GÖLGE TEŞKİLAT ŞİN BET","DİRENEN TOPRAKLAR","YİTİK ŞEHİRLER","FİLİSTİN AŞKINA","İŞGALİN ASKERLERİ","GAZZE: SAĞIR DÜNYA","OSLO'NUN BEDELİ - 1. BÖLÜM","OSLO'NUN BEDELİ - 2. BÖLÜM","ÖLÜMÜNE DİRENİŞ","BÜYÜK FELAKET - 1. BÖLÜM","BÜYÜK FELAKET - 2. BÖLÜM","BÜYÜK FELAKET - 3. BÖLÜM","BÜYÜK FELAKET - 4. BÖLÜM","SÜRGÜN EDİLENLER","FAS'A DÖNÜŞ","İNTİFADA HİKAYELERİ - 1","İNTİFADA HİKAYELERİ - 2","48'LİLER","KUDÜS: KENDİ EVİNİ YIKMAK","PARÇALANAN FİLİSTİN"];


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
    $title = "Filistin Remiks özeti - " . $titles[$v];
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

    if ($vid) $title = "Filistin Remiks'ten remiks - " . $titles[$vid];

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

$html = get_include_contents('view_remix.html');
$doc = phpQuery::newDocument($html);
phpQuery::selectDocument($doc);
pq('meta')->remove();
pq('title')->remove();
ob_start();
?>
<title><?php echo htmlspecialchars($title); ?></title>
<meta name="description" content="<?php echo htmlspecialchars($description); ?>" />

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

<?php
$out = ob_get_contents();
ob_end_clean();
pq('head')->append($out);
echo $doc->html();
?>
