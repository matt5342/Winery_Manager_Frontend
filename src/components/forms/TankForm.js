import React, { Component } from 'react';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button } from 'semantic-ui-react'


export default class TankForm extends Component {
    
    render(){
        const materials = [
           {key: 's', text: 'Stainless Steel', value: 'Stainless Steel'}, 
           {key: 'c', text: 'Concrete', value: 'Concrete'}, 
           {key: 'o', text: 'Oak', value: 'Oak'}, 
           {key: 'p', text: 'Plastic', value: 'Plastic'}, 
           {key: 'a', text: 'Amphora', value: 'Amphora'}, 
           {key: 'g', text: 'Glass', value: 'Glass'}, 
           {key: '*', text: 'Other', value: 'Other'}
       ]
       return (
           <Formik
               initialValues={{
                   name: '', 
                   volume: '', 
                   material: ''
               }} 
               validationSchema={Yup.object({
                   name: Yup.string()
                   .required('Required'),
                   volume: Yup.number()
                   .min(0, 'Must be greater than 0')
                   .required('Required'),
                   material: Yup.string()
                   .required('Required')
               })}
               onSubmit={(values, { setSubmitting }) => {
                   this.props.handleTankSubmit(values)
                   // alert(JSON.stringify(values, null, 2));
                   setSubmitting(false)
               }}
           >
               {formik => (
                   <Form style={{width: '300px'}} onSubmit={formik.handleSubmit} >
                       <Form.Field
                           style={{width: '300px'}}
                           id='name'
                           control={Input}
                           label='Name:'
                           name='name'
                           placeholder='Tank Name'
                           className='eight wide field'
                           {...formik.getFieldProps('name')}
                           error={formik.touched.name && formik.errors.name ? { content: formik.errors.name } : null}
                           />
                       <Form.Field
                           style={{width: '300px'}}
                           id='volume'
                           control={Input}
                           label='Volume:'
                           name='volume'
                           placeholder='Volume (L)'
                           className='eight wide field'
                           {...formik.getFieldProps('volume')}
                           error={formik.touched.volume && formik.errors.volume ? { content: formik.errors.volume } : null}
                           />
                           <SelectFormikSemantic name='material' options={materials} label='Material' placeholder='Choose Material...'/>
                           <Button type='submit' content='Create' />
                   </Form>
               )}
           </Formik>
       )
    }
}

function SelectFormikSemantic(props: { name: string, options: [], placeholder: string, label: string; }) {
    const [field, , helpers] = useField(props.name);
    return (
        <Form.Select
        placeholder={props.placeholder}
        label={props.label}
        options={props.options}
        onChange={(e, v) => helpers.setValue(v.value)}
        value={field.value.value} />
    );
}
