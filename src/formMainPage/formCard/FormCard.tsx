import React, { useContext, useState } from "react";
import { IForm } from "../../formpage/form";
import styles from "./FormCard.module.css";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Instance } from "@popperjs/core";
import EditIcon from '@mui/icons-material/Edit';
import FormMainPage from "../../formpage/formMainPage";
import { selectedFormContext } from "../../formpage/formContext";

const FormCard = ({ form, handleOpen }: { form: IForm, handleOpen: any }) => {
  const { selectedForm, setSelectedForm } = useContext(selectedFormContext)

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

  return (
    <>
      {" "}
      <div
        className={styles.mainContainer}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.cardContainer}>
          <div className={styles.formTitle}>Title: {form.title}</div>
          <div className={styles.lastEdit}>last edit: {form.timestamp}</div>
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
              <span className={styles.delete} onClick={() => {}}></span>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormCard;
