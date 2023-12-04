import React, { useState, useEffect } from 'react'
import {
    Input,
    Button,
    Select,
    Avatar,
    FormItem,
    FormContainer,
    hooks,
} from 'components/ui'
import { Field, Form, Formik, useField } from 'formik'
import { HiCheck, HiHashtag } from 'react-icons/hi'
import * as Yup from 'yup'
import { FaGithub,FaStackOverflow } from "react-icons/fa";
const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, 'Too Short!').required('Title required'),
    content: Yup.string().required('Title required'),
    assignees: Yup.array().min(1, 'Assignee required'),
    rememberMe: Yup.bool(),
})
const RenderInput = ({ field, form,...props }) => {
  const { name } = field;
    const value = form.values[name];
    const [inputValue, setInputValue] = useState('');

    const handleAddOption = () => {
        if (inputValue && !value.includes(inputValue)) {
            const newValue = [...value, inputValue];
            form.setFieldValue(name, newValue);
            setInputValue('');
        }
    };

    const handleRemoveOption = (option) => {
        const newValue = value.filter((item) => item !== option);
        form.setFieldValue(name, newValue);
    };

  return (
    <div className=''>
      <div className='flex items-center gap-2 my-2 overflow-x-auto scroll-mb-4'>
      {Array.isArray(value) && value.map((option, index) => (
                    <div key={index} className="flex items-center justify-between gap-2">
                        <span className='bg-gray-300 px-2 rounded-md text-gray-700'>{option}</span>
                        <Button size="xs" variant="solid" type="button" onClick={() => handleRemoveOption(option)} className="!bg-red-500">Remove</Button>
                    </div>
                ))}
      </div>
      <div className='flex items-center gap-2 my-2'>
      <Input
        {...field}
        {...props}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddOption();
          }
        }}
      />
      <Button variant="solid" onClick={handleAddOption}>Add</Button>
      </div>
      
    </div>
  );
};
const NewIdeaForm = () => {

    const onSubmit = (formValue, setSubmitting) => {
        setSubmitting(true)
        console.log(formValue);
        const { title, description, demo, desiredSize, techStack, hashtag } = formValue

      
        const values = {
            name: title,
            description,
            demo,
            desiredSize,
            stack: techStack,
            hashtag,
        }
        console.log(values);
    }

    return (
        <Formik
            initialValues={{
                title: '',
                techStack: ["react", "node"],
                hashtag: ["web"],
                description: '',
                demo: '',
                desiredSize: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                onSubmit(values, setSubmitting)
            }}
        >
            {({ touched, errors, values, resetForm, isSubmitting }) => (
                <Form>
                    <FormContainer className="">
                        <FormItem
                            label="Title"
                            invalid={errors.title && touched.title}
                            errorMessage={errors.title}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="Enter title"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label={<div className='flex items-center gap-2'><HiHashtag /><span>Hashtags</span></div>}
                            invalid={errors.hashtag && touched.hashtag}
                            errorMessage={errors.hashtag}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="hashtag"
                                placeholder="Enter tags"
                                component={RenderInput}
                            />
                        </FormItem>
                        <FormItem
                            label={<div className='flex items-center gap-2'><FaStackOverflow/><span>Tech stack</span></div>}
                            invalid={errors.techStack && touched.techStack}
                            errorMessage={errors.techStack}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="techStack"
                                placeholder="Add tech stack"
                                component={RenderInput}
                            />
                        </FormItem>
                        <FormItem
                            label={<div className='flex items-center gap-2'><FaGithub/> <span>Demo Link</span></div>}
                            invalid={errors.demo && touched.demo}
                            errorMessage={errors.demo}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="demo"
                                placeholder="Enter demo"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Description"
                            invalid={errors.description && touched.description}
                            errorMessage={errors.description}
                        >
                            <Field
                                textArea
                                type="text"
                                autoComplete="off"
                                name="description"
                                placeholder="Enter description"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Desired team size"
                            invalid={errors.desiredSize && touched.desiredSize}
                            errorMessage={errors.desiredSize}
                        >
                            <Field
                                type="number"
                                autoComplete="off"
                                name="desiredSize"
                                placeholder="Enter desired team size"
                                component={Input}
                            />
                        </FormItem>
                        <Button block variant="solid" type="submit" loading={isSubmitting}>
                            {isSubmitting ? "Submitting" : "Submit"}
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewIdeaForm
