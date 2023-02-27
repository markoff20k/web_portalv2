
// Chakra Imports
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  IconButton,
  Input,
  InputLeftElement,
  InputGroup,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { SidebarContext } from "../../contexts/SidebarContext";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import AdminNavbarLinks from "./AdminNavbarLinks";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const {
    sidebarWidth,
    setSidebarWidth,
    toggleSidebar,
    setToggleSidebar,
  } = useContext(SidebarContext);
  const {
    variant,
    children,
    fixed,
    secondary,
    brandText,
    onOpen,
    ...rest
  } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainBrand = "white";
  let mainText = "#f54";
  let searchIcon = "white";
  let secondaryText = "gray.400";
  let navbarPosition = "absolute";
  let navbarFilter = "none";
  let navbarBackdrop = "unset";
  let navbarShadow = "none";
  let navbarBg = "none";
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingS = "15px";
  let paddingX = "15px";
  if (props.secondary) {
    navbarBackdrop = "none";
  }
  if (props.fixed === true)
    if (scrolled === true) {
      navbarPosition = "fixed";
      navbarShadow = "0px 7px 23px rgba(0, 0, 0, 0.05)";
      navbarBg =
        "linear-gradient(rgba(255, 255, 255, 0) 0% rgba(255, 255, 255, 0.39) @ 100%)";
      navbarBorder = "rgba(226, 232, 240, 0.3)";
      navbarFilter = "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))";
      navbarBackdrop = "blur(42px)";
    }
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);
  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth='1.5px'
      borderStyle='solid'
      transitionDelay='0s, 0s, 0s, 0s'
      transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
      transition-property='box-shadow, background-color, filter, border'
      transitionTimingFunction='linear, linear, linear, linear'
      alignItems={{ xl: "center" }}
      borderRadius='16px'
      display='flex'
      minH='75px'
      left={document.documentElement.dir === "rtl" ? "30px" : ""}
      right={document.documentElement.dir === "rtl" ? "" : "30px"}
      justifyContent={{ xl: "center" }}
      lineHeight='25.6px'
      mx='auto'
      mt={secondaryMargin}
      pb='8px'
      px={{
        sm: paddingX,
        md: "30px",
      }}
      ps={{
        sm: paddingS,
        md: "20px",
      }}
      pt='8px'
      top='18px'
      w={{
        sm: "calc(100vw - 30px)",
        xl: `calc(100vw - 75px - ${sidebarWidth}px)`,
      }}>
      <Flex
        w='100%'
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}>
        {/* <Box mb={{ sm: "8px", md: "0px" }}>
          <Breadcrumb>
            <BreadcrumbItem color={mainText}>
              <BreadcrumbLink href='#' color={secondaryText}>
                Páginas
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color={mainText}>
              <BreadcrumbLink href='#' color={mainText}>
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <Link
            color={mainText}
            href='#'
            bg='inherit'
            borderRadius='inherit'
            fontWeight='700'
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}>
            {brandText}
          </Link>
        </Box> */}
        {toggleSidebar ? (
          <Icon
            as={CgMenuRight}
            w='100px'
            h='20px'
            ms='20px'
            color={props.fixed ? (scrolled ? "#333" : "#fff") : "#fff"}
            cursor='pointer'
            display={{ sm: "none", xl: "block" }}
            onClick={() => {
              setSidebarWidth(sidebarWidth === 275 ? 120 : 275);
              setToggleSidebar(!toggleSidebar);
            }}
          />
        ) : (
          <HamburgerIcon
            w='100px'
            h='20px'
            ms='20px'
            color='#fff'
            cursor='pointer'
            display={{ sm: "none", xl: "block" }}
            onClick={() => {
              setSidebarWidth(sidebarWidth === 275 ? 120 : 275);
              setToggleSidebar(!toggleSidebar);
            }}
          />
        )}
    <InputGroup
        color='gray.400'
        bg='#272C35'
        border='0.5px solid'
        borderColor='#E2E8F04D'
        borderRadius='20px'
        cursor='pointer'
        // bg={inputBg}
        // borderRadius='15px'
        w={{
          sm: "128px",
          md: "430px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainBrand },
        }}
        _active={{
          borderColor: { mainBrand },
        }}>
        <InputLeftElement
          children={
            <IconButton
              bg='inherit'
              borderRadius='inherit'
              _hover='none'
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={
                <SearchIcon color={searchIcon} w='15px' h='15px' />
              }></IconButton>
          }
        />
        <Input
          fontSize='xs'
          py='11px'
          color={mainText}
          placeholder='Buscar'
          borderRadius='inherit'
        />
      </InputGroup>
        <Box ms='auto' w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
