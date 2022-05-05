import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { User } from '../../types/types';
import Api from '../../services/Api';
import useFetching from '../../hooks/useFetching';
import Input from '../Input/Input';
import Title from '../Title/Title';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import styles from './UserProfile.module.scss';

interface FormDataState {
  [key: string]: string;
}

const UserProfile = () => {
  const params = useParams();
  const [formData, setFormData] = useState<FormDataState>({});
  const [isEditable, setEditable] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [fetching, isLoading, error] = useFetching(async () => {
    if (!params.id) return;
    const user = await api.getUser(params.id);
    if (Object.keys(user).length === 0) throw new Error('что-то пошло не так');
    setUser(user);
  });
  const api = new Api();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const initForm = () => {
    if (!user) return;
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      street: user.address.street,
      city: user.address.city,
      phone: user.phone,
      zipcode: user.address.zipcode,
      website: user.website,
      comment: '',
    });
  };

  const toggleEdit = () => {
    setEditable((isEditable) => !isEditable);
  };

  useEffect(() => {
    fetching();
  }, []);

  useEffect(() => {
    initForm();
  }, [user]);

  return (
    <div className={styles.profile}>
      <div className={styles.formHead}>
        <Title text="Профиль пользователя" />
        <Button onClick={toggleEdit}>Редактировать</Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={onSubmit} className={styles.form}>
          <fieldset className={styles.fieldset} disabled={!isEditable}>
            <Input
              onChange={handleInputChange}
              name="name"
              type="text"
              label="Name"
              value={formData.name}
              required
            />
            <Input
              onChange={handleInputChange}
              name="username"
              type="text"
              label="User name"
              value={formData.username}
              required
            />
            <Input
              onChange={handleInputChange}
              name="email"
              type="email"
              label="Email"
              value={formData.email}
            />
            <Input
              onChange={handleInputChange}
              name="street"
              type="text"
              label="Street"
              value={formData.street}
              required
            />
            <Input
              onChange={handleInputChange}
              name="city"
              type="text"
              label="City"
              value={formData.city}
              required
            />
            <Input
              onChange={handleInputChange}
              name="zipcode"
              type="text"
              label="Zip code"
              value={formData.zipcode}
              required
            />
            <Input
              onChange={handleInputChange}
              name="phone"
              type="tel"
              label="Phone"
              value={formData.phone}
              required
            />
            <Input
              onChange={handleInputChange}
              name="website"
              type="text"
              label="Website"
              value={formData.website}
              required
            />
            <label className={styles.label}>
              Comment
              <textarea
                value={formData.comment}
                onChange={handleTextAreaChange}
                className={styles.comment}
                name="comment"
                cols={30}
                rows={3}
              />
            </label>
          </fieldset>
          <div className={styles.buttonSubmit}>
            <Button active={isEditable} disabled={!isEditable}>
              Отправить
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
