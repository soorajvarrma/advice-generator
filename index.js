import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
const url ="https://api.adviceslip.com"
app.use(express.static('public'));
app.get("/",(req,res)=>{
    console.log("Got a GET request for the homepage");
    res.render("index.ejs")
})

app.get("/advice", async(req,res)=>{
    try {
        const result = await axios.get(url+"/advice");
        console.log(result.data.slip);
      res.render("index.ejs",{
        id: result.data.slip.id,
        advice : result.data.slip.advice
      });
      } catch (error) {
        res.status(404).send(error.message);
      }
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});