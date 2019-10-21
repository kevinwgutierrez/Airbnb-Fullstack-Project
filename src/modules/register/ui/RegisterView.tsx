import * as React from 'react';
import * as Antd from 'antd';
import {withFormik, FormikErrors, FormikProps, Field, Form} from 'formik';
import { validUserSchema } from "@abb/common";
import { InputField } from "../../shared/InputField";

const { Form: AntForm, Icon, Button } = Antd;
const FormItem = AntForm.Item;

interface FormValues {
    email: string;
    password: string;
}

interface Props {
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}


export class C extends React.PureComponent <FormikProps<FormValues> & Props> {
    render() {
      const { handleSubmit } = this.props;
        return (
        <Form style = {{display: 'flex'}}>
          <div style={{width: 400, margin: 'auto'}}>
            <Field
            name = "email"
            prefix={
            <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
          }
            placeholder="Email"
            component={InputField}
            />
          <Field
            name = "password"
            type="password"
            prefix={
            <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
          }
            placeholder="Password"
            component={InputField}
            />
            <FormItem>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              </FormItem>
              <FormItem>
              <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              >
                Register
              </Button>
              </FormItem>
              <FormItem>
              Or <a href="">login now!</a>
            </FormItem>
          </div>
          </Form>
        );
    }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
    mapPropsToValues: () => ({ email:'', password: '' }),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const errors = await props.submit(values);
    }
})(C);