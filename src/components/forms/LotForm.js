import React, { Component } from 'react';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button } from 'semantic-ui-react'


export default class LotForm extends Component {
    
    render(){
        const colors = [
            {key: 'r', text: 'Red', value: 'Red'}, 
            {key: 'w', text: 'White', value: 'White'}, 
            {key: 's', text: 'Rosé', value: 'Rosé'}, 
        ]
        const tankNames = []
        this.props.tanks.map(tank => tankNames.push({key: tank.id, text: tank.name, value: tank.id}))
       return (
           <Formik
               initialValues={{
                   name: '', 
                   lotVolume: '', 
                   tank_id: '', 
                   vintage: '',
                   color: ''
               }} 
               validationSchema={Yup.object({
                   name: Yup.string()
                   .required('Required'),
                   lotVolume: Yup.number()
                   .min(0, 'Must be greater than 0')
                   .required('Required'),
                   tank_id: Yup.string()
                   .required('Required'),
                   vintage: Yup.number()
                   .required('Required'),
                   color: Yup.string()
                   .required('Required')
               })}
               onSubmit={(values, { setSubmitting }) => {
                //    debugger
                   this.props.handleLotSubmit(values)
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
                           label='Lot Name:'
                           name='name'
                           placeholder='Lot Name'
                           className='eight wide field'
                           {...formik.getFieldProps('name')}
                           error={formik.touched.name && formik.errors.name ? { content: formik.errors.name } : null}
                           />
                       <Form.Field
                           style={{width: '300px'}}
                           id='lotVolume'
                           control={Input}
                           label='Volume:'
                           name='lotVolume'
                           placeholder='Volume (L)'
                           className='eight wide field'
                           {...formik.getFieldProps('lotVolume')}
                           error={formik.touched.lotVolume && formik.errors.lotVolume ? { content: formik.errors.lotVolume } : null}
                           />
                           <SelectFormikSemantic label='Tank' name='tank_id'id='tank_id' options={tankNames} placeholder='Choose Tank...' />
                       <Form.Field
                           style={{width: '300px'}}
                           id='vintage'
                           control={Input}
                           label='Vintage:'
                           name='vintage'
                           placeholder='Vintage'
                           className='eight wide field'
                           {...formik.getFieldProps('vintage')}
                           error={formik.touched.vintage && formik.errors.vintage ? { content: formik.errors.vintage } : null}
                           />
                           <SelectFormikSemantic label='Color' name='color' id='color' options={colors} placeholder='Choose Color...' />
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
        options={props.options}
        label={props.label}
        onChange={(e, v) => helpers.setValue(v.value)}
        value={field.value.value} />
    );
}
