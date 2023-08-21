import { UserForm, FormCreated, SavedForm, SentForm } from "./data.js";
import io from "socket.io-client";

export async function createForm(req, res) {
  const form = req.body;
  const { userId } = req;
  try {
    await FormCreated.findOneAndUpdate(
      {
        userId: userId,
      },
      { $push: { savedForms: form.formId } }
    );
    const result = await SavedForm.create({
      userId: userId,
      formId: form.formId,
      title: form.title,
      questions: form.questions,
      timestamp: form.timestamp,
      endtime: form.endtime,
    });
    res.send(result);
  } catch (err) {
    res.status(422).send(err);
  }
}

export async function readUserForms(req, res) {
  const { userId } = req;
  //const userInfo = await FormCreated.findOne({ userId: userId });
  const savedForms = await SavedForm.find({ userId: userId });
  const sentForms = await SentForm.find({ userId: userId });
  res.send({
    savedForms,
    sentForms,
  });
}

export async function updateForm(req, res, next) {
  const { formId, questions, title, timestamp } = req.body;
  SavedForm.findOneAndUpdate(
    { formId: formId },
    {
      $set: {
        questions: questions,
        title: title,
        timestamp: new Date().getTime(),
      },
    },
    { new: true }
  )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(422).send(err);
    });
}

export async function deleteSavedForm(req, res, next) {
  const { formId } = req.body;
  const { userId } = req;
  try {
    await SavedForm.findOneAndDelete({ formId: formId });
    await FormCreated.findOneAndUpdate(
      { userId: userId },
      { $pull: { savedForms: formId } },
      { new: true }
    );
    next();
  } catch (err) {
    res.status.send(err);
  }
}

export async function deleteSentForm(req, res, next) {
  //in progress
  const { formId } = req.body;
  const { userId } = req;
  try {
    await SavedForm.findOneAndDelete({ formId: formId }, { new: true });
    await FormCreated.findOneAndUpdate(
      { userId: userId },
      { $pull: { sentForms: formId } },
      { new: true }
    );
    next();
  } catch (err) {
    res.status.send(err);
  }
}

export async function createSentForm(req, res) {
  const { formId, permissions, endtime } = req.body;
  const { userId } = req;
  //console.log(req.body)
  //  endtime: { type: String},
  // permissions: { type: String },
  try {
    await FormCreated.findOneAndUpdate(
      {
        userId: userId,
      },
      { $push: { sentForms: formId } }
    );

    await FormCreated.findOneAndUpdate(
      {
        userId: userId,
      },
      { $pull: { savedForms: formId } }
    );
    const form = await SavedForm.findOneAndDelete({ formId: formId });
    const result = await SentForm.create({
      formId: form.formId,
      userId: form.userId,
      title: form.title,
      questions: form.questions,
      timestamp: form.timestamp,
      endtime: endtime,
      permissions: permissions,
    });
    //sendMessage('message?');
    res.send(result);
  } catch (e) {
    console.log("e" + e);
    res.status(422).send(e);
  }
}

const sendMessage = (message) => {
  const socket = io("http://localhost:2333");
  console.log("message: " + message);
  socket.emit("chat message", message);
};
