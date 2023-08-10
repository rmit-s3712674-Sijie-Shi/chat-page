import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./question.module.css";
import { IQuestion } from "../form";
import { FormContext } from "../formContext";
import Tooltip from "@mui/material/Tooltip";


type QuestionsInfo = keyof IQuestion;

const Question = () => {
  const { formState, setFormState } = useContext(FormContext);
  const [questions, setQuestions] = useState<IQuestion[] | null>();
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>();

  useEffect(() => {
    console.log(formState.questions);
    setQuestions(formState.questions);
    formState.questions && setSelectedQuestion(formState.questions[0]);
  }, []);

  const addNewTask = useCallback(() => {
    console.log("add");
    setFormState({ type: "addQuestion" });
    setQuestions((prev) => {
      prev = formState.questions ? [...formState.questions] : [];
      return prev;
    });
    setSelectedQuestion((prev) => {
      prev = formState.questions
        ? formState.questions[formState.questions.length - 1]
        : null;
      return prev;
    });
  }, [formState.questions, setFormState]);

  const deleteTask = useCallback(
    (q: IQuestion) => {
      setFormState({ type: "deleteQuestion", question: q });
      // console.log(q, selectedQuestion)
      if (q.id === selectedQuestion?.id) {
        console.log("11")
        if (questions) {
          const index = questions.indexOf(q);
          const nextQ = questions[index - 1];
          setSelectedQuestion(nextQ);
        }
      }
      setQuestions((prev) => {
        prev = formState.questions ? [...formState.questions] : [];
        return prev;
      });
      !questions && setSelectedQuestion(null);
    },
    [formState.questions, questions, selectedQuestion?.id, setFormState]
  );

  const changeQuestionInfo = useCallback(
    (value: string | number, q: IQuestion, changedType: QuestionsInfo) => {
      let temp: IQuestion = { ...q, [changedType]: value };
      setFormState({ type: "editQuestion", question: temp });
      setQuestions((prev) => {
        prev = formState.questions ? [...formState.questions] : [];
        return prev;
      });
    },
    [formState.questions, setFormState]
  );

  const buttonBGC = (index: number) => {
    return selectedQuestion
      ? questions?.indexOf(selectedQuestion) === index
        ? { backgroundColor: "rgb(201, 231, 251)" }
        : {}
      : {};
  };

  return (
    <>
      <div className={styles.questionCardContainer}>
        <div className={styles.questionMenu}>
          {questions?.length ? (
            questions.map((q, index) => (
              <Tooltip title={q.description}
              placement="bottom"
              arrow>
              <div className={styles.buttonContainer}>
                <button
                  key={index}
                  className={styles.menuButton}
                  onClick={() => setSelectedQuestion(q)}
                  style={buttonBGC(index)}
                >
                  {`Q: ${index + 1}`}
                </button>
                <span onClick={() => deleteTask(q)}></span>
              </div>
              </Tooltip>
            ))
          ) : (
            <div></div>
          )}
        </div>
        <div>
          {selectedQuestion ? (
            <div className={styles.container} key={selectedQuestion.id}>
              <div className={styles.question}>
                <div className={styles.detailContainer}>
                  <input
                    className={styles.description}
                    value={selectedQuestion.description}
                    onChange={(e) =>
                      changeQuestionInfo(
                        e.target.value,
                        selectedQuestion,
                        "description"
                      )
                    }
                  ></input>
                  <label>Choose an option:</label>
                  <select
                    name="cars"
                    id="cars"
                    className={styles.select}
                    onChange={(e) =>
                      changeQuestionInfo(
                        e.target.value,
                        selectedQuestion,
                        "questionsType"
                      )
                    }
                    value={selectedQuestion.questionsType}
                  >
                    <option value="rate">Rate</option>
                    <option value="text">Text</option>
                  </select>
                  {selectedQuestion.questionsType === "rate" ? (
                    <div>
                      <div>
                        Min Rate:
                        <input
                          type="text"
                          value={selectedQuestion.minRate}
                          onChange={(e) =>
                            changeQuestionInfo(
                              parseInt(e.target.value),
                              selectedQuestion,
                              "minRate"
                            )
                          }
                        />
                      </div>
                      <div>
                        Max Rate:
                        <input
                          type="text"
                          value={selectedQuestion.maxRate}
                          onChange={(e) =>
                            changeQuestionInfo(
                              parseInt(e.target.value),
                              selectedQuestion,
                              "maxRate"
                            )
                          }
                        />
                      </div>
                      {selectedQuestion.maxRate < selectedQuestion.minRate && (
                        <div> max rate should larger than min rate</div>
                      )}
                    </div>
                  ) : (
                    <div>
                      please input the detail for the response:
                      <input
                        type="text"
                        value={selectedQuestion.response}
                        onChange={(e) =>
                          changeQuestionInfo(
                            e.target.value,
                            selectedQuestion,
                            "response"
                          )
                        }
                      />
                    </div>
                  )}
                </div>
                <div
                  className={styles.deleteContainer}
                  onClick={() => deleteTask(selectedQuestion)}
                >
                  <div className={styles.delete}>delete</div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.noTask}>
              No task here, please add a new one
            </div>
          )}
        </div>
        <div className={styles.addNewTask} onClick={() => addNewTask()}>
          add new task+
        </div>
      </div>
    </>
  );
};

export default Question;
