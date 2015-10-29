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

	B: //FIXME missing YT

[
",http://player.vimeo.com/external/110058518.mobile.mp4?s=98e86d0e453a922ac0faaaa763e93eb0,http://player.vimeo.com/external/110058518.sd.mp4?s=1d904d374903533bd2df0c91d0231edd,http://player.vimeo.com/external/110058518.hd.mp4?s=063ac708ae67f9e13d8ab07b66c3b812",
",http://player.vimeo.com/external/110446986.mobile.mp4?s=9f35cdecea4ee5b977454efba01b502f,http://player.vimeo.com/external/110446986.sd.mp4?s=38ebb19fce8801707f6bc4df6ade7eae,http://player.vimeo.com/external/110446986.hd.mp4?s=8b67b196fac0e8c1e0e4f7a1af906940",
",http://player.vimeo.com/external/110118914.mobile.mp4?s=360e42ccbc686d99ac1e58ef724dd138,http://player.vimeo.com/external/110118914.sd.mp4?s=7a7c38657d0f1ec2df584f95afef19f1,http://player.vimeo.com/external/110118914.hd.mp4?s=013506a17bfb7e38616e691fb365907a",
",http://player.vimeo.com/external/110063882.mobile.mp4?s=b7eb90d5a867158fedb893c2b9e63b37,http://player.vimeo.com/external/110063882.sd.mp4?s=56864bccf69973b994652882dacc31d0,http://player.vimeo.com/external/110063882.hd.mp4?s=e2682e62920295b45189ca213cb0e78e",
",http://player.vimeo.com/external/110118916.mobile.mp4?s=93b57b70458f775a3ec041075fbcd4af,http://player.vimeo.com/external/110118916.sd.mp4?s=294bd01fb0d0121960235c7e6a8038ed,http://player.vimeo.com/external/110118916.hd.mp4?s=5161c4e374bb532d1600174e73473ef0",
",http://player.vimeo.com/external/110341754.mobile.mp4?s=f34bde52bbb9736b596e5a42d5d2006c,http://player.vimeo.com/external/110341754.sd.mp4?s=682e1082d81753b49ec38408c7d1b4ca,http://player.vimeo.com/external/110341754.hd.mp4?s=510d3a3ebb5a912eb38d011b0da78b9d",
",http://player.vimeo.com/external/110118915.mobile.mp4?s=aa0b1f12d1a044a770309f0231e991c8,http://player.vimeo.com/external/110118915.sd.mp4?s=ca41675db8878d9114f4ffd61dc3a9d4,http://player.vimeo.com/external/110118915.hd.mp4?s=fe56f57ca8377c58a0f2a65373495355",
",http://player.vimeo.com/external/110128583.mobile.mp4?s=5a00583ddd3476112ba1b3219ede9836,http://player.vimeo.com/external/110128583.sd.mp4?s=20376362c753eb4496c730a63bdcc1f9,http://player.vimeo.com/external/110128583.hd.mp4?s=f82420424045568dae012fd388c9d2af",
",http://player.vimeo.com/external/110128582.mobile.mp4?s=dfbba0758dda28d2d6239fe2bfb8dcc6,http://player.vimeo.com/external/110128582.sd.mp4?s=dde4738ccb1f81cb6810a226ca6792c3,http://player.vimeo.com/external/110128582.hd.mp4?s=51410b0d80d53f800e41d80e15c15e89",
",http://player.vimeo.com/external/110125298.mobile.mp4?s=6fdd631cb44786c0da5704b7c2c58407,http://player.vimeo.com/external/110125298.sd.mp4?s=ff9439c504600144109eff533e553d8f,http://player.vimeo.com/external/110125298.hd.mp4?s=4c18b4c2105d66d6a98069b05f1733da",
",http://player.vimeo.com/external/110129858.mobile.mp4?s=50c17875b5fe867b10c2141d06e03c0a,http://player.vimeo.com/external/110129858.sd.mp4?s=57f086b75af4c64acddf116a1cfa9bcd,http://player.vimeo.com/external/110129858.hd.mp4?s=ee7e23206ae13704da69f8ea0b172bd4",
",http://player.vimeo.com/external/110129860.mobile.mp4?s=656f7cfd9554b80d1551084092a62ca2,http://player.vimeo.com/external/110129860.sd.mp4?s=6ef1853f9f890b99de66650a93914a5d,http://player.vimeo.com/external/110129860.hd.mp4?s=ea098fc168b3f9882f9917581669d35b",
",http://player.vimeo.com/external/110128581.mobile.mp4?s=d188b22f717e3a4fc1fb711dd554e39e,http://player.vimeo.com/external/110128581.sd.mp4?s=b757ba20552b5a7068ccabb514a9bfa2,http://player.vimeo.com/external/110128581.hd.mp4?s=6b48fa2be09fe90aed9212f4d1f52705",
",http://player.vimeo.com/external/110134174.mobile.mp4?s=0e8690b5b6682a99e0d310e318c5a246,http://player.vimeo.com/external/110134174.sd.mp4?s=bb85682f2e228c154d80002d209ff8f5,http://player.vimeo.com/external/110134174.hd.mp4?s=565f3daff51d71002141c61f06636437",
",http://player.vimeo.com/external/110125299.mobile.mp4?s=e6eaad266f5f989d34bc666a81d8f58d,http://player.vimeo.com/external/110125299.sd.mp4?s=8864da41b1ea27038a758b03c6d3af09,http://player.vimeo.com/external/110125299.hd.mp4?s=77638bc63497e50a376b02264722d5d9",
",http://player.vimeo.com/external/110128580.mobile.mp4?s=0e84a5982ae709daae97a674ce5f9963,http://player.vimeo.com/external/110128580.sd.mp4?s=3afbf306fcbfea47d6f704cdcc7e0252,http://player.vimeo.com/external/110128580.hd.mp4?s=0b2f0a61204844bd72b012c6b653bbe7",
",http://player.vimeo.com/external/110134175.mobile.mp4?s=308aecb77e730087b31679a9af86acd3,http://player.vimeo.com/external/110134175.sd.mp4?s=c1d6ee06f1e4f168fac24ab83f726715,http://player.vimeo.com/external/110134175.hd.mp4?s=19c8fd2379499e9f205edca55abb1cc0",
"http://www.youtube.com/watch?v=ib-GtISH7Q4,http://player.vimeo.com/external/110118917.mobile.mp4?s=c2fe2ff23f745c9b0939aad8013a2f84,http://player.vimeo.com/external/110118917.sd.mp4?s=f31746a901157007d4c1bf19292e54cd,http://player.vimeo.com/external/110118917.hd.mp4?s=dc61474cb5c2eff8d90c7f5752a98820",
"http://www.youtube.com/watch?v=JUamg_1D24Q,http://player.vimeo.com/external/110118918.mobile.mp4?s=0cdd3997e96eeca19f002056b414e460,http://player.vimeo.com/external/110118918.sd.mp4?s=29ffdb9d65e8ad65a809d721298fe30a,http://player.vimeo.com/external/110118918.hd.mp4?s=2e7250aea7e5b4786c4b4586bfab75d6",
"http://www.youtube.com/watch?v=ckUAzoK4Tnw,http://player.vimeo.com/external/110121998.mobile.mp4?s=42948c983badf380e5e06029093cb629,http://player.vimeo.com/external/110121998.sd.mp4?s=af9742b63e65bd26ca9035bf680af726,http://player.vimeo.com/external/110121998.hd.mp4?s=5144a500c0d0a995b530c9efe158024b",
",http://player.vimeo.com/external/110121999.mobile.mp4?s=6e0952b3840090ccffd4319dc05f5d56,http://player.vimeo.com/external/110121999.sd.mp4?s=40b3b4273361a1450ebe70e0dbcecc74,http://player.vimeo.com/external/110121999.hd.mp4?s=6d22706046eda0e76c00e4390ab47993",

// new

",https://player.vimeo.com/external/142124823.mobile.mp4?s=06406311f463e22ef8ef7ae9afe25d57&profile_id=116,https://player.vimeo.com/external/142124823.sd.mp4?s=22e255f93d353efae62552eac07ae679&profile_id=112,https://player.vimeo.com/external/142124823.hd.mp4?s=53e9a441029a84779dd1b0ee26c24669&profile_id=113",
",https://player.vimeo.com/external/142124821.mobile.mp4?s=64f9d26a081d5c58cb2617e36863d981&profile_id=116,https://player.vimeo.com/external/142124821.sd.mp4?s=97c09efc15494bb933caae00280525e7&profile_id=112,https://player.vimeo.com/external/142124823.hd.mp4?s=53e9a441029a84779dd1b0ee26c24669&profile_id=113",
",https://player.vimeo.com/external/142124820.mobile.mp4?s=ee711f61e66f7498254fdd0f51eb753c&profile_id=116,https://player.vimeo.com/external/142124820.sd.mp4?s=06d778fc351790d95c61f5229fa23858&profile_id=112,https://player.vimeo.com/external/142124820.hd.mp4?s=c27e69d1ceaa1e6161894db4a696e8ed&profile_id=113",
",https://player.vimeo.com/external/142124819.mobile.mp4?s=03a07412230abbd7162a9ffb6e4493e6&profile_id=116,https://player.vimeo.com/external/142124819.sd.mp4?s=452112ba0471f46f385d8e9c98b92a97&profile_id=112,https://player.vimeo.com/external/142124819.hd.mp4?s=1c804418a5eb08803921a8bf7432fdbb&profile_id=113",
",https://player.vimeo.com/external/143461251.mobile.mp4?s=92a621d2956fc5556f45a62520327725&profile_id=116,https://player.vimeo.com/external/143461251.sd.mp4?s=8d9751c7899cd5d5391750c8daf6c24a&profile_id=112,https://player.vimeo.com/external/143461251.hd.mp4?s=3fca831541bbfccec36176a619f7931c&profile_id=113",
",https://player.vimeo.com/external/142124822.mobile.mp4?s=28c8dfebd5cdaf962c7d75c9898ad11b&profile_id=116,https://player.vimeo.com/external/142124822.sd.mp4?s=81b9a8e6728de0b82ff0cbd51ce53e54&profile_id=112,https://player.vimeo.com/external/142124822.hd.mp4?s=9fd8e35b5074d15193f72bd702a1a8a3&profile_id=113",
",https://player.vimeo.com/external/143459104.mobile.mp4?s=aaa325050a0d4bb086c90705135be40d&profile_id=116,https://player.vimeo.com/external/143459104.sd.mp4?s=c914616351697cbd111910d866d25219&profile_id=112,https://player.vimeo.com/external/143459104.hd.mp4?s=874e4ec0ac3965e8d25209793e521f0b&profile_id=113"

]



};

var AJHAVideoInfo = VIDEOS.B;
