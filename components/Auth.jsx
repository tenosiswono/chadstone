import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Button, Heading, Box } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../contexts/Auth";

export default function Auth() {
  const { signGoogle } = useAuth();

  return (
    <Box p="8">
      <Heading mb="8">Chadstone</Heading>
      <Box className="description" mb="8">
        <Button onClick={signGoogle} leftIcon={<FcGoogle />}>
          Sign In With Google
        </Button>
      </Box>
    </Box>
  );
}
