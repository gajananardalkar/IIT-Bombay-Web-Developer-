import { Fragment, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddForm.css'
import { Button } from 'react-bootstrap';
import Backdrop from '../BackDrop/Backdrop';
import { IoIosCloseCircle } from "react-icons/io";

// const Backdrop = () => (
//     <div
//         style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0, 0, 0, 0.6)',
//             zIndex: 9999,
//         }}
//     />
// );

export default function AddForm({setcardData,setForm}) {

    const formik = useFormik({
        initialValues: {
            selectColumn: '',
            Title: '',
            Description: '',
        },
        validationSchema: Yup.object({
            selectColumn: Yup.string()
                .oneOf(['todo', 'doing', 'done'], 'Please select at least one option')
                .required('Select Column is required'),
                Title: Yup.string()
                .matches(/^[a-zA-Z]+$/, 'Title must contain alphabetic characters only')
                .required('Title is required'),
                Description: Yup.string()
                .min(25, 'Description must be 25 characters or more')
                .required('Description is required'),
        }),
        validateOnSubmit: true,
        onSubmit: (values, { setSubmitting }) => {
            if (!formik.isValid) {
                console.log('Form is not valid');
                return;
            }else{
                setSubmitting(false);
                setcardData(values)
                setForm(false);

            }

        },
    });
 const closeform = ()=>{
    setForm(false);

 }
    return (
        <Fragment>
            <Backdrop />
            <form
                onSubmit={formik.handleSubmit}
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '34%',
                    height: '50vh',
                    backgroundColor: 'white',
                    zIndex: 99999,
                    borderRadius: '12px',
                }}
            >
                <span style={{position:"absolute", right:"15px", top:"15px", cursor:"pointer"}} onClick={closeform}><IoIosCloseCircle color='red' fontSize='22px'/></span>
                <div className='formField' >
                    <label htmlFor="selectColumn">Column</label>
                    <select
                        id="selectColumn"
                        name="selectColumn"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.selectColumn}
                    >
                        <option value="">Select</option>
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>


                </div>
                {formik.touched.selectColumn && formik.errors.selectColumn ? (
                    <div style={{ color: 'red' }}>{formik.errors.selectColumn}</div>
                ) : null}
                <div className='formField'>
                    <label htmlFor="Title">Title</label>
                    <input
                        id="Title"
                        name="Title"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Title}
                    />
                </div>
                {formik.touched.Title && formik.errors.Title ? (
                    <div style={{ color: 'red' }}>{formik.errors.Title}</div>
                ) : null}
                <div className='formField'>
                    <label htmlFor="Description">Description</label>
                    <input
                        id="Description"
                        name="Description"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Description}
                    />

                </div>
                {formik.touched.Description && formik.errors.Description ? (
                    <div style={{ color: 'red' }}>{formik.errors.Description}</div>
                ) : null}

                <Button style={{ color: "black", backgroundColor: "unset", margin: "2rem" }} type="submit">Create Card</Button>

            </form>
        </Fragment >

    );
}

