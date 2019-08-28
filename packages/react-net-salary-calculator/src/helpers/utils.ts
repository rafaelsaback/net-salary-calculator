import { ChangeEvent } from 'react';

export const handleChange = (setFunction: (value: string) => void) => (
  event: ChangeEvent<HTMLInputElement>,
) => setFunction(event.target.value);
