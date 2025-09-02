import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Textfield from '../../ui/Texfield';

// 1. Field type
export type Field = {
  name: string;
  label: string;
  type: string;
};

// 2. Props type
export type AuthFormProps = {
  fields: Field[];
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
  buttonText: string;
};

function Authform({ fields, validationSchema, onSubmit, buttonText }: AuthFormProps) {
  const handleSubmit = (values: Record<string, string>) => {
    console.log('Formik submit:', values);
    onSubmit(values);
  };
  const formik = useFormik<Record<string, string>>({
    initialValues: fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
    validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    console.log('Formik values:', formik.values);
  }, [formik.values]);
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <Textfield
              name={field.name}
              label={field.label}
              type={field.type}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div style={{ minHeight: 10 }}>
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div style={{ minHeight: 20, color: 'red', fontSize: 12 }}>
                  {formik.errors[field.name]}
                </div>
              )}
            </div>
          </div>
        ))}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Loading...' : buttonText}
        </button>
      </form>
    </>
  );
}

export default Authform;
