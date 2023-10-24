const placeholder = document.querySelector(".placeholder");
//console.log(placeholder)
const editableInput = document.querySelector(".editable");
//console.log(editableInput)
const tweetButton = document.querySelector(".button");
//console.log(tweetButton)
const counter = document.getElementById("counter");
//console.log(counter)
const readonly = document.querySelector(".readonly");
//console.log(readonly)

//!TIKLAMA OLAYINI DİNLEME
editableInput.addEventListener("click", () => {
  //!PLACEHOLDER(SPAN) RENGİNİ DEĞİŞTİR
  placeholder.style.color = "#98a5b1";
});
//!INPUT ODAĞINI DIŞARIYA TIKLAYINCA KALDIR
editableInput.onblur = () => {
  placeholder.style.color = "#333";
};

//!KLAVYENİN BASILMA OLAYINI DİNLE
editableInput.onkeypress = (e) => {
  placeholder.style.display = "none";
  //console.log(e)
  inputValidate(e.target.innerText);
};

//!KLAVYEDEN PARMAĞIMIZI ÇEKTİĞİMİZ ANI DİNLE
editableInput.onkeyup = (e) => {
  placeholder.style.display = "none";
  inputValidate(e.target.innerText);
};

//!YAZILAN TWEETİN KARAKTER KONTROLÜ
const inputValidate = (tweet) => {
  //console.log(tweet)
  //DIŞARDAN GELEN İNPUT VERİSİNİN UZUNLUĞU
  const tweetLength = tweet.length;

  const tweetLimit = 5;

  //!KALAN KARAKTER LİMİTİ
  const currentLimit = tweetLimit - tweetLength;
  //console.log(tweetLength)
  //console.log(counter)

  //!KARAKTER VAR MI?
  if (tweetLength <= 0) {
    //!KARAKTER YOKSA
    //!PLACEHOLDER GÖRÜNÜR HALE GETİRİR
    placeholder.style.display = "block";
    //!TWEET BUTONUNU PASİF YAP
    tweetButton.classList.remove("active");
    //!SAYACIN GÖRÜNÜRLÜĞÜNÜ ORTADAN KALDIRMA
    counter.style.display = "none";
  } else {
    //!KARAKTER VARSA

    //TWEET BUTONUNU AKTİF YAPAR
    tweetButton.classList.add("active");
    //SAYACI GÖRÜNÜR YAPAR
    counter.style.display = "block";
    //SAYACIN DEĞERİNE HESAPLANAN DEĞERİ ATAR
    counter.innerText = currentLimit;
  }
  let newTweet;

  //!KARAKTER SINIRI AŞILDI MI
  if (tweetLength > tweetLimit) {
    //KARAKTER SINIRI AŞILDIĞI DURUM, SUBSTR İLE BAŞLANGIÇ(TWEET LİMİTİ) VE BİTİŞ(GİRİLEN TOPLM KARAKTER) NOKTASINI BELİRLEME
    let overTweet = tweet.substr(tweetLimit, tweetLength);
    //console.log(overTweet)

    //!TAŞAN KARAKTERLERİN ARKA PLANINI KIRMIZI YAPMAK İÇİN SPAN OLUŞTURMA
    let overTweetElement = `<span class="overTweet">${overTweet}</span>`;
    //console.log(overTweetElement)

    //!NORMAL KARAKTERLERİ VE TAŞAN KARAKTERLERİ BİRLEŞTİRİP YENİ TWEEET OLUŞTURMA
    newTweet = tweet.substr(0, tweetLimit) + overTweetElement;
    //!YENİ TWEETİ READONLYDE GÖSTERECEĞİMİZ İÇİN Z-İNDEXLE GÖRÜNÜR YAPTIK
    readonly.style.zIndex = "1";
    //! SAYACIN SINIRI AŞAN KARAKTERLERİNİ KIRMIZI GÖSTER
    counter.style.color = "red";

    //!SINIR AŞILDIYSA BUTONU PASİF YAP
    tweetButton.classList.remove("active");
  } else {
    //!KARAKTER SINIRININ AŞILDIĞI DURUM

    //SAYACIN NORMAL RENGİ
    counter.style.color = "#333";
    //TAŞMA İŞLEMİ OLUŞTUĞUNDA GÖRÜNEN YAPIYI ORTADAN KALDIRMA
    readonly.style.zIndex = "-5";
  }
  //!OLUŞAN YENİ TWEETİ GÖSTERMEK İÇİN HTML TARAFINA GÖNDERME
  readonly.innerHTML = newTweet;
};
