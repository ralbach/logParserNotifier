# Log Parser Notifier

![Image of result example logs]
(./alertScreenShot.jpg)

### Log Parser Notifier is a custom built script to take messages and user data in CSV format, and alert the users to messages they've subscribed to.

### i.e. Jack is subscribed to message codes 1 & 3 while Stacy subscribes to message codes 2. If our message data contains a 1 we will notify him of the appropriate message while leaving Stacy unbothered.

To Run this File:
1.  Add a messages.csv with properly formatted messages in user/configs
1.  Add a users.csv with properly formatted users in user/configs
1.  in your terminal, while in the user/scripts folder, run **node logParserNotifier.js**
   * *optional: Adjust the notifierScript path in scripts/logParserNotifier.js on line 149*

### This script was built by Rylan Albach (http://github.com/ralbach) for a coding challenge.