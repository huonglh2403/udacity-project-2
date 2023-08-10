import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';


  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  export const router = express.Router();
  router.get("/filteredimage", (req, res) => {
    let query = req.query;
    if (query == null)
    {
      return res.status(400).send("No query");
    }
    if (!checkURL(query.image_url))
    {
      return res.status(400).send("Wrong input query");
    }
    
    const filteredUrl = filterImageFromURL(query.image_url);
    res.status(200).send("Image is valid");
    return deleteLocalFiles(filteredUrl);
  })
  
  app.use(router);

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );