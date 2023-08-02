const bcrypt =  require ("bcryptjs");

const users = [
  {
      "role": "admin",
      "_id": "5c9e5216eed5cf2d9ce80304",
      "name": "Dylan Cougar",
      "email": "dylancougar@yahoo.com",
      "avatar": "https://res.cloudinary.com/dwgjvssdt/image/upload/v1593792924/whx8aqfg9o5vyikr8o2m.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2019-03-29T17:12:54.198Z",
      "__v": 0
  },
  {
      "role": "author",
      "_id": "5c9fdac0a682ac592070efb6",
      "name": "Jimmy Elvis",
      "email": "jimmyelvis@yahoo.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1553976464/mxw7n1doboyd3zkkjd5t.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2019-03-30T21:08:16.895Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "5c9fdce0c929e167ec3dfa9a",
      "name": "Ana Ramos",
      "email": "anaramos@gmail.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1553977008/gijvqiyagvqaqtpd75gb.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2019-03-30T21:17:20.371Z",
      "__v": 0
  },
  {
      "role": "author",
      "_id": "5c9fdef8c929e167ec3dfa9e",
      "name": "Jane Brisbane",
      "email": "brisbane@gmx.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1553977544/rhbltvdwgzfeu3bqqwqq.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2019-03-30T21:26:16.695Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "5ca10de3c4fd2452404b858d",
      "name": "Kalon Nunez",
      "email": "kalon@aol.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1554055077/ul0n5cwx5pkd5g1zgifn.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2019-03-31T18:58:43.592Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "5ca11169e0eb0629fc830cc5",
      "name": "Susie Young",
      "email": "sueyoung@gmail.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1554055984/jpynlayhgff5g0i9seyp.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2019-03-31T19:13:45.319Z",
      "__v": 0
  },
  {
      "role": "author",
      "_id": "5f2f652626006e0625abe268",
      "name": "Jen Walsh",
      "email": "jenwalsh@socialsole.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1596941599/si05bxf9rzr2oce3w3th.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-08-09T02:53:26.264Z",
      "__v": 0
  },
  {
      "role": "author",
      "_id": "5f2f6aca26006e0625abe26b",
      "name": "Leon Haywood",
      "email": "haywood@socialsole.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1596943047/bdtlmrahenajvlnqi7nh.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-08-09T03:17:30.971Z",
      "__v": 0
  },
  {
      "role": "author",
      "_id": "5f2f6b5b26006e0625abe26c",
      "name": "Terry Robins",
      "email": "robins@socialsole.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1596943182/pfz2rcgba8hn2n8mgz11.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-08-09T03:19:55.457Z",
      "__v": 0
  },
  {
      "role": "author",
      "_id": "5f2f6bab26006e0625abe26d",
      "name": "Hannah Kerrigan",
      "email": "hannah@socialsole.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1596943272/wywrpqddxsicclig5kzs.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-08-09T03:21:15.026Z",
      "__v": 0
  },
  {
      "role": "author",
      "_id": "5f302b78387b1f0f45e85bb1",
      "name": "Veronica Smith",
      "email": "veronica@socialsole.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1596992370/esan3kwaww4lzhjfxuxb.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-08-09T16:59:36.950Z",
      "__v": 0
  },
  {
      "role": "author",
      "_id": "5f42dcd939f4a426cc54870a",
      "name": "Greg Harden",
      "email": "harden@gmail.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1598217427/gmn8z1zkipot391tspo5.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-08-23T21:17:13.736Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "5f55a830cacf2a96e480e279",
      "name": "Richard Warner",
      "email": "warner@gmail.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1599448705/nqzmdkh28xi6kum614wk.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-09-07T03:25:36.846Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "5f55a983e4e5dd9ec869407d",
      "name": "Erin Bosh",
      "email": "bosh@yaahoo.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1599449451/e2gohcv8gxtr1y6khyye.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-09-07T03:31:15.154Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "5f55aa231a5e367280975093",
      "name": "Sandy Banner",
      "email": "sandy@gmail.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1599449629/e9zybgfgjdciyfr7qbox.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-09-07T03:33:55.256Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "5f56c41e95e2b32a547866e8",
      "name": "Ron Camaron",
      "email": "camaron@yahoo.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1599521818/rprei2uqrdicm44uqxcf.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-09-07T23:37:02.684Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "5f5e8417b357ab35018c8b6d",
      "name": "Dale Harmon",
      "email": "harmon@gmail.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1600029711/aiwnwb2bwxhevoxw0t9p.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-09-13T20:41:59.346Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "5f6273f4126b14f08cf42868",
      "name": "Jake Smith",
      "email": "smith@gmail.com",
      "avatar": "http://res.cloudinary.com/dwgjvssdt/image/upload/v1600287726/lioytpsyl1psiuox9xet.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2020-09-16T20:22:12.321Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "637d87d5fa16a636b62c1e8d",
      "name": "Patricia Merced",
      "email": "merced@yahoo.com",
      "avatar": "http://res.cloudinary.com/dw2qnxp1e/image/upload/v1669171141/random-user_imageF13_aaexiy.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2022-11-23T02:39:17.836Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "63fe43980155457211bba006",
      "name": "Stacey Morales",
      "email": "Morales@yahoo.com",
      "avatar": "http://res.cloudinary.com/dw2qnxp1e/image/upload/v1677607746/v2_0134881_srxr2n.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2023-02-28T18:10:32.816Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "63fe465b65fa05bad4f2ab5e",
      "name": "Gianna Reels",
      "email": "reels@aol.com",
      "avatar": "http://res.cloudinary.com/dw2qnxp1e/image/upload/v1677608453/attractive-beautiful-beauty-907801_dqy5wh.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2023-02-28T18:22:19.786Z",
      "__v": 0
  },
  {
      "role": "subscriber",
      "_id": "63fe513998ea3cce94ed5f7e",
      "name": "Patsy Bogan",
      "email": "Rowena82@hotmail.com",
      "avatar": "http://res.cloudinary.com/dw2qnxp1e/image/upload/v1677611241/beautiful-beauty-casual-762020_joffvq.jpg",
      "password": bcrypt.hashSync("123456", 10),
      "date": "2023-02-28T19:08:41.119Z",
      "__v": 0
  }
]

module.exports = users;