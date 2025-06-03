import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate, useSearchParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchUserProfile } from "../../../Redux Toolkit/Customer/UserSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FavoriteBorder } from "@mui/icons-material";

const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const { user, auth, cart, sellers } = useAppSelector((store) => store);
  const navigate = useNavigate();
  
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const becomeSellerClick = () => {
    if (sellers.profile?.id) {
      navigate("/seller")
    } else navigate("/become-seller")
  }

  // Close category sheet when window is resized to mobile
  useEffect(() => {
    if (!isLarge && showSheet) {
      setShowSheet(false);
    }
  }, [isLarge, showSheet]);

  return (
    <Box
      className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80"
      sx={{ zIndex: 1200 }}
    >
      <div className={`flex items-center justify-between px-3 sm:px-5 lg:px-20 h-[60px] sm:h-[70px] border-b`}>
        <div className="flex items-center gap-4 sm:gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton 
                onClick={() => toggleDrawer(true)()}
                sx={{ padding: isSmall ? '6px' : '8px' }}
              >
                <MenuIcon 
                  className="text-gray-700" 
                  sx={{ fontSize: isSmall ? 24 : 29 }} 
                />
              </IconButton>
            )}
            <h1
              onClick={() => navigate("/")}
              className="logo cursor-pointer text-lg sm:text-xl md:text-2xl text-[#63c6e7]"
            >
              HappyShoping
            </h1>
          </div>

          {isLarge && (
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseLeave={() => setShowSheet(false)}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
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

        <div className="flex gap-1 sm:gap-3 lg:gap-6 items-center">
          <IconButton 
            onClick={()=>navigate("/search-products")}
            sx={{ padding: isSmall ? '6px' : '8px' }}
          >
            <SearchIcon 
              className="text-gray-700" 
              sx={{ fontSize: isSmall ? 24 : 29 }} 
            />
          </IconButton>

          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
              sx={{ minWidth: 'auto', padding: isSmall ? '4px' : '8px 12px' }}
            >
              <Avatar
                sx={{ 
                  width: isSmall ? 24 : 29, 
                  height: isSmall ? 24 : 29 
                }}
                src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?uid=R199619367&ga=GA1.1.1186362245.1743680962&semt=ais_hybrid&w=740"
              />
              <h1 className="font-semibold hidden sm:block">
                {user.user?.fullName?.split(" ")[0] || "User"}
              </h1>
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />}
                onClick={() => navigate("/login")}
                sx={{ 
                  display: { xs: 'none', sm: 'inline-flex' },
                  padding: '4px 8px',
                  fontSize: '0.75rem'
                }}
              >
                Login
              </Button>
              <IconButton 
                onClick={() => navigate("/login")}
                sx={{ 
                  display: { xs: 'inline-flex', sm: 'none' },
                  padding: '6px'
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </>
          )}

          <IconButton 
            onClick={()=>navigate("/wishlist")}
            sx={{ padding: isSmall ? '6px' : '8px' }}
          >
            <FavoriteBorder 
              sx={{ fontSize: isSmall ? 24 : 29 }}
              className="text-gray-700" 
            />
          </IconButton>

          <IconButton 
            onClick={() => navigate("/cart")}
            sx={{ padding: isSmall ? '6px' : '8px' }}
          >
            <Badge 
              badgeContent={cart.cart?.cartItems.length} 
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: isSmall ? '0.6rem' : '0.75rem',
                  height: isSmall ? 18 : 20,
                  minWidth: isSmall ? 18 : 20,
                }
              }}
            >
              <AddShoppingCartIcon
                sx={{ fontSize: isSmall ? 24 : 29 }}
                className="text-gray-700"
              />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
              sx={{
                padding: '4px 8px',
                fontSize: '0.75rem'
              }}
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>
      <Drawer 
        open={open} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { 
            width: isSmall ? '100%' : '280px',
            backgroundColor: '#f8f9fa'
          }
        }}
      >
        {<DrawerList toggleDrawer={toggleDrawer} />}
      </Drawer>
      {isLarge && showSheet && selectedCategory && (
        <div
          onMouseLeave={() => setShowSheet(false)}
          onMouseEnter={() => setShowSheet(true)}
          className="categorySheet absolute top-[4.41rem] left-20 right-20"
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