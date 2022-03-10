const express = require("express");
const app = express();
app.timeout = 200
const mongoose = require("mongoose");
const {router} = require("express/lib/application");
const cors =  require("cors")
// mongoose.connect("mongodb://kdramalike:aLp+905547528301aLp@localhost:27017/kdramalike?authSource=admin");
mongoose.connect("mongodb://localhost:27017/kdramalike");
const Serie = mongoose.model("Serie", {
  idx: String,
  name: String,
  year: String,
  tags: [],
  aka: [],
  co: Number,
  summary: String,
  summaryLink: String,
  video: String,
  title: String,
});


// ANASAYFADAN GELEN İSTEK


app.get("/", (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin","*")
  const reqSource = Object.keys(req.query)[0]
  const reqData = Object.values(req.query)[0]
  //arama kutusundan gelen request
  if (reqSource === "q") {
    Serie.find({name: {$regex: reqData, $options: "i"}}, (err, data) => {
        if (err) {
          console.log("LISTING ERROR " + err);
        }
        let pocket = []
        let i = 0
        data.forEach(element => {
          // pocket.push([element.idx, element.name, element.year])
          pocket[i] = [element.idx, element.name, element.year]
          i++
        })

        res.send(pocket);
      }
    ).limit(10);

  }

  else if ( reqSource === "qm"){
    Serie.find({name: {$regex: reqData, $options: "i"}}, (err, data) => {
        if (err) {
          console.log("LISTING ERROR " + err);
        }
        let pocket = []
        let i = 0
        data.forEach(element => {
          // pocket.push([element.idx, element.name, element.year])
          pocket[i] = [element.idx, element.name, element.year]
          i++
        })
        res.send(pocket);
      }
    ).limit(5);

  }

  else if (reqSource === "c") {// _seriesName sayfası yüklenirken gelen istek

    const checkExist = async () => {//id değerinin olup olmadığını kontrol eden fonksiyon
      const isExist = await Serie.exists({idx: reqData})
      //eğer varsa true dönüyor. veritabanında arama ve cevap gönderme bu blokta gerçekleşiyor.
      if (isExist) {
        Serie.find({}, (err, allData) => {
          //bütün veriler
          Serie.find({idx: reqData}, (err, selectedData) => {
              if (err) {
                window.location.href("/")
              } else {

                const queryName = selectedData[0].name;
                const queryTags = selectedData[0].tags;
                const queryTagsCount = selectedData[0].tags.length;
                let pocketRaw = [];
                let i = 0;
                let k = 0; //ortak tag sayısı

                allData.forEach((element) => {
                  const name = element.name;
                  const tagCount = element.tags.length;
                  const year = element.year;
                  const summary = element.summary;
                  const summaryLink = element.summaryLink;
                  const video = element.video;
                  const title = element.title;
                  const idx = element.idx;

                  queryTags.forEach((element1) => {
                    //seçilen dizinin tagları
                    allData[i].tags.forEach((element2) => {
                      //üstünde çalışılan dizinin tagları
                      if (element1 === element2) {
                        k++;
                      }
                    });
                  });

                  const co2 = k / queryTagsCount + k / tagCount;
                  let co = co2 / 2;

                  if (element.tags.length < 5) {
                    //tag sayısı 5 ve daha az sa değeri düşürülüyor
                    pocketRaw[i] = [co.toFixed(2) / 2, name, year, summary, summaryLink, video, title, idx];
                  } else {
                    pocketRaw[i] = [co.toFixed(2), name, year, summary, summaryLink, video, title, idx];
                  }

                  i++;
                  k = 0;
                });

                pocketRaw.sort((a, b) => b[0] - a[0]); //benzeşme oranına göre sıralanır
                pocketRaw.shift(); //ilk eleman seçilen dizi ile aynı olduğundan arrayden çıkarılır
                let pocket = pocketRaw.slice(0, 102); //yeni array oluşulup ilk 96 eleman içine eklenir
                pocket.push(selectedData); //interpolation içine kullanılacak veri dizinin sonuna eklenir, -1 ile çağırlır

                res.send(pocket); //interpolation içinde kullanılan veri gönderilir
              }


            }
          );
        });
      } else {
        res.send("error")//buradan gönderilen veri 404 tetikliyor. sebebi yok.
      }
    }


    checkExist()

  }
});


module.exports = {

  path: "/api",
  handler: app,
};
