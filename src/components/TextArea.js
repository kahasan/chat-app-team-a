import { Text } from '@chakra-ui/react';
import React from 'react';

export default function TextArea({ children }) {
  return (
    <Text
      d="inline-block"
      w="auto"
      borderRadius="18px"
      px="15px"
      py="8px"
      backgroundColor="gray"
      fontSize="body_1"
    >
      {children}
    </Text>
  );
}
