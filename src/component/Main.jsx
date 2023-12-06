import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, completedTodo, editTodo, updateTodo } from "./redux/Todo";
import { Button } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


export const Main = () => {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [todo, settodo] = useState("");
  const updateRef = useRef("");
  const black ="black";
  const white ="white"
  console.log(todos);

  const add = () => {
    if (todo !== "") {
      dispatch(addTodo(todo));
      settodo("");
    }
  };

  return (
    <>
      <div
        className="container d-flex"
        style={{ alignItems: "center", flexDirection: "column",marginTop:"40px"}}
      >
        <div style={{ maxWidth: "300px", width: "100%" }}>
          <h1 style={{ textAlign: "center" }}>
            <b>Todo</b>
          </h1>
          <span style={{ width: "100%" }}>
            <input
              type="text"
              onChange={(e) => settodo(e.target.value)}
              onKeyDown={(e)=>{if(e.key === "Enter"){add()}}}
              value={todo}
              placeholder="Add Todo"
              style={{
                borderRadius: "5px",
                marginBottom: "10px",
                height: "40px",
                width: "252px",
                paddingLeft: "10px",
              }}
            />

            <span onClick={add}>
              <MdAddCircle style={{ fontSize: "3em" }} />
            </span>
          </span>
        </div>

        <br />

        {todos.map((val) => (
          <div
            className="d-flex"
            style={{
              marginBottom: "10px",
              borderRadius: "5px",
              border: `2px solid ${val.border}`,
              maxWidth: "350px",
              width: "100%",
              height: "80px",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor:val.background || black,
              color:val.color || white,
              fontStyle:val.style,
              opacity:val.opacity
            }}
            onDoubleClick={() => dispatch(editTodo({ id: val.id, bool: true }))}
          >
            <div
              style={{
                overflow: "hidden",
                width: "80%",
                paddingLeft: "10px",
              }}
            >
              {!val.edit ? (
                <p>{val.title}</p>
              ) : (
                <input
                  type="text"
                  ref={updateRef}
                  defaultValue={val.title}
                  style={{ width: "97%", height: "35px", textAlign: "center" ,outline:"none",border:"none"}}
                ></input>
              )}
            </div>
            <div>
              <div>
                {val.edit ? (
                  <Button
                    variant="warning"
                    onClick={() => {
                      if (updateRef.current?.value != null) {
                        dispatch(
                          updateTodo({
                            id: val.id,
                            title: updateRef.current?.value,
                          })
                        );
                      } else {
                        dispatch(editTodo({ id: val.id, bool: false }));
                      }
                    }}
                  >
                    <MdOutlineEdit />
                  </Button>
                ) : (
                  // <Button
                  //   variant="danger"
                  //   onClick={() => dispatch(deleteTodo(val.id))}
                  //   style={{ display: "flex" }}
                  // >
                  //   <RxCross2 style={{ fontSize: "1em" }} />
                  // </Button>
                  <>
                    <span onClick={() => dispatch(completedTodo(val.id))}>
                      {val.component || <IoCheckmarkDoneCircleOutline style={{fontSize:"2em",color:val.icon}} />}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
