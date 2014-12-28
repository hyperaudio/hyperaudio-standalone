<?php

$locale = "en_GB";
$L = "E";

$title = "PalestineRemix";
$description = "Explore the story of Palestine. Take our content and use our creative remix tool to re-edit our films. Create your own palestine story";
$url = "http://interactive.aljazeera.com/aje/palestineremix/index.html";

$image = "assets/english.png";


if ($_GET["t"]) $title = $_GET["t"];
if ($_GET["d"]) $description = $_GET["d"];
if ($_GET["v"]) $image = "http://interactive.aljazeera.com/aje/PalestineRemix/transcripts/images/" . $_GET["v"] . "/" . $L . "/p/img" . $_GET["i"] . ".jpg";

?>

<!-- <base href="http://interactive.aljazeera.com/aje/palestineremix/" /> -->

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
