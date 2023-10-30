import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_DO,
  COMPLETE_TO_DO,
  DELETE_ALL,
  DELETE_TO_DO,
  GET_LIST_TO_DO,
} from "../../redux/actions/type/typeTodo";
import { DeleteOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";

const TodoTemplates = () => {
  const dispatch = useDispatch();

  const { arrTodo } = useSelector((state) => state.TodoReducer);
  const [edit, setEdit] = useState({
    id: "",
    content: "",
    active: false,
    isCompleted: false,
  });

  useEffect(() => {
    dispatch({
      type: GET_LIST_TO_DO,
    });
  }, []);
  // ARR COMPLETED
  const arrComplete = arrTodo.filter((item) => item.isCompleted === true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await dispatch({
      type: ADD_TO_DO,
      todo: {
        ...edit,
        id: Math.floor(Math.random() * 10000 + 1),
      },
    });
    await dispatch({
      type: GET_LIST_TO_DO,
    });
    setEdit({
      ...edit,
      content: "",
    });
  };

  const onChange = async (e) => {
    const { checked, value } = e.target;
    let index = arrTodo.findIndex((item) => item.id === value);
    if (index !== -1) {
      await dispatch({
        type: COMPLETE_TO_DO,
        todo: {
          id: value,
          isCompleted: checked,
        },
      });
      await dispatch({
        type: GET_LIST_TO_DO,
      });
    }
  };

  const handleCLickDeleteAll = async () => {
    await dispatch({
      type: DELETE_ALL,
      arrCP: arrComplete,
    });
    await await dispatch({
      type: GET_LIST_TO_DO,
    });
  };
  const items = [
    {
      key: "1",
      label: <div style={{ margin: "0 20px" }}>All</div>,
      children: (
        <div>
          <Form
            onFinish={() => {
              handleSubmit();
            }}
            style={{ display: "flex" }}
          >
            <Form.Item style={{ width: "95%", paddingRight: "10px" }}>
              <Input
                name="content"
                value={edit.content}
                onChange={handleChange}
                placeholder="add details"
              />
            </Form.Item>
            <Button htmlType="submit" size="middle" type="primary">
              Add
            </Button>
          </Form>

          <div className="listToDo">
            {arrTodo &&
              arrTodo.length > 0 &&
              arrTodo.map((item) => {
                return (
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={item.isCompleted}
                      value={item.id}
                      onChange={onChange}
                    >
                      {item.isCompleted ? (
                        <b style={{ textDecorationLine: "line-through" }}>
                          {item.content}
                        </b>
                      ) : (
                        <b>{item.content}</b>
                      )}
                    </Checkbox>
                  </div>
                );
              })}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <div style={{ margin: "0 20px" }}>Active</div>,
      children: (
        <>
          <Form
            onFinish={() => {
              handleSubmit();
            }}
            style={{ display: "flex" }}
          >
            <Form.Item style={{ width: "95%", paddingRight: "10px" }}>
              <Input
                name="content"
                value={edit.content}
                onChange={handleChange}
                placeholder="add details"
              />
            </Form.Item>
            <Button htmlType="submit" size="middle" type="primary">
              Add
            </Button>
          </Form>
          <div className="listActive">
            {arrTodo
              .filter((item) => item.isCompleted === false)
              .map((todo, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      marginBottom: "10px",
                      color: "red",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Checkbox
                      checked={todo.isCompleted}
                      value={todo.id}
                      onChange={onChange}
                    >
                      <b>{todo.content}</b>
                    </Checkbox>
                  </div>
                );
              })}
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: <div style={{ margin: "0 20px" }}>Completed</div>,
      children: (
        <div className="listCompleted">
          {arrTodo
            .filter((item) => item.isCompleted === true)
            .map((todo, index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                    color: "red",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox
                    checked={todo.isCompleted}
                    value={todo.id}
                    onChange={onChange}
                  >
                    <b style={{ textDecorationLine: "line-through" }}>
                      {todo.content}
                    </b>
                  </Checkbox>
                  <DeleteOutlined
                    onClick={async () => {
                      dispatch({
                        type: DELETE_TO_DO,
                        todo: {
                          id: todo.id,
                        },
                      });
                      dispatch({
                        type: GET_LIST_TO_DO,
                      });
                    }}
                    style={{ color: "grey", cursor: "pointer" }}
                  />
                </div>
              );
            })}

          {arrTodo.filter((item) => item.isCompleted === true).length > 0 ? (
            <div style={{textAlign: "right", marginTop: "20px" }}>
              <Button
                onClick={() => {
                  handleCLickDeleteAll();
                }}
                danger
                style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}

              >
               <svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>  delete all
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ fontWeight: "bold", fontSize: "30px", textAlign: "center" }}>
        #todo
      </h1>

      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default TodoTemplates;
