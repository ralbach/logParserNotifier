/* Tyvak Alert Logger
  RUN FILE USING node logParserNotifier.js IN YOUR TERMINAL

  To adjust this script please change the messages.csv and users.csv and
  **change the path manually using the notifierScript Function**
*/

// imported utils for filesystem access, and making file reads async
//JS uses fs (file system to read and write to files)
var fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

//warningDataParser is helper function that accesses users.csv (built to be modular)
const warningDataParser = async () => {
  try {
    const warningData = await readFile(
      "../configs/messages.csv",
      (err, data) => {}
    );
    return warningData;
  } catch (err) {
    throw new Error(err);
  }
};

//userDataParser is helper function that accesses users.csv (built to be modular)
const userDataParser = async () => {
  try {
    const userData = await readFile("../configs/users.csv", (err, data) => {});
    return userData;
  } catch (err) {
    throw new Error(err);
  }
};


/* NOTIFIER FUNCTION IS MEAT AND POTATOES OF OUR CUSTOM SCRIPT

This function parses the saved User and Message data using (userDataClean and warningDataClean)
into formatted arrays before writing to the given path (if it doesn't exist) otherwise it will increment to an available txt filepath
and finally alert the results to the console/script user.
*/
async function notifierScript(path) {
  let warningData = await warningDataParser();
  let userData = await userDataParser();

  const userDataClean = () => {
    let newArray = [];
    //users are received as buffer so convert to string
    let buffer = userData.toString();
    //console.log(buffer)
    //split csv by new lines, then by comma to get our headers
    buffer = buffer.split("\n");
    let headerCols = buffer[0].split(",");

    //create hash maps of each column header for storage and cross reference later

    //iterate across csv lines after headers
    for (let i = 1; i < buffer.length; i++) {
      //split at commas for csv and initialize an empty object for the length of the list of errors
      buffer[i] = buffer[i].split(",");
      newArray[i - 1] = {};

      let messageSubscriptions = [];
      newArray[i - 1][headerCols[3]] = messageSubscriptions;
      //for each header (this could vary based on headers)
      for (let j = 0; j < buffer[i].length; j++) {
        //for Name, email, and job title, create col headers
        if (j < 3) {
          newArray[i - 1][headerCols[j]] = buffer[i][j];
        } else {
          //if length is greater than 3 these are message subscriptions so push into our array for easier access/storage.
          messageSubscriptions.push(buffer[i][j]);
        }
      }
    }
    return newArray;
  };

  const warningDataClean = () => {
    let newArray = [];
    //warnings are received as buffer so convert to string
    let buffer = warningData.toString();
    //split csv by new lines, then by comma to get our headers
    buffer = buffer.split("\n");
    let headerCols = buffer[0].split(",");

    //create hash maps of each column header for storage and cross reference later
    //iterate across csv lines after headers
    for (let i = 1; i < buffer.length; i++) {
      //split at commas for csv and initialize an empty object for the length of the list of errors
      buffer[i] = buffer[i].split(",");
      newArray[i - 1] = {};
      //for each header (this could vary based on given headers)
      for (let j = 0; j < headerCols.length; j++) {
        //set our header (headerCols[j] equal to  data from buffer)
        newArray[i - 1][headerCols[j]] = buffer[i][j];
      }
    }
    return newArray;
  };

  //set arrays that can work with the helper function results
  let warningDataArray = warningDataClean();
  let userDataArray = userDataClean();


  let toWriteToFile = "";
  //iterate over the userData and warning data array
  for (let i = 0; i < userDataArray.length; i++) {
    for (let j = 0; j < warningDataArray.length; j++) {
      //iterate across the messages that users are subscribed to as these can vary
      for (let k = 0; k < userDataArray[i]["messages_to_subscribe"].length;k++) {
        //if there's a match, we'll add it to our formatted string to write and alert with.
        if ( userDataArray[i]["messages_to_subscribe"][k] == warningDataArray[j]["id"] ) {
          toWriteToFile += `Notifying ${userDataArray[i]["name"]} of ${warningDataArray[j]["id"]}! ${warningDataArray[j]["error_message"]} \n`;
        }
      }
    }
  }


  //create directory check so we can mkdir if it's not in our file structure
  let directoryCheck = path.split('/')
  directoryCheck = directoryCheck.slice(0, directoryCheck.length - 1)
  directoryCheck = directoryCheck.join('/')
  console.log(directoryCheck)

  //set base case and incrementer for our file writing loop
  let fileNumber = 1;
  let fileWritten = false;

  //keep incrementing preformatted file structure until filepath doesn't exist before write to system and log to console
  while (fileWritten === false) {
    try {
      if(!fs.existsSync(directoryCheck)){
        fs.mkdirSync(directoryCheck)
      }

      if (!fs.existsSync(path)) {
        console.log("writing...");
        fs.writeFile(`${path}`, toWriteToFile, (err) => {
          if (err) throw err;
        });
        console.log(toWriteToFile);
        fileWritten = true;
      } else {
        console.log(`${path} exists, trying new path.`);
        path = `${directoryCheck}/log_file${fileNumber++}.txt`;
      }
    } catch (err) {
      console.error(err);
    }
  }
}


//adust this path string to write to different subdirectories.
notifierScript("../logs/nested_logs/log_file1.txt");
