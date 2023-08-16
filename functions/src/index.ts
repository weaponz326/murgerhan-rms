/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const db = admin.firestore();

exports.sendEmailOnDocumentCreate = functions.firestore
  .document("users_invitation/{documentId}")
  .onCreate(async (snapshot: any, context: any) => {
    // Get the document data
    const documentData = snapshot.data();

    // // Construct the email content
    // const emailContent = `
    //     Document ID: ${context.params.documentId}
    //     Document Data: ${JSON.stringify(documentData, null, 2)}
    // `;

    // const redirectLink = "http://localhost:4200";
    // const redirectLink = "https://weapons-7d089.firebaseapp.com/#";
    const redirectLink = "https://www.murgerhanhub.com/#";

    // Construct the email content
    const staffEmailContent = `        
      <p>Hello ${documentData.invitee_name},</p>
      <p>${documentData.email_message}</p>
      <p>
        Please download the 
        <a href="${documentData.terms_file_url}">
          terms and conditions
        </a>,
        to be submitted during your registration.</p>
      <p>
        Click on the following link to sign up: 
        <a href="${redirectLink}/auth/signup?id=${context.params.documentId}">
          Sign Up
        </a>   
      </p>
      <p>We look forward to seeing you there!</p>
      <p>
        Best regards, <br> 
        Murger Han.
      </p>
    `;

    const thirdPartyEmailContent = `        
      <p>Hello ${documentData.invitee_name},</p>
      <p>${documentData.email_message}</p>
        Click on the following link to sign up: 
        <a href="${redirectLink}/auth/signup?id=${context.params.documentId}">
          Sign Up
        </a>   
      </p>
      <p>We look forward to seeing you there!</p>
      <p>
        Best regards, <br> 
        Murger Han.
      </p>
    `;

    let emailContent = null;
    if (documentData.invitee_type == "Staff") {
      emailContent = staffEmailContent;
    } else {
      emailContent = thirdPartyEmailContent;
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // See nodemailer documentation for details
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "netrink18@gmail.com",
        pass: "lawvkzjdeaadaosa",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "noreply@murgerhan.com",
      to: documentData.invitee_email,
      subject: documentData.email_subject,
      html: emailContent,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      // console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });

exports.calculateSumAndUpdateDocument = functions.firestore
  .document("inventory_stock_batch/{docId}")
  .onWrite(async (change, context) => {
    const collectionRef = db.collection("inventory_stock_batch");
    const stockItemField = "stock_item.id";

    try {
      const changedDocument = change.after;
      const stockItemValue = changedDocument.get(stockItemField);

      if (stockItemValue === undefined) {
        console.log("stock_item field not found in the changed document.");
        return null;
      }

      // Get all documents in the collection
      const snapshot = await collectionRef
        .where(stockItemField, "==", stockItemValue).get();

      let totalSum = 0;
      snapshot.forEach((doc) => {
        const fieldValue = doc.data().current_stock;
        if (typeof fieldValue === "number") {
          totalSum += fieldValue;
        }
      });

      // Update another document in a different collection
      const targetDocRef =
        db.collection("inventory_stock_item").doc(stockItemValue);
      await targetDocRef.update({total_stock: totalSum});

      return null;
    } catch (error) {
      console.error("Error calculating sum and updating document:", error);
      return null;
    }
  });
