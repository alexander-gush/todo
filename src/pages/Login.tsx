import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormItem,
  FormLayout,
  Input,
  Link,
  FormStatus,
  Card,
  Group,
  Header
} from '@vkontakte/vkui';
import { useAuth } from '../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const enum EmailStatus {
  EMPTY = 'Please enter email',
  INVALID = 'Invalid email',
  VALID = ''
}

const enum PasswordStatus {
  EMPTY = 'Please enter password',
  INVALID = 'Password should be at least 6 characters',
  VALID = ''
}

const Login = () => {
  const { googleSignIn, githubSignIn, user, createUser, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(EmailStatus.EMPTY);

  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(PasswordStatus.EMPTY);

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [showSignIn]);

  useEffect(() => {
    if (!email) {
      setEmailStatus(EmailStatus.EMPTY);
    } else if (!emailRegex.test(email)) {
      setEmailStatus(EmailStatus.INVALID);
    } else {
      setEmailStatus(EmailStatus.VALID);
    }
  }, [email]);

  useEffect(() => {
    if (!password) {
      setPasswordStatus(PasswordStatus.EMPTY);
    } else if (password.length < 6) {
      setPasswordStatus(PasswordStatus.INVALID);
    } else {
      setPasswordStatus(PasswordStatus.VALID);
    }
  }, [password]);

  const handleSignIn = async () => {
    setApiError('');
    try {
      setLoading(true);
      await signIn(email, password);
      navigate('/');
    } catch (e: any) {
      console.log('Error signing in:', e);
      setApiError(e.message);
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    setApiError('');
    try {
      setLoading(true);
      await createUser(email, password);
      navigate('/');
    } catch (e: any) {
      console.log('Error signing up:', e);
      setApiError(e.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setApiError('');
    try {
      await googleSignIn();
      navigate('/');
    } catch (e: any) {
      console.log('Error signing in with google:', e);
      setApiError(e.message);
    }
  };

  const handleGithubSignIn = async () => {
    setApiError('');
    try {
      await githubSignIn();
      navigate('/');
    } catch (e: any) {
      console.log('Error signing in with github:', e);
      setApiError(e.message);
    }
  };

  return (
    <Group
      mode="plain"
      header={
        <Header mode="primary">
          {showSignIn ? 'Sign in with your account:' : 'Create new account:'}
        </Header>
      }>
      <Card mode="outline">
        <FormLayout>
          <FormItem top="E-mail" bottom={emailStatus}>
            <Input
              type="email"
              placeholder="email"
              style={{ maxWidth: '400px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormItem>
          <FormItem top="Password" bottom={passwordStatus}>
            <Input
              type="password"
              placeholder="password"
              style={{ maxWidth: '400px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <Button
              align="center"
              size="m"
              loading={loading}
              onClick={showSignIn ? handleSignIn : handleCreateUser}
              disabled={
                passwordStatus !== PasswordStatus.VALID || emailStatus !== EmailStatus.VALID
              }>
              Sign {showSignIn ? 'in' : 'up'}
            </Button>
          </FormItem>
          <FormItem>
            <Button appearance="neutral" align="center" size="m" onClick={handleGoogleSignIn}>
              Sign In with Google
            </Button>
          </FormItem>
          <FormItem>
            <Button appearance="neutral" align="center" size="m" onClick={handleGithubSignIn}>
              Sign In with GitHub
            </Button>
          </FormItem>
          <FormItem>
            {showSignIn ? (
              <div>
                Don&apos;t have account, <Link onClick={() => setShowSignIn(false)}>create</Link>
              </div>
            ) : (
              <div>
                Already have account, <Link onClick={() => setShowSignIn(true)}>sign in</Link>
              </div>
            )}
          </FormItem>
          {apiError && (
            <FormStatus mode="error">
              Something went wrong: {apiError}. Please try again.
            </FormStatus>
          )}
        </FormLayout>
      </Card>
    </Group>
  );
};

export default Login;
