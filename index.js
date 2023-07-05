import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";
const app = express();

app.get("/",cors(), async (req, res) => {
  try {
    const {data} = await axios.get("https://gasprices.aaa.com/state-gas-price-averages/")
    const $ = cheerio.load(data);
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido).toLocaleDateString();
    const selectorDieselAlabama=$("table tr:contains('Alabama') td.diesel").text().trim();
    const selectorDieselAlaska=$("table tr:contains('Alaska') td.diesel").text().trim();
    const objCountries = [
        { id: 1, name: 'Alabama', fecha: hoy, diesel: selectorDieselAlabama },
        { id: 2, name: 'Alaska', fecha: hoy, diesel: selectorDieselAlaska },
      ];
    res.json(objCountries);
  } catch (error) {
    res.json({ error });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening on port"+PORT));
