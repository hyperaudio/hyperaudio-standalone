var SEARCH = '/AJE/PalestineRemix/transcripts/';
var TRANSCRIPTS = '/AJE/PalestineRemix/transcripts/html/';
// var TRANSCRIPTS = 'http://interactive.aljazeera.com/AJE/PalestineRemix/transcripts/html/';

var FILMS = [
  { "_id": 1,
    "label": "قرى تتحدى الجدار"
  },
  { "_id": 17,
    "label": "1 النكـبة"
  },
  { "_id": 18,
    "label": "النكبة 2"
  },
  { "_id": 19,
    "label": "النكبة 3"
  },
  { "_id": 20,
    "label": "النكبة 4"
  },
  { "_id": 2,
    "label": "مناطق جيم"
  },
  { "_id": 3,
    "label": "خارج الأسوار"
  },
  { "_id": 25,
    "label": "ولدن في النكبة"
  },
  { "_id": 21,
    "label": "منسيون خارج الوطن"
  },
  { "_id": 4,
    "label": "الحج المحرم"
  },
  { "_id": 5,
    "label": "حياة بالجدول"
  },
  { "_id": 6,
    "label": "غزة تعيش"
  },
  { "_id": 7,
    "label": "غزة إننا قادمون"
  },
  { "_id": 0,
    "label": "ضد التيار"
  },
  { "_id": 16,
    "label": "معركة الأمعاء الخاوية"
  },
  { "_id": 8,
    "label": "الشاباك"
  },
   { "_id": 26,
    "label": "اهدم بيتك بيدك"
  },
  { "_id": 9,
    "label": "الاقتلاع من الغور"
  },
  { "_id": 10,
    "label": "اغتيال المدينة"
  },
  { "_id": 11,
    "label": "فلسطين في قلوب إيطالية"
  },
  { "_id": 27,
    "label": "مقطع الأوصال"
  },
  { "_id": 22,
    "label": "فسيفساء"
  },
  { "_id": 23,
    "label": "1 حكايات من انتفاضة الحجارة"
  },
  { "_id": 24,
    "label": "2 حكايات من انتفاضة الحجارة"
  },
  { "_id": 13,
    "label": "أقوى من الكلام"
  },
  { "_id": 12,
    "label": "المستنقع"
  },
  { "_id": 14,
    "label": "ثمن أوسلو 1"
  },
  { "_id": 15,
    "label": "ثمن أوسلو 2"
  },

  { "_id": 25,
    "label": "ولدن في النكبة"
  },
  { "_id": 21,
    "label": "فسيفساء"
  },
  { "_id": 26,
    "label": "اهدم بيتك بيدك"
  },
  { "_id": 27,
    "label": "مقطع الأوصال"
  },
  { "_id": 22,
    "label": "فسيفساء"
  },
  { "_id": 23,
    "label": "حكايات من انتفاضة الحجارة الجزء الأول"
  },
  { "_id": 24,
    "label": "حكايات من انتفاضة الحجارة الجزء الثاني"
  }




];


var VIDEOS = {

	A:
[
"http://www.youtube.com/watch?v=Sl-l0-uFgJ0,http://player.vimeo.com/external/109676100.mobile.mp4?s=492c39a5d904a9f1f188b0a5bf3e6b08,http://player.vimeo.com/external/109676100.sd.mp4?s=029535cf6fa8612288eea88121f3f83e,http://player.vimeo.com/external/109676100.hd.mp4?s=5f80e6a80c367b54273be5918a0eca3a",
"http://www.youtube.com/watch?v=jATIsS9_swo,http://player.vimeo.com/external/109676098.mobile.mp4?s=a8ae7830fd73d9b89c849b10795773b1,http://player.vimeo.com/external/109676098.sd.mp4?s=a02df6b7dd402410d4c43a8168bc95be,http://player.vimeo.com/external/109676098.hd.mp4?s=964705a807ec00da4b169ad1804a7222",
"http://www.youtube.com/watch?v=LaBwaCDPm4w,http://player.vimeo.com/external/110884058.mobile.mp4?s=85abff8effebb6906bf2105cee2590c0,http://player.vimeo.com/external/110884058.sd.mp4?s=fc54f6f60379056f9a403ae8ea9b55d1,http://player.vimeo.com/external/110884058.hd.mp4?s=bd53b55a2058f5165c9f903cfe5f45dc",
"http://www.youtube.com/watch?v=WaLBB2kPkDw,http://player.vimeo.com/external/109676101.mobile.mp4?s=d236c110092448b2d74b8f21aa10ab75,http://player.vimeo.com/external/109676101.sd.mp4?s=888993aec8141fa73bda9d427fdef4b2,http://player.vimeo.com/external/109676101.hd.mp4?s=697c8c466ff15b6e5c06c4ff153c9dcc",
"http://www.youtube.com/watch?v=ZulMDK5qhBo,http://player.vimeo.com/external/110699967.mobile.mp4?s=fa132ac220e0390d3172e4a847666dc7,http://player.vimeo.com/external/110699967.sd.mp4?s=214d159d86cb99108bf282888ad9ec62,http://player.vimeo.com/external/110699967.hd.mp4?s=a10fe4f950e8a0261518bfdf77af6f11",
"http://www.youtube.com/watch?v=jrVGbkkBiHM,http://player.vimeo.com/external/109676099.mobile.mp4?s=11f9aa793c9fa1315ecb2bdf2ddd8f48,http://player.vimeo.com/external/109676099.sd.mp4?s=f0a06547303478e5279dede658b41122,http://player.vimeo.com/external/109676099.hd.mp4?s=a09896b6f559a678ac5dda92ae1e582c",
"http://www.youtube.com/watch?v=bcHnaujEvU0,http://player.vimeo.com/external/110699968.mobile.mp4?s=1b6e79fefc235db74268b30374de5108,http://player.vimeo.com/external/110699968.sd.mp4?s=231462e6c3ffc1b76bb6de304581bfd9,http://player.vimeo.com/external/110699968.hd.mp4?s=ee9b223b2b368421ea0ca2019091b5f6",
"http://www.youtube.com/watch?v=pAjBpvZaSOI,http://player.vimeo.com/external/110699970.mobile.mp4?s=0b37dfea3ac28c6b945eb27b69c50dd3,http://player.vimeo.com/external/110699970.sd.mp4?s=f73e51fedb4d4f326d2d3d2d700a3a91,http://player.vimeo.com/external/110699970.hd.mp4?s=4fd5c49f8cfc94e949189fdec2f5536a",
"http://www.youtube.com/watch?v=u-TVbo9duz0,http://player.vimeo.com/external/110888354.mobile.mp4?s=1484bc5d663a38c704a1150ad3481f97,http://player.vimeo.com/external/110888354.sd.mp4?s=9636f7ac373bb0bd2aabc38d66637c37,http://player.vimeo.com/external/110888354.hd.mp4?s=9f7743e694295bbd297ca81615d323bd",
"http://www.youtube.com/watch?v=bgmoxds_p94,http://player.vimeo.com/external/110889320.mobile.mp4?s=d5b8d0b2c217434904d720e30ba40583,http://player.vimeo.com/external/110889320.sd.mp4?s=2d036ecac58e54623a8f92bc4e004ed2,http://player.vimeo.com/external/110889320.hd.mp4?s=d9dc0b2118485945ffc7383691ecb47d",
"http://www.youtube.com/watch?v=8n6E6GKEz00,http://player.vimeo.com/external/111081706.mobile.mp4?s=326f72b5e0d728dd1e6b14a3039dc4ab,http://player.vimeo.com/external/111081706.sd.mp4?s=be4dff92f408eff4f7672384ebae9abd,http://player.vimeo.com/external/111081706.hd.mp4?s=fe0ecbf8b45c0602ed5cdf942a486b2f",
"http://www.youtube.com/watch?v=dpPpT-KddoI,http://player.vimeo.com/external/111081707.mobile.mp4?s=887fe973f974587ff606187622e72263,http://player.vimeo.com/external/111081707.sd.mp4?s=4864c5f5aeefe21d89b9eb85ffd6b44a,http://player.vimeo.com/external/111081707.hd.mp4?s=49930c5c08c2899aa8e5dfc9e0a76c31",
"http://www.youtube.com/watch?v=KJSbg00EJNY,http://player.vimeo.com/external/110699971.mobile.mp4?s=7108692f89d1d08dd252be1165a23dea,http://player.vimeo.com/external/110699971.sd.mp4?s=d0812a07fe855ca23db7db2d7b08f68b,http://player.vimeo.com/external/110699971.hd.mp4?s=3d9fdcf5b5ae9688f20ca6e215454057",
"http://www.youtube.com/watch?v=KJSbg00EJNY,http://player.vimeo.com/external/111081708.mobile.mp4?s=4a154f32203e8094783d0a02efb2d683,http://player.vimeo.com/external/111081708.sd.mp4?s=9f5a802e7cda924e5a937034feafd1dc,http://player.vimeo.com/external/111081708.hd.mp4?s=6bf5cd6eb2d18779296d2fd85ae1bc85",
"http://www.youtube.com/watch?v=fstR_9s2sKI,http://player.vimeo.com/external/110904619.mobile.mp4?s=eb8b36729062e3341ca879c40d734312,http://player.vimeo.com/external/110904619.sd.mp4?s=64ce6472dae88e2fba51137a600a8838,http://player.vimeo.com/external/110904619.hd.mp4?s=8fe1322568109750101de61e6bc6f1a7",
"http://www.youtube.com/watch?v=B2emYLb13yg,http://player.vimeo.com/external/110904620.mobile.mp4?s=d898e9e0507a91436049b3a4291af84e,http://player.vimeo.com/external/110904620.sd.mp4?s=556723fffead865378872d4c676b116f,http://player.vimeo.com/external/110904620.hd.mp4?s=7cc272bcaceb87cf1f6b6c2c360d5390",
"http://www.youtube.com/watch?v=K293aqf4LKk,http://player.vimeo.com/external/110699973.mobile.mp4?s=d21883931cf4794c05d008a454254c29,http://player.vimeo.com/external/110699973.sd.mp4?s=b66c0a0e7f808434131468bbff60a77e,http://player.vimeo.com/external/110699973.hd.mp4?s=92f4e3d1a1b97ab07613df4c51e49ed3",
"http://www.youtube.com/watch?v=rFYmRX7A_Fc,http://player.vimeo.com/external/111081702.mobile.mp4?s=abfb0e5e03306403415e9acd3d2418ce,http://player.vimeo.com/external/111081702.sd.mp4?s=186077c154c7ff6fe50c8df131ab106d,http://player.vimeo.com/external/111081702.hd.mp4?s=1cf17720bcb1274cd8a4e2cb85f1af8c",
"http://www.youtube.com/watch?v=WuBKtzi2Cos,http://player.vimeo.com/external/111081701.mobile.mp4?s=8c765af7431e158f6ddba499943121d5,http://player.vimeo.com/external/111081701.sd.mp4?s=138fc50b8572993c6a42754c72690c9f,http://player.vimeo.com/external/111081701.hd.mp4?s=a12b63ca215bc1b2f03a39db7f1f8dc5",
"http://www.youtube.com/watch?v=z4w43Ynv1qM,http://player.vimeo.com/external/111081703.mobile.mp4?s=599f101ec177a4e078da44dbdc8cbfe5,http://player.vimeo.com/external/111081703.sd.mp4?s=a81a2929cbfb1d9d52145911225c7fd1,http://player.vimeo.com/external/111081703.hd.mp4?s=921d9fc2812bad401c8662ffa95ab3e8",
"http://www.youtube.com/watch?v=9sMQFrPnYfg,http://player.vimeo.com/external/111081704.mobile.mp4?s=d2be573c85d6169343bc18eff02e85b4,http://player.vimeo.com/external/111081704.sd.mp4?s=0ac5c3ffb44169d6f8e198914ab7b519,http://player.vimeo.com/external/111081704.hd.mp4?s=594fc0668efe5f5ff086191584719c07",
"http://www.youtube.com/watch?v=9DhiGASOCX8,http://player.vimeo.com/external/129860381.mobile.mp4?s=fac9f1b5c9c642c0a964e5cf36535f2e,http://player.vimeo.com/external/129860381.sd.mp4?s=5e2271dcc3e84086da93dc78cf45d82b,http://player.vimeo.com/external/129860381.hd.mp4?s=f98be818d46addbd78a9d99d747ef1cf",
"http://www.youtube.com/watch?v=L7Mf3vM9JFM,http://player.vimeo.com/external/129860383.mobile.mp4?s=a7712f6daa580cfcc4800b964d7a32fd,http://player.vimeo.com/external/129860383.sd.mp4?s=76cb7745f8a2d9ab7344bced26bb56b2,http://player.vimeo.com/external/129860383.hd.mp4?s=909a718a397dbaf861ea6fa6d9a85b06",
"http://www.youtube.com/watch?v=tVRfYZqKsLc,http://player.vimeo.com/external/129860384.mobile.mp4?s=ff86e42222ab9d3fb4b175ac0ed73183,http://player.vimeo.com/external/129860384.sd.mp4?s=1b2fe6ae662d2634853b7703063b4c2b,http://player.vimeo.com/external/129860384.hd.mp4?s=3a97e4faac5d89cb2bc4ea48788d1d59",
"http://www.youtube.com/watch?v=6iJf35lzB8o,http://player.vimeo.com/external/129860385.mobile.mp4?s=871e9e5969386d6aaa9c89b4fae1e0aa,http://player.vimeo.com/external/129860385.sd.mp4?s=18dadf8561579a68e5bcb0c42eafcd0a,http://player.vimeo.com/external/129860385.hd.mp4?s=d00d653a9c2089b8fa2bd623ad98d239",
"http://www.youtube.com/watch?v=kSlQe7C1QSo,http://player.vimeo.com/external/129774128.mobile.mp4?s=b0dc890f5b7e85080717f5ff8ea87851,http://player.vimeo.com/external/129774128.sd.mp4?s=331bbf7dd850bac6386a2fed0034797c,http://player.vimeo.com/external/129774128.hd.mp4?s=19e017129160af5226b125ca1a2e07fb",
"http://www.youtube.com/watch?v=3fHR9QYZVyE,http://player.vimeo.com/external/129860388.mobile.mp4?s=1d96fa13edd6f034e1b4dad0550dfb6e,http://player.vimeo.com/external/129860388.sd.mp4?s=c10e516b4f51d586b17cffa7e1b7e9f6,http://player.vimeo.com/external/129860388.hd.mp4?s=ea72fff02c021854b657354d58ec09ad",
"http://www.youtube.com/watch?v=FmkEyFMj4hs,http://player.vimeo.com/external/129860404.mobile.mp4?s=83a81d774e6b3e9a37573c996b48501e,http://player.vimeo.com/external/129860404.sd.mp4?s=3e55c9262310935374cfe311b9202aa1,http://player.vimeo.com/external/129860404.hd.mp4?s=c707eb5b68edf206f444270d6f8e73b2"
]


};

var AJHAVideoInfo = VIDEOS.A;
