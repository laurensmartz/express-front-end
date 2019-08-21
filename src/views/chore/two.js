import React, { Component } from "react";
import { sendRequest } from "../../axios/axios";
import { Form, Input, Button, Icon, message, Table, Modal } from "antd";
import { deleteStudent, getStudentList, uploadAvatar } from "../../api/student/delete_student";
import { signUp } from "../../api/user/sign_up";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const confirm = Modal.confirm;

class CreateStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      avatar: null
    };

    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "Sex",
        dataIndex: "sex",
        key: "sex"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.deleteStudent.bind(this, record._id)}>
              Delete
            </a>
          </span>
        )
      },
      {
        title: "Avatar",
        dataIndex: "avatar_url",
        key: "avatar_url",
        render: (text, record) => (
          <span>
            <img src={record.avatar_url} width="50" height="50" />
          </span>
        )
      }
    ];

    this.reqLucyInfo = this.reqLucyInfo.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();
    this.getStudentList();
  }

  reqLucyInfo() {
    var data = {
      name: "Jim"
    };

    sendRequest({
      methods: "post",
      url: "/test",
      data
    });
  }
  async createStudent({ name, age, sex }) {
    var data = {
      name,
      age,
      sex
    };

    // this.uploadAvatar()
    if (this.state.avatar) {
      var avatar_url = await this.uploadAvatar();

      data.avatar_url = avatar_url;
      sendRequest({
        methods: "post",
        url: "/create_student",
        data
      }).then(data => {
        console.log(data);
        if (data.code === 0) {
          message.success("create success!");
          this.getStudentList();
        }
      });
    } else {
      message.error("请先选择头像");

      return;
    }
  }
  getStudentList() {
    getStudentList().then(data => {
      if (data.code === 0) {
        this.setState({
          data: data.data
        });
      }
    });
  }
  deleteStudent(id) {
    confirm({
      title: "Do you want to delete this student?",
      content: "this can't be reverted",
      onOk: () => {
        deleteStudent({ id }).then(data => {
          if (data.code === 0) {
            message.success("delete success");
            this.getStudentList();
          } else {
            message.error("delete error");
          }
        });
      }
    });
  }
  handleCreateStudent = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.createStudent(values);
      }
    });
  };
  async uploadAvatar(event) {
    let fd = new FormData();

    fd.append("avatar", this.state.avatar);

    return uploadAvatar(fd).then(data => {
      return data.data.avatar_url;
    });
  }
  changeAvatar(e) {
    this.setState({
      avatar: e.target.files[0]
    });
  }
  signUp() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        signUp(values).then(data => {
          if (data.code === 0) {
            message.success("注册成功");
          }
        });
      }
    });
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const nameError = isFieldTouched("name") && getFieldError("name");
    const ageError = isFieldTouched("age") && getFieldError("age");
    const sexError = isFieldTouched("sex") && getFieldError("sex");
    const usernameError = isFieldTouched("username") && getFieldError("username");
    const pwdError = isFieldTouched("pwd") && getFieldError("pwd");

    return (
      <div>
        {/* 添加学生 */}
        <Form layout="inline" onSubmit={this.handleCreateStudent}>
          {/* 姓名 */}
          <Form.Item validateStatus={nameError ? "error" : ""} help={nameError || ""}>
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "please input student's name" }]
            })(<Input prefix={<Icon type="user" />} placeholder="student name" />)}
          </Form.Item>

          {/* 年龄 */}
          <Form.Item validateStatus={ageError ? "error" : ""} help={ageError || ""}>
            {getFieldDecorator("age", {
              rules: [{ required: true, message: "please input student's age" }]
            })(<Input prefix={<Icon type="user" />} placeholder="student age" />)}
          </Form.Item>

          {/* 性别 */}
          <Form.Item validateStatus={sexError ? "error" : ""} help={sexError || ""}>
            {getFieldDecorator("sex", {
              rules: [{ required: true, message: "please input student's sex" }]
            })(<Input prefix={<Icon type="user" />} placeholder="student sex" />)}
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" disabled={hasErrors(getFieldsError())}>
              create
            </Button>
          </Form.Item>
        </Form>

        {/* 学生列表 */}
        <Table columns={this.columns} dataSource={this.state.data} rowKey="_id" />

        <form>
          <h2>单图上传</h2>
          <input type="file" name="avatar" onChange={this.changeAvatar} />
        </form>

        {/* 注册用户 */}
        <Form style={{ maxWidth: 300 }}>
          {/* 用户名 */}
          <Form.Item validateStatus={usernameError ? "error" : ""} help={usernameError || ""}>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "用户名不能为空" }]
            })(<Input prefix={<Icon type="user" />} placeholder="请输入用户名" />)}
          </Form.Item>

          {/* 密码 */}
          <Form.Item validateStatus={pwdError ? "error" : ""} help={pwdError || ""}>
            {getFieldDecorator("pwd", {
              rules: [{ required: true, message: "密码不能为空" }]
            })(<Input prefix={<Icon type="password" />} placeholder="请输入密码" />)}
          </Form.Item>

          {/* 注册按钮 */}
          <Form.Item>
            <Button onClick={this.signUp}>注册</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const wrappedCreateStudentForm = Form.create({ name: "create_student" })(CreateStudent);

export default wrappedCreateStudentForm;
