const express = require("express");
const mongoose = require("mongoose");
const app = express();


let Serie;

try {
    Serie = mongoose.model("Serie")
} catch (error) {
    Serie = mongoose.model("Serie", {
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
    })
}

mongoose.connect(process.env.CURRENT_DB)
    .then(r => {
        app.use((req, res) => {
            const reqSource = Object.keys(req.query)[0]
            const reqData = Object.values(req.query)[0]
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
                                let sum = 0;
                                allData.forEach((element) => {
                                    const name = element.name;
                                    const tagCount = element.tags.length;
                                    const year = element.year;
                                    const summary = element.summary;
                                    const summaryLink = element.summaryLink;
                                    const video = element.video;
                                    const title = element.title;
                                    const idx = element.idx;
                                    const commonTags = []
                                    queryTags.forEach((element1) => {
                                        //seçilen dizinin tagları
                                        allData[i].tags.forEach((element2) => {
                                            //üstünde çalışılan dizinin tagları
                                            // if (element1 === element2) {
                                            if (element1[0] === element2[0]) {
                                                k++;
                                                sum += element2[1]
                                                commonTags.push(element1[0])
                                            }
                                        });
                                    });

                                    const co2 = (k + sum) / ((queryTagsCount + tagCount) / 2)
                                    pocketRaw[i] = [co2.toFixed(2), name, year, summary, summaryLink, video, title, idx, commonTags];

                                    // const co2 = k / queryTagsCount + k / tagCount;
                                    // let co = co2 / 2;
                                    // if (element.tags.length < 5) {
                                    //   //tag sayısı 5 ve daha az sa değeri düşürülüyor
                                    //   pocketRaw[i] = [co.toFixed(2) / 2, name, year, summary, summaryLink, video, title, idx];
                                    // } else {
                                    //   pocketRaw[i] = [co.toFixed(2), name, year, summary, summaryLink, video, title, idx];
                                    // }

                                    i++
                                    k = 0
                                    sum = 0
                                });

                                pocketRaw.sort((a, b) => b[0] - a[0]); //benzeşme oranına göre sıralanır
                                // pocketRaw.shift(); //ilk eleman seçilen dizi ile aynı olduğundan arrayden çıkarılır
                                let pocket = pocketRaw.slice(0, 103); //yeni array oluşulup ilk 96 eleman içine eklenir
                                pocket.push(selectedData); //interpolation içine kullanılacak veri dizinin sonuna eklenir,

                                res.send(pocket); //interpolation içinde kullanılan veri gönderilir

                            }


                        })
                    })
                } else {
                    res.send("error")//buradan gönderilen veri 404 tetikliyor. sebebi yok.
                }
            }

            checkExist()
        })


    })
    .catch(err => {
        console.log(err)
    })


module.exports = {
    path: "/api/calc", handler: app,
};



