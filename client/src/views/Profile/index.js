import React from 'react'
import {
    Input,
    Avatar,
    Upload,
    Button,
    Select,
    Switcher,
    Notification,
    toast,
    FormContainer,
    Badge,
} from 'components/ui'
import FormDesription from './components/FormDesription'
import FormRow from './components/FormRow'
import { Field, Form, Formik } from 'formik'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineUser,
} from 'react-icons/hi'
import { FaGithub } from "react-icons/fa";
import * as Yup from 'yup'
import { apiUpdateProfile } from 'services/ProfileService'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('User Name Required'),
    github: Yup.string(),
    email: Yup.string().email('Invalid email').required('Email Required'),
    image: Yup.string(),
    techSkills: Yup.array().of(Yup.string()),

})

const profileData = {
    name: 'Ron Vargas',
    email: 'ronnie_vergas@infotech.io',
    github: 'ronnievergas',
    techSkills: ['React', 'Vue', 'Angular'],
    image: '/img/avatars/thumb-1.jpg',
}

const Profile = ({ data }) => {
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = async (values, setSubmitting) => {
        const { name, email, image, techSkills, github } = values
        await apiUpdateProfile({
            name,
            email,
            image,
            github,
            techSkills,
        })


        console.log('val', values)
        toast.push(<Notification title={'Profile updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={profileData}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form className='max-w-[700px] mx-auto'>
                        <FormContainer>
                            <FormDesription
                                title="Personal Information"
                                desc="Basic info, like your name and address that will displayed in public"
                            />
                            <FormRow
                                name="avatar"
                                label="Avatar"
                                {...validatorProps}
                            >
                                <Field name="image">
                                    {({ field, form }) => {
                                        const avatarProps = field.value
                                            ? { src: field.value }
                                            : {}
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                onChange={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                showList={false}
                                                uploadLimit={1}
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={60}
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>
                            <FormRow
                                name="name"
                                label="Name"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Name"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="email"
                                label="Email"
                                
                                {...validatorProps}
                            >
                                <Field
                                    type="email"
                                    disabled
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                    prefix={
                                        <HiOutlineMail className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="github"
                                label="Github"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="github"
                                    placeholder="Github"
                                    component={Input}
                                    prefix={
                                        <FaGithub className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="techSkills"
                                label="Tech Skills"
                                {...validatorProps}
                            >
                                <Field name="techSkills">
                                    {({ field, form }) => {
                                      console.log('field', field);

                                      return (
                                      <div >
                                        {field.value.map((item, index) => (
                                            <div key={index}>
                                                <Badge
                                                    className="mb-2"
                                                    name={`techSkills.${index}`}
                                                >
                                                    {item}
                                                </Badge>
                                            </div>
                                        ))}
                                      </div>)
                                        }}
                                </Field>
                            </FormRow>
                            <div className="mt-4 ltr:text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    type="button"
                                    onClick={resetForm}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 'Updating' : 'Update'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
