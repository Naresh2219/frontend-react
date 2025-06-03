import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const { user, auth, cart, sellers } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const becomeSellerClick = () => {
    if (sellers.profile?.id) {
      navigate("/seller");
    } else {
      navigate("/become-seller");
    }
  };

  return (
    <Box className="sticky top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md" sx={{ zIndex: 1200 }}>
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 h-[70px] border-b">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-3">
          {!isLarge && (
            <IconButton onClick={() => toggleDrawer(true)()}>
              <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
            </IconButton>
          )}

          <h1
            onClick={() => navigate("/")}
            className="logo cursor-pointer text-lg sm:text-xl md:text-2xl text-[#63c6e7]"
          >
            HappyShoping
          </h1>

          {/* Main Category */}
          {isLarge && (
            <ul className="flex items-center font-medium text-gray-800 ml-6">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  onMouseLeave={() => {
                    setShowSheet(true);
                  }}
                  className="mainCategory hover:text-[#00927c] cursor-pointer hover:border-b-2 h-[70px] px-4 border-[#00927c] flex items-center"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Search, Login, Cart, Wishlist */}
        <div className="flex flex-wrap gap-2 lg:gap-6 items-center justify-end">
          <IconButton onClick={() => navigate("/search-products")}>
            <SearchIcon className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
            >
              <Avatar
                sx={{ width: 29, height: 29 }}
                src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?uid=R199619367&ga=GA1.1.1186362245.1743680962&semt=ais_hybrid&w=740"
              />
              <h1 className="font-semibold hidden lg:block">
                {user.user?.fullName?.split(" ")[0] ?? "User"}
              </h1>
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ fontSize: "16px" }} />}
              onClick={() => navigate("/login")}
              className="text-sm px-3 py-1"
            >
              Login
            </Button>
          )}

          <IconButton onClick={() => navigate("/wishlist")}>
            <FavoriteBorderIcon sx={{ fontSize: 29 }} className="text-gray-700" />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
              <AddShoppingCartIcon sx={{ fontSize: 29 }} className="text-gray-700" />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
              className="text-sm px-3 py-1"
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>

      {/* Drawer for mobile */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

      {/* Category Sheet */}
      {showSheet && selectedCategory && (
        <div
          onMouseLeave={() => setShowSheet(false)}
          onMouseEnter={() => setShowSheet(true)}
          className="categorySheet absolute top-[4.41rem] left-4 right-4 md:left-20 md:right-20 z-50"
        >
          <CategorySheet
            setShowSheet={setShowSheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
