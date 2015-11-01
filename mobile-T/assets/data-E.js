var SEARCH = '/AJE/PalestineRemix/transcripts/';
var TRANSCRIPTS = '/AJE/PalestineRemix/transcripts/html/';
// var TRANSCRIPTS = 'http://interactive.aljazeera.com/AJE/PalestineRemix/transcripts/html/';

var FILMS = [
  { "_id": 1,
    "label": "Against the wall"
  },
  { "_id": 17,
    "label": "Al Nakba 1"
  },
  { "_id": 18,
    "label": "Al Nakba 2"
  },
  { "_id": 19,
    "label": "Al Nakba 3"
  },
  { "_id": 20,
    "label": "Al Nakba 4"
  },
  { "_id": 2,
    "label": "Area C"
  },
  { "_id": 3,
    "label": "Beyond the walls"
  },
  { "_id": 25,
    "label": "Born in 1948"
  },
  { "_id": 21,
    "label": "The Deportees"
  },
  { "_id": 4,
    "label": "Forbidden Pilgrimage"
  },
  { "_id": 5,
    "label": "Gaza left in the dark"
  },
  { "_id": 6,
    "label": "Gaza lives on"
  },
  { "_id": 7,
    "label": "Gaza we are coming"
  },
  { "_id": 0,
    "label": "Going against the grain"
  },
  { "_id": 16,
    "label": "Hunger Strike"
  },
  { "_id": 8,
    "label": "Inside Shin Bet"
  },
  { "_id": 26,
    "label": "Jerusalem hitting home"
  },
  { "_id": 9,
    "label": "Last shepherds of the valley"
  },
  { "_id": 10,
    "label": "Lost cities of Palestine"
  },
  { "_id": 11,
    "label": "Palestina Amore"
  },
  { "_id": 27,
    "label": "Palestine Divided"
  },
  { "_id": 22,
    "label": "Return to Morocco"
  },
  { "_id": 23,
    "label": "Stories from the Intifada 1"
  },
  { "_id": 24,
    "label": "Stories from the Intifada 2"
  },
  { "_id": 13,
    "label": "Stronger than words"
  },
  { "_id": 12,
    "label": "The pain inside"
  },
  { "_id": 14,
    "label": "The price of Oslo 1"
  },
  { "_id": 15,
    "label": "The price of Oslo 2"
  }
];


var VIDEOS = {
	E:
[
"http://www.youtube.com/watch?v=4hRzdAgc8FM,http://player.vimeo.com/external/109585527.mobile.mp4?s=7cc3e82e7500925575fa4a80aa38a380,http://player.vimeo.com/external/109585527.sd.mp4?s=e99f33109ff46499874083681f22910a,http://player.vimeo.com/external/109585527.hd.mp4?s=7bd504c45f373de7f627177e3c3f1bcb",
"http://www.youtube.com/watch?v=HomYG95MO3k,http://player.vimeo.com/external/109585525.mobile.mp4?s=0e9cf2efcd029f38f4ac24adf0e04527,http://player.vimeo.com/external/109585525.sd.mp4?s=b84469ac8b71df005ce2da6ec1568e7f,http://player.vimeo.com/external/109585525.hd.mp4?s=dbcb3c3e779426f92f5ef51f64acbba5",
"http://www.youtube.com/watch?v=TwJHG2KSsG0,http://player.vimeo.com/external/110884059.mobile.mp4?s=51f59906a97efc8cc800238f3890071f,http://player.vimeo.com/external/110884059.sd.mp4?s=44dec8da908f8fe861803178db968db4,http://player.vimeo.com/external/110884059.hd.mp4?s=3eb6e351f73ca929189cbf1e2d74c8c4",
"http://www.youtube.com/watch?v=oy4PWG6LCAs,http://player.vimeo.com/external/109585524.mobile.mp4?s=2a7d529e9ad8e7e965c621a28aa771de,http://player.vimeo.com/external/109585524.sd.mp4?s=a7565459a936ac7d3e616fd2d9dc4df1,http://player.vimeo.com/external/109585524.hd.mp4?s=988c547e4e5d25236d5862976af9e836",
"http://www.youtube.com/watch?v=2JqmcqkIrFE,http://player.vimeo.com/external/110467198.mobile.mp4?s=2368448e7a6a6aa807d1af5e75dad4f7,http://player.vimeo.com/external/110467198.sd.mp4?s=4c5bb5c5d6991eb23992e0175c7909d6,http://player.vimeo.com/external/110467198.hd.mp4?s=2f954a2e824e152bc3bf29a616511b92",
"http://www.youtube.com/watch?v=t657lfeIg4s,http://player.vimeo.com/external/109585526.mobile.mp4?s=5e8942182f3854fad2f86ceee7071d30,http://player.vimeo.com/external/109585526.sd.mp4?s=60efbf26a631aad508d922a50d6d2952,http://player.vimeo.com/external/109585526.hd.mp4?s=1fe0282cf14b8ae2bd82f59f21ad43cb",
"http://www.youtube.com/watch?v=Jp2UcV2Ldaw,http://player.vimeo.com/external/110467201.mobile.mp4?s=43e858a614b39f36250d364d08982262,http://player.vimeo.com/external/110467201.sd.mp4?s=61be96df1d407d817b06cee2f63f6e49,http://player.vimeo.com/external/110467201.hd.mp4?s=53965bd7c092c753d3ab3506273bb5c4",
"http://www.youtube.com/watch?v=a9rGEPGpDis,http://player.vimeo.com/external/110467206.mobile.mp4?s=363243d6fd8e3a2b4831bcee5bfaa329,http://player.vimeo.com/external/110467206.sd.mp4?s=404e9e6b9c502c8b40161c6e9507fd00,http://player.vimeo.com/external/110467206.hd.mp4?s=d529d60db0e6b9374f75301837c6580e",
"http://www.youtube.com/watch?v=3dBBBnxKgeQ,http://player.vimeo.com/external/110888355.mobile.mp4?s=e109a6ee7b9518be2fca986bf6ffc3be,http://player.vimeo.com/external/110888355.sd.mp4?s=50eedb2acda47d10fe34f1912e812072,http://player.vimeo.com/external/110888355.hd.mp4?s=9360b21d5cb36f15bed0353a02b0d044",
"http://www.youtube.com/watch?v=GHcFqNICoJM,http://player.vimeo.com/external/110889321.mobile.mp4?s=373da2d55f91e06bfc1d0d6abff59953,http://player.vimeo.com/external/110889321.sd.mp4?s=11e3a3315488fd0d73f692e193d6f67a,http://player.vimeo.com/external/110889321.hd.mp4?s=05d019878de216dffe78c98e332bcd52",
"http://www.youtube.com/watch?v=sT22bwJ55Sw,http://player.vimeo.com/external/111081054.mobile.mp4?s=ff90091fdfd0036e06e93286aeddb8b9,http://player.vimeo.com/external/111081054.sd.mp4?s=f01c9c1be937d4ba8cf9e3703bcf07e7,http://player.vimeo.com/external/111081054.hd.mp4?s=6aa8d5d30823a9e7bd04cdc1bec455d6",
"http://www.youtube.com/watch?v=sXDngNEqdnA,http://player.vimeo.com/external/111081055.mobile.mp4?s=7a43ccbcbcea35dd9c8aca3f0efb96dd,http://player.vimeo.com/external/111081055.sd.mp4?s=58b07c38865d4a98cb8b311bb5dc9c2b,http://player.vimeo.com/external/111081055.hd.mp4?s=518ee40011cbdbff539bb8e5cfca7165",
"http://www.youtube.com/watch?v=iOoW9-gUCDw,http://player.vimeo.com/external/110697549.mobile.mp4?s=73f098f7e661660e9fa87d1d594a4a50,http://player.vimeo.com/external/110697549.sd.mp4?s=760f42f10760ad4273b7a60b226f2491,http://player.vimeo.com/external/110697549.hd.mp4?s=cee08621e19cb94e50df5997d25620b0",
"http://www.youtube.com/watch?v=NRP-j1eM2Ck,http://player.vimeo.com/external/111081091.mobile.mp4?s=e293bcbc2be7d5e84342371b8c1e2598,http://player.vimeo.com/external/111081091.sd.mp4?s=ead9a0a6f369b24bab6bdeb94a4a23f6,http://player.vimeo.com/external/111081091.hd.mp4?s=fcf751b56cab4dc49e24efb01e8a0ae1",
"http://www.youtube.com/watch?v=ism-ctaSbw0,http://player.vimeo.com/external/110904621.mobile.mp4?s=312e542c7d64534d54f7f9b5e6ab1078,http://player.vimeo.com/external/110904621.sd.mp4?s=e429e308721b41a22ed5cc8acdd32647,http://player.vimeo.com/external/110904621.hd.mp4?s=b5055337d78a967c8e98372a11b57b0a",
"http://www.youtube.com/watch?v=TgFWEVQTeHM,http://player.vimeo.com/external/111081057.mobile.mp4?s=2aa4a2bed0e855ee249e8c620e324c26,http://player.vimeo.com/external/111081057.sd.mp4?s=c65048e4656dfde791f8f78ac87cb6ed,http://player.vimeo.com/external/111081057.hd.mp4?s=98db1b1544a502afcfb92172c7380574",
"http://www.youtube.com/watch?v=u49jwfcLwuE,http://player.vimeo.com/external/110467238.mobile.mp4?s=0690d58aa180bd66e9043975361639de,http://player.vimeo.com/external/110467238.sd.mp4?s=e8a332cbffc1cfa2dcfafe71abe40dc3,http://player.vimeo.com/external/110467238.hd.mp4?s=1d8125fcb86fbc884d8e7ab2d71aa9d5",
"http://www.youtube.com/watch?v=H7FML0wzJ6A,http://player.vimeo.com/external/111081058.mobile.mp4?s=2c9283df2d2132791282fd473d95d413,http://player.vimeo.com/external/111081058.sd.mp4?s=d20ded9a08ad462f6ff44790b40d7693,http://player.vimeo.com/external/111081058.hd.mp4?s=cad76b3823904863171ec927e50bd7a0",
"http://www.youtube.com/watch?v=yI2D5Fsd9lg,http://player.vimeo.com/external/111081059.mobile.mp4?s=9a8cd0a739805a9b847e2a330e3af851,http://player.vimeo.com/external/111081059.sd.mp4?s=6c853d32b8dd2e7167a0f79d4c06033d,http://player.vimeo.com/external/111081059.hd.mp4?s=f08274591b8f2d75919792837dcbb99a",
"http://www.youtube.com/watch?v=5SKECszemmA,http://player.vimeo.com/external/111081089.mobile.mp4?s=2da6e706be1f8852def6bda4d77eb1cf,http://player.vimeo.com/external/111081089.sd.mp4?s=95254f6be7ac51226c4dc37ed5e602c9,http://player.vimeo.com/external/111081089.hd.mp4?s=7fc73b36d5f23c2b46272f0c2466fdeb",
"http://www.youtube.com/watch?v=0m__A7MlDrk,http://player.vimeo.com/external/111081090.mobile.mp4?s=f4fde8d2304350fed1fc70771f292032,http://player.vimeo.com/external/111081090.sd.mp4?s=e4e8d05d5093187411eda737120d1c54,http://player.vimeo.com/external/111081090.hd.mp4?s=a243a21bb0ceb9c63e1504fa6ae16376",
// new:
"http://www.youtube.com/watch?v=gvVlHE5nYJw,http://player.vimeo.com/external/129669280.mobile.mp4?s=ecd8a4bf45009a26f1a1e5facab0ff74,http://player.vimeo.com/external/129669280.sd.mp4?s=67cccdeeab0622a8c2a583187bd936ab,http://player.vimeo.com/external/129669280.hd.mp4?s=e2b2185feabd68d101b37f5830c84404",
"http://www.youtube.com/watch?v=kdBMXTd0DfI,http://player.vimeo.com/external/129669283.mobile.mp4?s=5fe075e71719b42cfc36f67b118a9e19,http://player.vimeo.com/external/129669283.sd.mp4?s=709197ba49b0f4d924c6a95d9fd80852,http://player.vimeo.com/external/129669283.hd.mp4?s=041ac74ba08aec62e8943cdaa6273b49",
"http://www.youtube.com/watch?v=0pRnUPaIesQ,http://player.vimeo.com/external/129669284.mobile.mp4?s=91a0fe51ff234800f740a8f0df704f86,http://player.vimeo.com/external/129669284.sd.mp4?s=4c8d2e93cab17a02676f9d107ccf03a7,http://player.vimeo.com/external/129669284.hd.mp4?s=5fd5f7d52570ef419ac3c5baf5878b7c",
"http://www.youtube.com/watch?v=S6P6JNDfbRE,http://player.vimeo.com/external/130102374.mobile.mp4?s=dfe5057f497bb8f3dbf0d64a67bf45d1,http://player.vimeo.com/external/130102374.sd.mp4?s=de7125f7bd4f1a0dd59a589a9524a590,http://player.vimeo.com/external/130102374.hd.mp4?s=fcb7680f87cf1777b129085890163b91",
"http://www.youtube.com/watch?v=b_rUa26HSDk,http://player.vimeo.com/external/129669287.mobile.mp4?s=5f5e9dc074d733f471bf1759b2fd7d6d,http://player.vimeo.com/external/129669287.sd.mp4?s=12a321b15d408c3da395675f5fbfdb02,http://player.vimeo.com/external/129669287.hd.mp4?s=5f563bdcba33a0fbb053853d13f8dd30",
"http://www.youtube.com/watch?v=uawQ84q7Fl0,http://player.vimeo.com/external/129669812.mobile.mp4?s=e5c6fc49081ed17eb363d41c94c4b6a5,http://player.vimeo.com/external/129669812.sd.mp4?s=1d7fb4d35960cfd0771bdeda82ac723e,http://player.vimeo.com/external/129669812.hd.mp4?s=0ebaa742f4d74ea6b84f6d641dae5dda",
"http://www.youtube.com/watch?v=mW0O0KIfsxs,http://player.vimeo.com/external/131341123.mobile.mp4?s=b9176169dddc24ef95601f9d95e16710,http://player.vimeo.com/external/131341123.sd.mp4?s=640c68f6ae913dc1b2e08cac6e75e19f,http://player.vimeo.com/external/131341123.hd.mp4?s=d9f3cac89e0d8570cbda1d67217bbfd9"

]

};

var AJHAVideoInfo = VIDEOS.E;
