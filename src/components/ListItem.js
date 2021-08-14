import React from 'react';

import { Flex, Avatar, Text, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Icon from './Icon';
import chatAdd from '../icons/icons-chat-add.png';

export default function ListItem({
  showAddIcon,
  showPeopleCount,
  peopleCount,
  title,
  subtitle,
  handler,
  roomName,
  username,
  name,
  ...props
}) {
  return (
    <Link
      key={roomName}
      to={{
        pathname: `/rooms/${roomName}`,
        state: {
          username,
        },
      }}
    >
      <Flex
        alignItems="center"
        borderRadius="9px"
        px="9px"
        py="13px"
        {...props}
        onClick={handler}
        tabIndex={-1}
        _focus={{ backgroundColor: 'gray' }}
      >
        <Flex>
          <Avatar w="large" h="large" borderRadius="7px" name={name} />
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Box ml="10px">
            <Text
              fontSize="subtitle_1"
              fontWeight="bold"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="100px"
            >
              {title}
            </Text>
            <Text color="black_subtitle" fontSize="subtitle_1">
              {subtitle}
            </Text>
          </Box>
        </Flex>
        {showAddIcon && (
          <Flex ml="auto">
            <Icon size="medium" src={chatAdd} />
          </Flex>
        )}

        {showPeopleCount && (
          <Flex ml="auto" h="100%" alignItems="flex-end">
            <Text fontSize="subtitle_1">{peopleCount} People</Text>
          </Flex>
        )}
      </Flex>
    </Link>
  );
}
