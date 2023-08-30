import axios, { AxiosResponse } from "axios";
import { IForm } from "../formpage/form";

const BaseUrl = "http://localhost:3001";
export function getUserForms(userId: string) {
  const token = localStorage.getItem(userId);
  const result = axios
    .get(BaseUrl + "/getuserforms", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
  return result;
}

export function updataForm(userId: string, form: IForm | undefined) {
  const token = localStorage.getItem(userId);
  const result = axios
    .post(BaseUrl + "/updateForm", form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
  return result;
}

export function deleteForm(
  userId: string,
  form: IForm | undefined,
  status: string
) {
  const token = localStorage.getItem(userId);
  const result = axios
    .post(
      BaseUrl +
        `${status === "saved" ? "/deleteSavedForm" : "/deleteSentForm"}`,
      form,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => err);
  return result;
}

export function sendForm(
  userId: string,
  formId: string | undefined,
  permissions: Array<string>,
  endtime: string,
) {
  const token = localStorage.getItem(userId);
  const result = axios
    .post(
      BaseUrl + "/sentForm",
      {
        formId,
        permissions,
        endtime,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => err);
  return result;
}
