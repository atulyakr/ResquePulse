const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.hindustantimes.com/topic/landslide');

  const headlines=await page.evaluate(()=>{
        const heads=document.querySelectorAll(".hdg3");
        return Array.from(heads).map((h)=>{
            return h.textContent;
        });
  })

  console.log(headlines);


  const page2 = await browser.newPage();

  await page2.goto('https://www.hindustantimes.com/topic/disaster');

  const headlines2=await page2.evaluate(()=>{
        const heads=document.querySelectorAll(".hdg3");
        return Array.from(heads).map((h)=>{
            return h.textContent;
        });
  })

  console.log(headlines2);

  const page3 = await browser.newPage();

  await page3.goto('https://www.hindustantimes.com/topic/floods');

  const headlines3=await page3.evaluate(()=>{
        const heads=document.querySelectorAll(".hdg3");
        return Array.from(heads).map((h)=>{
            return h.textContent;
        });
  })

  console.log(headlines3);

  const page4 = await browser.newPage();

  await page4.goto('https://www.hindustantimes.com/topic/floods');

  const headlines4=await page4.evaluate(()=>{
        const heads=document.querySelectorAll(".hdg3");
        return Array.from(heads).map((h)=>{
            return h.textContent;
        });
  })

  console.log(headlines4);


  const page5 = await browser.newPage();

  await page5.goto('https://www.hindustantimes.com/topic/floods');

  const headlines5=await page5.evaluate(()=>{
        const heads=document.querySelectorAll(".hdg3");
        return Array.from(heads).map((h)=>{
            return h.textContent;
        });
  })

  console.log(headlines5);
  
  await browser.close();
})();