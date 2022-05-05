import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  active,
  disabled,
}) => {
  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={cn(styles.button, {
        [styles.active]: active,
      })}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
