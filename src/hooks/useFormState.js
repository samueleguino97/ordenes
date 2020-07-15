import {useState, useCallback} from 'react';

export default function useFormState(initialState = {}) {
  const [formState, setFormState] = useState(initialState);

  const handleFieldChange = useCallback(
    field => value => {
      setFormState(previousState => ({...previousState, [field]: value}));
    },
    [],
  );

  function resetForm() {
    setFormState(initialState);
  }

  return [formState, handleFieldChange, resetForm];
}
