var SEARCH = '/AJE/PalestineRemix/transcripts/';
var TRANSCRIPTS = '/AJE/PalestineRemix/transcripts/html/';
// var TRANSCRIPTS = 'http://interactive.aljazeera.com/AJE/PalestineRemix/transcripts/html/';

var FILMS = [

  { "_id": 1,
    "label": "DUVARA KARŞI",
    "file": "against-the-wall"
  },


  { "_id": 17,
    "label": "BÜYÜK FELAKET 1",
    "file": "al-nakba"
  },
  { "_id": 18,
    "label": "BÜYÜK FELAKET 2",
    "file": "al-nakba"
  },
  { "_id": 19,
    "label": "BÜYÜK FELAKET 3",
    "file": "al-nakba"
  },
  { "_id": 20,
    "label": "BÜYÜK FELAKET 4",
    "file": "al-nakba"
  },



  { "_id": 2,
    "label": "C BÖLGESİ",
    "file": "area-c"
  },
  { "_id": 3,
    "label": "AÇIK CEZAEVİ",
    "file": "beyond-the-walls"
  },
  { "_id": 4,
    "label": "YASAKLAR ÜLKESİ İSRAİL",
    "file": "forbidden-pilgrimage"
  },
  { "_id": 5,
    "label": "GAZZE'Yİ KARARTMA",
    "file": "gaza-left-in-the-dark"
  },
  { "_id": 6,
    "label": "GAZZE YENİDEN",
    "file": "gaza-lives-on"
  },
  { "_id": 7,
    "label": "BEKLE BİZİ GAZZE",
    "file": "gaza-we-are-coming"
  },
  { "_id": 0,
    "label": "İSRAİLLİ RADİKAL GİDEON LEVİ",
    "file": "going-against-the-grain"
  },
  { "_id": 16,
    "label": "ÖLÜMÜNE DİRENİŞ",
    "file": "hunger-strike"
  },
  { "_id": 8,
    "label": "GÖLGE TEŞKİLAT ŞİN BET",
    "file": "inside-shin-bet"
  },
  { "_id": 9,
    "label": "DİRENEN TOPRAKLAR",
    "file": "last-shepherds-of-the-valley"
  },
  { "_id": 10,
    "label": "YİTİK ŞEHİRLER",
    "file": "lost-cities-of-palestine"
  },
  { "_id": 11,
    "label": "FİLİSTİN AŞKINA",
    "file": "palestina-amore"
  },
  { "_id": 13,
    "label": "GAZZE: SAĞIR DÜNYA",
    "file": "stronger-than-words"
  },
  { "_id": 12,
    "label": "İŞGALİN ASKERLERİ",
    "file": "the-pain-inside"
  },
  { "_id": 14,
    "label": "OSLO'NUN BEDELİ 1",
    "file": "the-price-of-oslo"
  },
  { "_id": 15,
    "label": "OSLO'NUN BEDELİ 2",
    "file": "the-price-of-oslo"
  },

{_id: 21	, label: "SÜRGÜN EDİLENLER"},
{_id: 22	, label: "FAS'A DÖNÜŞ"},
{_id: 23	, label: "İNTİFADA HİKAYELERİ - 1"},
{_id: 24	, label: "İNTİFADA HİKAYELERİ - 2"},
{_id: 25	, label: "48'LİLER"},
{_id: 26	, label: "KUDÜS: KENDİ EVİNİ YIKMAK"},
{_id: 27	, label: "PARÇALANAN FİLİSTİN"}



];


var VIDEOS = {


	T: //FIXME missing YT

[
",http://player.vimeo.com/external/111083252.mobile.mp4?s=068306ae251439da7c89f4357201262b,http://player.vimeo.com/external/111083252.sd.mp4?s=ef8145cd5177339b7e388361a8a88de4,http://player.vimeo.com/external/111083252.hd.mp4?s=60ff643386853279de65ab6b085cbac5",
",http://player.vimeo.com/external/111082111.mobile.mp4?s=887ad7d2212f885c3085a01735c0064a,http://player.vimeo.com/external/111082111.sd.mp4?s=8948803a49e72fd9833a0f6f4094f510,http://player.vimeo.com/external/111082111.hd.mp4?s=8122f1b9c36cced7fdc539042674af27",
",http://player.vimeo.com/external/111083104.mobile.mp4?s=e116b75dcb2e888b66c4734170680d6d,http://player.vimeo.com/external/111083104.sd.mp4?s=4c9acb44edb3d359c73317c3e29bd846,http://player.vimeo.com/external/111083104.hd.mp4?s=6e4b436b9c19714090a04f5620123d7e",
",http://player.vimeo.com/external/111083105.mobile.mp4?s=bfda90eda13a7e051d8c32b9bf75fb7f,http://player.vimeo.com/external/111083105.sd.mp4?s=4110f95fe028a7b7ecd5267ddbc1d56a,http://player.vimeo.com/external/111083105.hd.mp4?s=53975b7b89bbb5768d0cd3a686b919d3",
",http://player.vimeo.com/external/111083107.mobile.mp4?s=d228f0d3f7dfab42303c79dc1e9e06c7,http://player.vimeo.com/external/111083107.sd.mp4?s=dd254b44117ba9433c22256e66291be6,http://player.vimeo.com/external/111083107.hd.mp4?s=7a23aa93043fb1da62b084f100105c27",
",http://player.vimeo.com/external/111083109.mobile.mp4?s=d3cc062ec558fec80a0f30317a24e0e6,http://player.vimeo.com/external/111083109.sd.mp4?s=2a31038e3e0068bcc123a28a57882036,http://player.vimeo.com/external/111083109.hd.mp4?s=602b681f546f27ca741e89e163c26112",
",http://player.vimeo.com/external/111083110.mobile.mp4?s=417477821b120ea0a5d07df690c23bd3,http://player.vimeo.com/external/111083110.sd.mp4?s=11304054bdd63088dd14867eba74083a,http://player.vimeo.com/external/111083110.hd.mp4?s=a8afa539e728956a2410094f2e9ce3be",
",http://player.vimeo.com/external/111083251.mobile.mp4?s=8fd69dfba890276b21a9507046b73925,http://player.vimeo.com/external/111083251.sd.mp4?s=70acc6b16a6a58d317bb54ab7dca4bbd,http://player.vimeo.com/external/111083251.hd.mp4?s=8d12992e5b7228cc498414421629b4e4",
",http://player.vimeo.com/external/111083254.mobile.mp4?s=e4e5d287e7638e5f6b954dbcee392c16,http://player.vimeo.com/external/111083254.sd.mp4?s=db2a3dca722a838f70693a429eb91860,http://player.vimeo.com/external/111083254.hd.mp4?s=13bfe75c37de98e5caae29ab1e506a22",
",http://player.vimeo.com/external/111083652.mobile.mp4?s=f6845d3ef36d19823abbffa536f28fc4,http://player.vimeo.com/external/111083652.sd.mp4?s=89217d8313aaabe923109999f1e1cdd8,http://player.vimeo.com/external/111083652.hd.mp4?s=0d2b69c18d46775dd8b5545b5c9977eb",
",http://player.vimeo.com/external/111083255.mobile.mp4?s=de515cde8bcab44a219db85002793276,http://player.vimeo.com/external/111083255.sd.mp4?s=49a2849cab5e4796753fbaa011ac4fb9,http://player.vimeo.com/external/111083255.hd.mp4?s=b0b9195d02fe005f40b78d914ebc0053",
",http://player.vimeo.com/external/111083650.mobile.mp4?s=58c2a468df15a3d4ae3a25834bebdc50,http://player.vimeo.com/external/111083650.sd.mp4?s=cb8afd7a15cb7577c191ec6dcc2fe7fe,http://player.vimeo.com/external/111083650.hd.mp4?s=497d438a67163087240dd989e01a84bd",
",http://player.vimeo.com/external/111083653.mobile.mp4?s=c532eeb5ce6a486a599b3aade16d9a23,http://player.vimeo.com/external/111083653.sd.mp4?s=291be106a323dc0cee20db1027b6a06e,http://player.vimeo.com/external/111083653.hd.mp4?s=497c9ec24cdff8b58988732bf7a3771a",
",http://player.vimeo.com/external/111083651.mobile.mp4?s=47718864a9296ce7d09e191bd16e93ff,http://player.vimeo.com/external/111083651.sd.mp4?s=77a13b6f2a28f24fb5d00cff6bb0c7e3,http://player.vimeo.com/external/111083651.hd.mp4?s=9287a0b51631ae371683f1070d73bb68",
",http://player.vimeo.com/external/111083654.mobile.mp4?s=30bbcaf92066ec1a6c98d588be628efd,http://player.vimeo.com/external/111083654.sd.mp4?s=0eac0eada2aad73f3a50e04c27129107,http://player.vimeo.com/external/111083654.hd.mp4?s=791dc19f2b1fdbdcd0895a689b57fd9e",
",http://player.vimeo.com/external/111083859.mobile.mp4?s=7d3828d5993055e04ae8672880a0f860,http://player.vimeo.com/external/111083859.sd.mp4?s=a98d216f82d15de4f51057446452921b,http://player.vimeo.com/external/111083859.hd.mp4?s=1fd0b5a63c08bc24d51d17faa63a47fe",
",http://player.vimeo.com/external/111083253.mobile.mp4?s=6730431f485f5894e85246eb2d23986e,http://player.vimeo.com/external/111083253.sd.mp4?s=57cc6c135bc74283f87a0aef22dffa56,http://player.vimeo.com/external/111083253.hd.mp4?s=a567c3026da16f0fb62da85e8de94bd8",
",http://player.vimeo.com/external/111082112.mobile.mp4?s=fe568a7fdcaab2a796b91677d10e3fe5,http://player.vimeo.com/external/111082112.sd.mp4?s=4407a888a8cabbc22e87e90d5da8df0d,http://player.vimeo.com/external/111082112.hd.mp4?s=8f778146b7841c1297ea8273efaa04aa",
",http://player.vimeo.com/external/111082113.mobile.mp4?s=8ce40da5ce80fe11697df30760814274,http://player.vimeo.com/external/111082113.sd.mp4?s=52870684bbca940f90587e594aa117a0,http://player.vimeo.com/external/111082113.hd.mp4?s=f3a79ed0a3152b2f1e9eed2a401fb258",
",http://player.vimeo.com/external/111082114.mobile.mp4?s=a77d42d69a3c08aa2c0057b88e14ad03,http://player.vimeo.com/external/111082114.sd.mp4?s=9beffb472a185c2f28d35fe348d18675,http://player.vimeo.com/external/111082114.hd.mp4?s=20a32523399c4b27f42cf20c78b7e4b4",
",http://player.vimeo.com/external/111082115.mobile.mp4?s=6968575c01e314d6d5348b4f0c2133fc,http://player.vimeo.com/external/111082115.sd.mp4?s=29d62b699e7f3ddbda77d56b4ce2878e,http://player.vimeo.com/external/111082115.hd.mp4?s=8d5c58a21270e200dc661d42834863fb",

// new
//
"https://youtu.be/hxQYPUnrOyI,https://player.vimeo.com/external/142108848.mobile.mp4?s=fc518d0cc85e5f3abd549fa0d557f507&profile_id=116,https://player.vimeo.com/external/142108848.sd.mp4?s=cdec2011c88fff0949e658e1e2f926a7&profile_id=112,https://player.vimeo.com/external/142108848.hd.mp4?s=a94041da0de4b0aca91146820a9af7b4&profile_id=113",
"https://youtu.be/1RL5JUaS5RY,https://player.vimeo.com/external/142108849.mobile.mp4?s=09ed7afbdc522f5ff845a215c717f490&profile_id=116,https://player.vimeo.com/external/142108849.sd.mp4?s=0e05c9160371b50c0328dd0eb8a20e95&profile_id=112,https://player.vimeo.com/external/142108849.hd.mp4?s=2f4646f17b8f69364669d69de4f918e8&profile_id=113",
"https://youtu.be/avaJjJvXElY,https://player.vimeo.com/external/142108847.mobile.mp4?s=4b8bdf25a9db0ee92ec4d409f07c4a59&profile_id=116,https://player.vimeo.com/external/142108847.sd.mp4?s=0100608d3d338ae29df2860a3fcd917e&profile_id=112,https://player.vimeo.com/external/142108847.hd.mp4?s=9c0adb96b1b456ac127e54478315c35a&profile_id=113",
"https://youtu.be/_XWsOJvSJmc,https://player.vimeo.com/external/142108846.mobile.mp4?s=6fc024c14104b051f1ecbe35ef9cd8ec&profile_id=116,https://player.vimeo.com/external/142108846.sd.mp4?s=a2b0cfe1b297745cfd14a29f5a511814&profile_id=112,https://player.vimeo.com/external/142108846.hd.mp4?s=9305ffe4ca8cacafb55b2fefaa080fd6&profile_id=113",
"https://youtu.be/D20LaX59CEc,https://player.vimeo.com/external/142480739.mobile.mp4?s=30d4afd2163600c5f110242c6e381247&profile_id=116,https://player.vimeo.com/external/142480739.sd.mp4?s=279744fada390b84a889bf555ac03117&profile_id=112,https://player.vimeo.com/external/142480739.hd.mp4?s=c9b5b6d280c854002d71bdf1c7191aed&profile_id=113",
"https://youtu.be/zjUBd2rl8ws,https://player.vimeo.com/external/142397473.mobile.mp4?s=1b0c70d604c385cafeadd30924f2626a&profile_id=116,https://player.vimeo.com/external/142397473.sd.mp4?s=eb1978b3b964dab165e235d9a62cb599&profile_id=112,https://player.vimeo.com/external/142397473.hd.mp4?s=8e6a81872e38db9c5eb4c59efa7f1430&profile_id=113",
"https://youtu.be/utnthHPdk94,https://player.vimeo.com/external/142480740.mobile.mp4?s=d597c9d8b78d1287cc8e8fc0acb5044e&profile_id=116,https://player.vimeo.com/external/142480740.sd.mp4?s=3109d866b70575543943f482458a85ae&profile_id=112,https://player.vimeo.com/external/142480740.hd.mp4?s=af75712cf0bcfaff5dab48bfd066127f&profile_id=113"
]

};

var AJHAVideoInfo = VIDEOS.T;
