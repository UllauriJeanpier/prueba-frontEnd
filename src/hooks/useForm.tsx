import { useState } from 'react';

export const useForm =
    <T extends Object>(formulario: T):
    [T, (value: any, campo: keyof T) => void, () => void] => {

    const [formState, setSetFormState] = useState(formulario);

    const onChange = (value: any, campo: keyof T) => {
      setSetFormState({
        ...formState,
        [campo]: value,
      });
    };

    const cleanForm = () => {
      setSetFormState(formulario)
    }

    return [
      formState,
      onChange,
      cleanForm
    ];
  };
