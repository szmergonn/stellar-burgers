import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser, selectAuthError } from '../../services/selectors';
import { updateUser } from '../../services/slices/auth-slice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (user && !isInitialized) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  const isFormChanged = useMemo(() => {
    if (!isInitialized || !user) return false;

    return (
      formValue.name !== user.name ||
      formValue.email !== user.email ||
      formValue.password !== ''
    );
  }, [
    formValue.name,
    formValue.email,
    formValue.password,
    user,
    isInitialized
  ]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const updatedData = {
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password ? { password: formValue.password } : {})
    };

    dispatch(updateUser(updatedData))
      .unwrap()
      .then(() => {
        setFormValue((prev) => ({
          ...prev,
          password: ''
        }));
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error ?? undefined}
    />
  );
};
