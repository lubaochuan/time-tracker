
# Time Tracker App
An app for tracking and reporting learning time.

# Need
Homeschool moms need an app to help track their kids learning time. The app needs to be simple and useful.
* simple: Moms can record their kids' learning time quickly (at most 3 taps in less than a minute) and can forget about it.
* useful: When moms want to know how much time their kids have spent on various subjects (or whether their goals are reached) the information is readily available in the app.

## Try the app
1. Install the "Expo" app from the App store or Google Play.
1. Scan the following QR code using your "Expo" app. See this demo video https://youtu.be/9TyzrsQzm_o. ![QR](images/download.png)
1. Play with the app.

Note: the app will refresh/update itself when a newer version is published on Expo, but the data you stored in the app will stay intact till you delete the Expo app.

## Core functions
### Add/Edit/Delete students
A student is identified by a name. All students in the system must have unique names.

### Add/Edit/Delete subjects
A subject has a title and a flag showing whether it is one of the core subjects.

### Add/Edit/Delete learning records
A learning record states which __student__ worked on what __subject__ on what date for __how long__. An optional note can be added with additional information about the recorded activity.

### View all records
View all records of all students for all subjects in the reverse chronological order.

### View reports
A report is a monthly summary of all learning records for a particular student.

### Export via Email
1. Tap on the "Export" button on the records screen or the report screen. You will see a new screen with the reports in the comma delimited format (CSV).
1. Tap on the "Email Me" button. A new email message will be opened in your default email app. The body of the message will be the report.
1. Enter an email address and hit send.

![export via email](images/email_export.gif)

### Export via Copy & Paste
1. Tap on the "Export" button on the records screen or the report screen. You will see a new screen with the reports in the comma delimited format (CSV).
1. Press and hold on the text and select "copy" in the pop up menu. Now the text/report is in your clipboard.
2. You can paste the text into another app of your choice.

![export via gmail](images/email_export2.gif)

### Delete Records
The settings screen gives you options to delete all students, all subjects, and all learning records. You must type some text to confirm the deletion. This allows you purge the data in your app after you have exported the reports and no longer need the records.

![delete](images/delete_records.gif)

# Support
Please send an email to the following address to report issues:

![support](images/support_email.png)

# Developers
## Install packages:
```
npm install redux react-redux --save
npm install redux-logger --save
npm install redux-form --save
npm install redux-persist --save
npm install native-base --save
npm install prop-types --save
npm install react-navigation --save
npm install react-navigation-props-mapper --save
npm install react-native-datepicker --save
npm install moment --save
npm install react-native-mail --save
npm install react-native-communications --save
```
