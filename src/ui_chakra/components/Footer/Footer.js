/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function Footer(props) {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px={{ base: "15px", md: "30px" }}
      pb='20px'>
      <Text
        fontSize='sm'
        color='white'
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}>
        &copy; {1900 + new Date().getYear()},{" "}

        <Link href='https://www.fortem1.com.br' target='_blank'>
          {document.documentElement.dir === "rtl"
            ? " توقيت الإبداعية"
            : "Fortem One "}
        </Link>
        &
        <Link href='https://www.fortem.tech' target='_blank'>
          {document.documentElement.dir === "rtl" ? "سيممبل " : " Fortem Tech"}
        </Link>
        {document.documentElement.dir === "rtl"
          ? "للحصول على ويب أفضل"
          : " Inc."}
      </Text>

    </Flex>
  );
}
