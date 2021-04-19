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
                    email: '',
                    winery_name: '',
                    password: '', 
                    confirmPassword: ''
                }} 
                validationSchema={Yup.object({
                    username: Yup.string()
                    .required('Required'),
                    email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                    winery_name: Yup.string()
                    .required('Required'),
                    password: Yup.string()
                    .required('Required'),
                    confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
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
                           id='email'
                           control={Input}
                           label='Email:'
                           name='email'
                           placeholder='winemaker@winery.com'
                           className='eight wide field'
                           {...formik.getFieldProps('email')}
                           error={formik.touched.email && formik.errors.email ? { content: formik.errors.email } : null}
                        />
                       <Form.Field
                           style={{width: '300px'}}
                           id='winery_name'
                           control={Input}
                           label='Winery Name:'
                           name='winery_name'
                           placeholder='Reserve Estates'
                           className='eight wide field'
                           {...formik.getFieldProps('winery_name')}
                           error={formik.touched.winery_name && formik.errors.winery_name ? { content: formik.errors.winery_name } : null}
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
                       <Form.Field
                           style={{width: '300px'}}
                           id='confirmPassword'
                           type='password'
                           control={Input}
                           label='Confirm Password:'
                           name='confirmPassword'
                           placeholder='Password'
                           className='eight wide field'
                           {...formik.getFieldProps('confirmPassword')}
                           error={formik.touched.confirmPassword && formik.errors.confirmPassword ? { content: formik.errors.confirmPassword } : null}
                           />
                           <Button type='submit' content='Sign Up' />
                   </Form>
               )}
           </Formik>
       )
    }
}


