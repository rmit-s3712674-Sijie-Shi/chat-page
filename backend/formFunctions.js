import { UserForm, FormCreated, SavedForm, SentForm } from "./data.js";

export async function createForm(req, res) {
  const { form } = req.body;
  const { userId } = req;
  try {
    await FormCreated.findOneAndUpdate(
      {
        userId: userId,
      },
      { $push: { savedForms: form.formId } }
    );
    console.log(form);
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
    sentForms
  });
}

export async function updateForm(req, res) {
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
      res.send(data);
    })
    .catch((err) => res.status(422).send(err.message));
}

export async function deleteSavedForm(req, res) {
  const { formId } = req.body;
  const { userId } = req;
  try {
    await SavedForm.findOneAndDelete({ formId: formId });
    const result = await FormCreated.findOneAndUpdate(
      { userId: userId },
      { $pull: { savedForms: formId } },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    res.status.send(err);
  }
}

export async function deleteSentForm(req, res) {
  const { formId } = req.body;
  const { userId } = req;
  try {
    await SavedForm.findOneAndDelete({ formId: formId });
    const result = await FormCreated.findOneAndUpdate(
      { userId: userId },
      { $pull: { sentForms: formId } },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    res.status.send(err);
  }
}

// db.stores.updateMany(
//     { _id: 1 },
//     { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } }
// )
