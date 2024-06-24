import React from "react";
import { useFormInputValidation } from "react-form-input-validation";

const ValidationForm = () => {
  const [fields, errors, form] = useFormInputValidation({
    customer_name: "",
    email_address: "",
    phone_number: "",
  }, {
    customer_name: "required",
    email_address: "required|email",
    phone_number: "required|numeric|digits_between:10,12"
  });

  const onSubmit = async (event) => {
    const isValid = await form.validate(event);
    if (isValid) {
       console.log(fields, errors);
      // Perform api call here
    }else{
      
    }
  }
  
  return <div style={{maxWidth: "600px", margin: "0 auto"}}>
  <h3>React Form Input Validation - validate</h3>
  <form
    className="myForm"
    noValidate
    autoComplete="off"
    onSubmit={onSubmit}
  >
    <p>
      <label>
        Name
        <input
          type="text"
          name="customer_name"
          onBlur={form.handleBlurEvent}
          onChange={form.handleChangeEvent}
          value={fields.customer_name}
      />
      </label>
      <label className="error">
        {errors.customer_name
          ? errors.customer_name
          : ""}
      </label>
    </p>

    <p>
      <label>
        Phone
        <input
          type="tel"
          name="phone_number"
          onBlur={form.handleBlurEvent}
          onChange={form.handleChangeEvent}
          value={fields.phone_number}
        />
      </label>
      <label className="error">
        {errors.phone_number
          ? errors.phone_number
          : ""}
      </label>
    </p>

    <p>
      <label>
        Email
        <input
          type="email"
          name="email_address"
          onBlur={form.handleBlurEvent}
          onChange={form.handleChangeEvent}
          value={fields.email_address}
        />
      </label>
      <label className="error">
        {errors.email_address
          ? errors.email_address
          : ""}
      </label>
    </p>

    <p>
      <button type="submit">Submit</button>
    </p>
  </form>
</div>
}

export default ValidationForm;