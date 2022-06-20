import { useRouter } from "next/router";
import { Box, Image, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { useAuth } from "../../contexts/Auth";
import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function Product() {
  const {
    query: { id, title, image_url, description },
  } = useRouter();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  useEffect(() => {
    getNotification();
  }, [user]);

  const getNotification = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("notifications")
        .select(`id, title, description, image_url`)
        .eq("id", id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setNotification(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box position="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
      >
        <Link href="/" passHref>
          <IconButton
            aria-label="Search database"
            icon={<FaAngleLeft />}
            isRound
            bg="white"
            position="absolute"
            top="16px"
            left="16px"
          />
        </Link>
      </motion.div>
      <Box
        as={motion.div}
        layoutId={`animated-card-${id}`}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Image
          boxSize="100%"
          height="320px"
          objectFit="cover"
          src={notification?.image_url || image_url}
          alt={loading ? title || "..." : notification.title}
          borderRadius="8px"
        />
      </Box>
      <Box
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
        padding="16px"
        fontWeight="semibold"
      >
        {loading ? title || "..." : notification.title}
      </Box>
      <Box
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
        padding="16px"
      >
        {loading ? description || "..." : notification.description}
      </Box>
    </Box>
  );
}
