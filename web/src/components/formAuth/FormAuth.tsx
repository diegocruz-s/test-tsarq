import "./styles/main.scss";
import { Dispatch, SetStateAction, useState, } from "react";
import { IUser } from "../../interfaces/user/user";
import {  } from 'react'

export interface UserData extends Omit<IUser, "id"> {
  [key: string]: string
}

interface Props {
  valuesForm: {
    value: string,
    icon: any
  }[],
  datasForm: UserData,
  setDatasForm: Dispatch<SetStateAction<UserData>>,
}


const FormAuth = ({ valuesForm, datasForm, setDatasForm }: Props) => {
  
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setDatasForm(prev => {
        const newDatas = { ...prev, [name]: value } 
        return newDatas
    })

  }

  return (
    <div className="allComponents">
      {valuesForm.map((item, i) => {
        return (
          <div className="elementForm" key={i}>
            {/* <label className="textElement">{value}</label> */}
            <div className="div_icon">
              <item.icon className="icon" />
            </div>
            <input
                type={item.value === 'password' ? 'password' : 'text'} 
                onChange={onHandleChange} 
                value={datasForm[item.value]}
                name={item.value}
                placeholder={item.value}
            />
          </div>
         
        );
      })}

    </div>
  );
};

export { FormAuth };
