import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Icon from './Icon';

import AddChat from '../icons/icons-main-icon.png';

export default function Logo() {
  return (
    <Flex alignItems="flex-end">
      <Icon src={AddChat} size="xlarge" />
      <Text fontSize="headline">Messaging</Text>
    </Flex>
  );
}
