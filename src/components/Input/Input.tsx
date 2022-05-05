import React from 'react';

import styles from './Input.module.scss';

interface InputProps {
  type: 'text' | 'tel' | 'email';
  value: string | undefined;
  label: string;
  name: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  name,
  onChange,
  required,
}) => {
  return (
    <label className={styles.label}>
      {label}
      <input
        required={required}
        onChange={onChange}
        className={styles.input}
        value={value}
        type={type}
        name={name}
      />
    </label>
  );
};

export default Input;
