import { UserForm, FormCreated, SavedForm, SentForm } from "./data.js";

export async function createForm(req, res) {
  const { id, form } = req.body;
  try {
    await FormCreated.findOneAndUpdate(
      {
        userId: id,
      },
      { $push: { savedForms: form.formId } }
    );
    console.log(form);
    const result = await SavedForm.create({
      userId: id,
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
  const { id } = req.body;
  const result = await FormCreated.findOne({ userId: id });
  res.send(result);
}

export async function updateForm(req, res) {
  const { formId, questions, title, timestamp } = req.body;
  SavedForm.findOneAndUpdate(
    { formId: formId },
    {
      $set: {
        questions: questions,
        title: title,
        timestamp: new Date(),
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
  const { userId, formId } = req.body;
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
  const { userId, formId } = req.body;
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
