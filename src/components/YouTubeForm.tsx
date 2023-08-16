import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  age: number;
  dob: Date;
};

export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: data.username,
        email: data.email,
        channel: data.company.bs,
        age: 5,
        dob: new Date(),
      };
    },
  });
  const { register, control, handleSubmit, formState } = form;
  // const {name, ref, onChange, onBlur} = register("username");

  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        {/* <input type="text" id="username" name={name} ref={ref} onChange={onChange} onBlur={onBlur} /> */}
        <input
          type="text"
          id="username"
          {...register("username", { required: "Username is required" })}
        />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /[a-z]+@[a-z]+(\.[a-z]+)*$/,
              message: "Invalid email format",
            },
            validate: (fieldValue) => {
              return (
                fieldValue !== "admin@gmail.com" ||
                "Enter a different email address"
              );
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", { required: "Channel is required" })}
        />
        <p className="error">{errors.channel?.message}</p>

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: "Age is required",
          })}
        />
        <p className="error">{errors.age?.message}</p>

        <label htmlFor="dob">DOB</label>
        <input
          type="date"
          id="dob"
          {...register("dob", {
            valueAsDate: true,
            required: "DOB is required",
          })}
        />
        <p className="error">{errors.dob?.message}</p>

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
