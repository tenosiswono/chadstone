import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Box,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import { useAuth } from "../contexts/Auth"

export default function NotificationList() {
  const { notifications } = useAuth();

  return <Box padding="16px">
  <Box paddingY="16px">
    <Heading textAlign="center">Chadstone</Heading>
  </Box>
  <Box width="100%" marginBottom="32px">
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FaSearch color="gray.300" />
      </InputLeftElement>
      <Input type="text" placeholder="Search" bg="white" />
    </InputGroup>
  </Box>
  <Box>
    <Box fontWeight="bold" marginY="16px">
      Notifications
    </Box>
    <Box
      css={{
        "&::-webkit-scrollbar": {
          width: "0",
        },
        "&::-webkit-scrollbar-track": {
          width: "0",
        },
      }}
    >
      {notifications?.map((n, index) => {
        return (
          <Link key={index} href={{ pathname: `/notification/${n.id}`, query: { ...n } }} passHref>
            <Box width="100%" marginBottom="16px">
              <Box as={motion.div} layoutId={`animated-card-${n.id}`}>
                <Image
                  boxSize="100%"
                  height="200px"
                  objectFit="cover"
                  src={n.image_url}
                  alt={n.title}
                  borderRadius="8px"
                />
              </Box>
              <Box fontWeight="semibold" padding="16px">{n.title}</Box>
            </Box>
          </Link>
        );
      })}
    </Box>
  </Box>
</Box>
}