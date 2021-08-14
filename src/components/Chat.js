import { Flex, Input, Text } from '@chakra-ui/react';
import React, { useRef, useEffect, useState } from 'react';

import Icon from './Icon';

import send from '../icons/icons-send.png';

export default function Chat({
  children,
  roomTitle,
  handler,
  value,
  onChange,
}) {
  const dummy = useRef(null);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [toggle]);

  return (
    <Flex
      flexDirection="column"
      flexGrow="5"
      px="35px"
      w="350px"
    >
      <Flex>
        <Text
          fontSize="title"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          maxWidth="200px"
        >
          {roomTitle}
        </Text>
      </Flex>

      <Flex
        overflowY="scroll"
        maxHeight="100%"
        flexDir="column"
        h="calc(100vh - 270px)"
        mt="40px"
      >
        {children}
        <div ref={dummy}></div>
      </Flex>

      <Flex alignItems="center">
        <form
          style={{ width: '100%', display: 'flex' }}
          onSubmit={(e) => {
            e.preventDefault();
            handler();
            setToggle((prev) => !prev);
          }}
        >
          <Input
          _focus={{ borderColor: 'purple', boxShadow: '0 0 0 1px purple_53' }}
            size="md"
            placeholder="Write a message..."
            borderColor="purple_53"
            boxShadow="none"
            fontSize="body_1"
            value={value}
            onChange={onChange}
          />
          <div onClick={() => setToggle((prev) => !prev)}>
            <Icon handler={handler} src={send} size="large" ml="18px" />
          </div>
        </form>
      </Flex>
    </Flex>
  );
}
