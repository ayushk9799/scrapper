import puppeteer from 'puppeteer';
import fs from 'fs'

let data=[];
const browser = await puppeteer.launch();

async function test (url) {
  // Launch the browser and open a new blank page
  const page = await browser.newPage();
 const userString= 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  await page.setViewport({ width: 1280, height: 800 });
  page.setUserAgent(userString);

let userId;
let followers;
let posts;
let following;

  //console.log(page)
  // Navigate the page to a URL
  await page.goto(url,{waitUntil: 'networkidle0'});
   await page.screenshot({                      // Screenshot the website using defined options

    path: "./screenshot.png",                   // Save the screenshot in current directory

    fullPage: true                              // take a fullpage screenshot

  });
 
 
  //const searchResultSelector = '.x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp x1s688f x5n08af x10wh9bi x1wdrske x8viiok x18hxmgj'


   
  const result=  await page.evaluate(()=>
    {
      //console.log("hello1")
      const userIDClass=document.getElementsByClassName('x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp x1s688f x5n08af x10wh9bi x1wdrske x8viiok x18hxmgj')
      userId=userIDClass[0].textContent;
      const detailsClass=document.getElementsByClassName('html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs')
   posts=detailsClass[0].textContent;
   followers=detailsClass[1].textContent;
   following=detailsClass[2].textContent;
   return {userId:userId,posts:posts,followers:followers,following:following};
    })
  console.log(result)
   data.push(result);
 

};


const urls=['https://www.instagram.com/virat.kohli/']


const promises=[]
const looping= async ()=>{
  for(let i=0;i<urls.length;i++)
  {
      
    promises.push(test(urls[i]))

  }
   Promise.all(promises).then(()=>
   {
    fs.writeFile('data.json',JSON.stringify(data),async(err)=>
    {
      if(err)
      {
        console.log(err)
      }
      else{
        console.log("data written successfully");
        await browser.close();
      }
      
    })
   })
 
}

looping();
