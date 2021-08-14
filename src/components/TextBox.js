import React from 'react';

import { Flex, Avatar, Text } from '@chakra-ui/react';
import TextArea from './TextArea';

export default function TextBox({ user, text, ...props }) {
  return (
    <Flex alignItems="flex-end" mb="17px" {...props}>
      <Avatar w="large" h="large" borderRadius="7px" name={user} />
      <Flex flexDir="column" ml="10px">
        <Text
          fontSize="subtitle_1"
          pl="15px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          maxWidth="150px"
        >
          {user}
        </Text>
        <TextArea>{text}</TextArea>
      </Flex>
    </Flex>
  );
}
