import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Icon20DoorArrowRightOutline } from '@vkontakte/icons';
import { Header as VKHeader, Link, Title } from '@vkontakte/vkui';

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log('Error signing out:', e);
    }
  };

  return (
    <VKHeader
      size="large"
      style={{ borderBottom: '1px solid var(--vkui--color_separator_primary)' }}
      subtitle={
        user ? (
          <>You&apos;re currently signed in as {user.email}</>
        ) : (
          <>Please sign in or create new account</>
        )
      }
      aside={
        user?.email && (
          <>
            <Link onClick={handleSignOut}>
              Sign out
              <Icon20DoorArrowRightOutline />
            </Link>
          </>
        )
      }>
      <Title level="1">Todo list</Title>
    </VKHeader>
  );
};

export default Header;
