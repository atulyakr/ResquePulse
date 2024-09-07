import puppeteer from "puppeteer";
import OpenAI from "openai";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../frontend')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index1.html'));
  });

//open ai stuff configuration
const openai = new OpenAI();

const prompt="you are given an array of disaster related headlines. Analyze the text from the array and identify the headlines which seems most severe and require quick resque operatioin. Extract the location,casualities,injured and headline from the array."


app.get('/api/get-news', async (req, res) => {
    try {
    let headlines=[{
        header:'',
        link:''
    }];

    let headlinesString = "";

    let info="";

    (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://news.google.com/search?q=disaster%20in%20india%2C%20injured%2C%20died%2C%20resque%20when%3A7d&hl=en-IN&gl=IN&ceid=IN%3Aen');

            headlines.header=await page.evaluate(()=>{
                const heads=document.querySelectorAll(".JtKRv");
                return Array.from(heads).map((h)=>{
                    return h.textContent;
                });
                
            })
            headlines.link=await page.evaluate(()=>{
                const links=document.querySelectorAll(".JtKRv");
                return Array.from(links).map((l)=>{
                    return l.href;
                });
                
            })
            
                console.log(headlines.header);
                console.log(headlines.link);
                console.log(headlinesString);
                
                headlinesString=headlines.header.join("\n");
                console.log(headlinesString);
                
                await browser.close();

                try {
                    const completion = await openai.chat.completions.create({
                    model: "gpt-4o-mini", // Use the correct model
                    messages: [
                        { role: "system", content: prompt },
                        {
                        role: "user",
                        content: `Here are the headlines:\n${headlinesString}`, // Pass the scraped headlines to the API
                        },
                    ],
                    });
                
                    info=completion.choices[0].message
                    console.log("AI Response:", info);

                    res.json({ data: info });

                } catch (error) {
                    console.error("Error with OpenAI API:", error);
                }    
       })();
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Something went wrong.' });
      }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });










