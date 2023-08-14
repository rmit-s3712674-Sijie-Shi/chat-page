import React, { useState } from "react";
import { IForm } from "../../formpage/form";
import styles from "./FormCard.module.css";
import Tooltip from "@mui/material/Tooltip";
import { Instance } from "@popperjs/core";

const FormCard = ({ form, handleOpen, handleDelete }: { form: IForm, handleOpen: any, handleDelete:any }) => {

  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<Instance>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY + 12 };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };


  const trimDate = (date: number) => {
    const dateDiff = new Date().getTime() - date
    const day = Math.floor(dateDiff / (24 * 3600 * 1000))
    const leave1 = dateDiff%(24*3600*1000)
    const hours = Math.floor(leave1/(3600*1000))
    var leave2=leave1%(3600*1000)
    var minutes=Math.floor(leave2/(60*1000))
    console.log(dateDiff)
    if(day > 1) {
      return `${day} days ago`
    } else if(day === 1){
      return `1 day ago`
    } else if(hours > 1){
      return `${hours} hours ago`
    } else if(hours === 1) {
      return `1 hour ago`
    } else if (minutes > 1) {
      return `${minutes} minutes ago`
    } else {
      return "just now"
    }
  }

  return (
    <>
      {" "}
      <div
        className={styles.mainContainer}
        onMouseMove={handleMouseMove}
        key={form.id}
      >
        <div className={styles.cardContainer}>
          <div className={styles.formTitle}>{form.title}</div>
          <div className={styles.lastEdit}>last edit: {(
                form.timestamp && trimDate(form.timestamp)
            )}</div>
          <div className={styles.buttonContainer} ref={areaRef}>
            <Tooltip
              title="Edit"
              placement="bottom"
              arrow
              PopperProps={{
                popperRef,
                anchorEl: {
                  getBoundingClientRect: () => {
                    return new DOMRect(
                      positionRef.current.x,
                      positionRef.current.y,
                      0,
                      0
                    );
                  },
                },
              }}
            >
              <span className={styles.edit} onClick={() => {handleOpen(form)}}></span>
            </Tooltip>
            <Tooltip
              title="Delete"
              placement="bottom"
              arrow
              PopperProps={{
                popperRef,
                anchorEl: {
                  getBoundingClientRect: () => {
                    return new DOMRect(
                      positionRef.current.x,
                      positionRef.current.y,
                      0,
                      0
                    );
                  },
                },
              }}
            >
              <span className={styles.delete} onClick={handleDelete}></span>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormCard;
