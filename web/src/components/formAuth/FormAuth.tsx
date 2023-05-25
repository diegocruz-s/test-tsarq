import { useState } from "react";
import { IUser } from "../../interfaces/user/user";

interface Props {
  valuesForm: string[]
}
interface UserData extends Omit<IUser, "id"> {
    [key: string]: string;
  }

const FormAuth = ({ valuesForm }: Props) => {
  const [optionsDatasForm, setOptionsDatasForm] = useState<UserData>(
    {
        bios: "",
        email: "",
        name: "",
        password: "",
        username: "",
    }
  )
  console.log('valueDatas', optionsDatasForm)

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setOptionsDatasForm(prev => {
        const newDatas = { ...prev, [name]: value } 
        return newDatas
    })

  }

  return (
    <div>
      {valuesForm.map((value) => {
        return (
          <div className="elementForm">
            <label>{value}</label>
            <input
                type="text" 
                onChange={onHandleChange} 
                value={optionsDatasForm[value]}
                name={value}
            />
          </div>
        );
      })}

      <button type="button">Send</button>
    </div>
  );
};

export { FormAuth };
