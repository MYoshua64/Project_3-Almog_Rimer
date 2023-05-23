import path from "path";
import fs from "fs";

const errorsLogFile = path.resolve(__dirname, "../1-assets/logs/errors.log");
const activitiesLogFile = path.resolve(
  __dirname,
  "../1-assets/logs/activities.log"
);

// Log error:
function logError(message: string, err?: any): void {
  const now = new Date();
  let msgToLog = now.toUTCString() + "\n";
  msgToLog += message + "\n";
  if (typeof err === "string") msgToLog += err + "\n";
  if (err?.stack) msgToLog += `Stack: ${err.stack}\n`;
  msgToLog += "----------------------------------------------------------\n";
  fs.appendFile(errorsLogFile, msgToLog, () => {});
}

//Log activity
function logActivity(message: string): void {
  const now = new Date();
  let msgToLog = now.toUTCString() + "\n";
  msgToLog += message + "\n";
  msgToLog += "----------------------------------------------------------\n";
  fs.appendFile(activitiesLogFile, msgToLog, () => {});
}

export default {
  logError,
  logActivity,
};
