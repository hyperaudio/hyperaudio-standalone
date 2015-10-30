<?php
$locale = "tr-TR";
$L = "T";
$title = "PalestineRemix";
$description = "Explore the story of Palestine. Take our content and use our creative remix tool to re-edit our films. Create your own palestine story";
$images = "http://interactive.aljazeera.com/aje/PalestineRemix/transcripts/images/";

$titles = [
"Going against the grain",
"Against the wall",
"Area C",
"Beyond the walls",
"Forbidden Pilgrimage",
"Gaza left in the dark",
"Gaza lives on",
"Gaza we are coming",
"Inside Shin Bet",
"Last shepherds of the valley",
"Lost cities of Palestine",
"Palestina Amore",
"The pain inside",
"Stronger than words",
"The price of Oslo 1",
"The price of Oslo 2",
"Hunger Strike",
"Al Nakba 1",
"Al Nakba 2",
"Al Nakba 3",
"Al Nakba 4",
"Deportees",
"Return to Morocco",
"Stories from the Intifada p1",
"Stories from the Intifada p2",
"Born in 1948",
"Jerusalem Hitting Home",
"Palestine Divided"
];


$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$url = substr($url, 0, strpos($url, "?"));

$image = $images . "default.png";

if ($_GET["_escaped_fragment_"]) {
  $frag = explode('/', urldecode($_GET["_escaped_fragment_"]));

  if (!strpos(urldecode($_GET["_escaped_fragment_"]), ':')) {
    // transcript
    $v = $frag[1];
    $t = floor($frag[2] / 1000);
    $image = $images . $v . "/" . $L . "/p/img" . $t . ".jpg";
    $title .= " - " . $titles[$v];
  } else {
    // mix
    $vid = null;
    for ($i = 1; $i < count($frag); $i++) {
      $vt = explode(":", $frag[$i]);
      $v = $vt[0];
      if (!is_numeric($v)) continue;
      $vid = $v;
      $t = floor($vt[2] / 1000);
      $image = $images . $v . "/" . $L . "/p/img" . $t . ".jpg";
      break;
    }

    if ($vid) $title .= " - " . $titles[$vid];

    for ($i = 1; $i < count($frag); $i++) {
      $vt = explode(":", $frag[$i]);
      $v = $vt[0];
      if ($v == "t") {
        $title = explode(",", $vt[1])[0];
      }
    }
  }



  // $list = file_get_contents("list.json");

  $url .= '#!' . urldecode($_GET["_escaped_fragment_"]);
}
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
