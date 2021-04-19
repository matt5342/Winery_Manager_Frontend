import React, { Component } from 'react';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button } from 'semantic-ui-react'


export default class LogInForm extends Component {
    
    render(){

       return (
           <Formik
               initialValues={{
                   username: '', 
                   password: '', 
                }} 
               validationSchema={Yup.object({
                   username: Yup.string()
                   .required('Required'),
                   password: Yup.string()
                   .required('Required')
               })}
               onSubmit={(values, { setSubmitting }) => {
                   this.props.handleSubmit(values)
                   // alert(JSON.stringify(values, null, 2));
                   setSubmitting(false)
               }}
           >
               {formik => (
                   <Form style={{width: '300px'}} onSubmit={formik.handleSubmit} >
                       <Form.Field
                           style={{width: '300px'}}
                           id='username'
                           control={Input}
                           label='Username:'
                           name='username'
                           placeholder='Username'
                           className='eight wide field'
                           {...formik.getFieldProps('username')}
                           error={formik.touched.username && formik.errors.username ? { content: formik.errors.username } : null}
                           />
                       <Form.Field
                           style={{width: '300px'}}
                           id='password'
                           type='password'
                           control={Input}
                           label='Password:'
                           name='password'
                           placeholder='Password'
                           className='eight wide field'
                           {...formik.getFieldProps('password')}
                           error={formik.touched.password && formik.errors.password ? { content: formik.errors.password } : null}
                           />
                           <Button type='submit' content='Log In' />
                   </Form>
               )}
           </Formik>
       )
    }
}


