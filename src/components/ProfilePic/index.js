import React from 'react';
import styled from 'styled-components';

const ProfileImageContainer = styled.div`
  width: ${props => props.size}px !important;
  min-width: ${props => props.size}px !important;
  height: ${props => props.size}px !important;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${({src}) => src ? 'block' : 'none'}
`;

function ProfilePicture({ size, src }) {
  return (
    <ProfileImageContainer size={size}>
      <ProfileImage src={src} alt="Profile" />
    </ProfileImageContainer>
  );
}

export default ProfilePicture;