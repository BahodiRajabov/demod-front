
/* ----- OLD CUSTOM SLIDER ------ */

//   const CustomSliderList = styled(List)(
//     ({ theme }) => 
//     `
  
//     .box__slider-img {
//       width: 100%;
//       height: 100%;
//     }
//     .box__slider-item {
//       width: 500px;
//       height: 500px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     &.box__list {
//       position: absolute;
//       display: flex;
//       align-items: center;
//       list-style: none;
//       bottom: 50px;
//       left: 0;
//     }
//     &.box__list .box__item {
//       width: 70px;
//       height: 70px;
//       border-radius: 15px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 5px;
//       overflow: hidden;
//       border: 2px solid transparent;
//       cursor: pointer;
//       transition: all 0.4s ease;
//    }
//    &.box__list .box__item:not(:last-child) {
//       margin-right: 5px;
//    }
//    &.box__list .box__item:hover {
//       border-color: #c59308;
//    }
//    &.box__wrap {
//       display: flex;
//       align-items: center;
//       position: absolute;
//       left: 0;
//       transform: translateX(-${sliderCount * 500}px);
//       transition: all 0.6s ease;
//    }
//    &.box__list .box__item--active {
//       border-color: #c59308;
//    }
//     &.box__item * {
//       pointer-events: none;
//    }
//     &.box #tb {
//       display: none;
//    }
//    &.box__list .box__item--btn {
//       padding: 0;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       border: none;
//       background: none;
//    }
//    &.box__list .box img {
//       width: 100%;
//       height: 100%;
//    }
    
  
//     `
//   );
  
// <CustomSliderList className="box__wrap">
//             {
//               MacBook.map(item => (
//                 <ListItem className="box__slider-item" key={item.id}>
//                   <img className="box__slider-img" src={item.img} alt="" />
//                 </ListItem>
//               ))
//             }
            
//           </CustomSliderList>
//           <CustomSliderList className="box__list" >
//             {
//               MacBook.map(item => (
//                 <ListItem onClick={()=> setSliderCount(item.id - 1)} className={`box__item ${sliderCount + 1 == item.id ? "box__item--active": ""}`} key={item.id}>
//                   <Button className="box__item--btn">
//                     <img className="box__item--img" src={item.img} alt="slider-img" />
//                   </Button>
//                 </ListItem>
//               ))
//             }
            
//           </CustomSliderList>




// FAKE DATA ALL USERS


// {/* const itemData = [
//   {
//    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//    title: 'Fern',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
//    title: 'Snacks',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//    title: 'Mushrooms',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
//    title: 'Tower',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//    title: 'Sea star',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//    title: 'Honey',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//    title: 'Basketball',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//    title: 'Breakfast',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
//    title: 'Tree',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//    title: 'Burger',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//    title: 'Camera',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//    title: 'Coffee',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
//    title: 'Camping Car',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//    title: 'Hats',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//    title: 'Tomato basil',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
//    title: 'Mountain',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//    title: 'Bike',
//  },
// ];



// SELECT MATERIALS AND COLORS 
{/* <Box sx={{display:"flex",marginBottom:"28px"}}>
<Box sx={{marginRight:"48px"}}>
  <Box sx={{display:"flex"}}>
    <SimpleTypography 
      text={"Material:"} 
      className="material__title" 
    />
    <SimpleTypography 
      text={" Fabric"} 
      className="material__text" 
    />
  </Box>
  <FormControl>
    <RadioGroup
      id="demo-radio-buttons-group-label__materials"
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      sx={{flexDirection:"initial"}}
    >
      {
        materials.map((item,index) => (
          <SimpleFormControlLabel 
            key={index}
            sx={inpchecked == index ?  { marginLeft: "0",border:"1px solid #7210be"} : { marginLeft: "0"}} 
            value="female" 
            control={<Radio onClick={()=> setInpChecked(index)}  sx={RadioStyle}/>} 
            label={<Image src="/img/material.jpg" alt="Material" width={36} height={36}/>} 
          />
        ))
      }
    </RadioGroup>
  </FormControl>
</Box>
<Box>
  <Box sx={{display:"flex"}}>
    <SimpleTypography 
      text={"Color:"} 
      className="material__title" 
    />
    <SimpleTypography 
      text={" White"} 
      className="material__text" 
    />
  </Box>
  <FormControl>
    <RadioGroup
      id="demo-radio-buttons-group-label__colors"
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      sx={{flexDirection:"initial"}}
    >
      {
        colors.map((item,index) => (
          <SimpleFormControlLabel 
            key={index}
            sx={colorInpchecked == index ? { marginLeft: "0",border:"2px solid #7210be !important"} : { marginLeft: "0"} }
            value="female" 
            className="MuiFormControlLabel-colors__label"
            control={<Radio onClick={()=> setColorInpInpChecked(index)}  sx={RadioStyle}/>} 
            label={<Box 
              className="MuiFormControlLabel-colors__box" 
              sx={{ background:item.color}}
              />} 
          />
        ))
      }
    </RadioGroup>
  </FormControl>
</Box>
<Box />
</Box> */}

// DOWNLOAD FILE BUTTON

{/* <Link href="https://www.blacksunsoftware.com/downloads/Colormania.zip">
<a download  href="https://www.blacksunsoftware.com/downloads/Colormania.zip" style={{textDecoration:"none"}}>
    <Buttons 
      name="" 
      type="button"
      className="download__zip--file"
    >
      <Image
        width="24px"
        height="26.67px"
        alt="Models"
        src="/icons/zip-icon.svg"
      />
      <Box sx={{marginLeft:"12px"}}>
        <SimpleTypography className="download__button--text" text="3ds Max 2019 + Corona | OBJ, FBX"/>
        <SimpleTypography className="download__button--mb" text="25.40 MB"/>
      </Box>

    </Buttons>
</a>
</Link> */}


// ----- OLD CATEGORY --- 

 {/* <Box sx={SliderBoxStyle}>
          <Box sx={{borderBottom: "1px solid #E0E0E0"}}>
            <SimpleTypography 
              text="Categories" 
              className="category__title" 
            />
            <Box sx={sliderWrraperStyles}>
              <List 
                component="ul" 
                sx={{
                  width:"226px", 
                  marginRight:"30px"
                }}
              >
                {categoryData?.map((item: any, index: any) => (
                  <CustomCategoryItem 
                    onClick={()=> 
                      CategoryItemHandler(item)
                    } 
                    key={index}>
                    <Box 
                      
                      sx={{ 
                        width:"100%", 
                        display:"flex", 
                        alignItems:"center", 
                        justifyContent:" space-between"
                      }}
                    >
                      <SimpleTypography 
                        text={item?.name} 
                        className="category__text"
                      />
                      <NavigateNextIcon className='catergory__arrow-icon'/>
                    </Box>
                  </CustomCategoryItem>
                ))}
    
              </List>
              <List 
                component="ul" 
                sx={{ width: "226px" }} 
              >
                <ListItem 
                  onClick={()=> setSlderStyle(0) } 
                  sx={{
                    padding: 0,
                    marginBottom: 2,
                    cursor: 'pointer',
                    // borderBottom: "1px solid #e7e7e7"
                  }}
                >
                  <NavigateBeforeIcon sx={{ cursor: 'pointer', color: "#1D5BF9" }} />
                    <SimpleTypography   
                      text="Barcha Kategoriyalar" 
                      className="category__link"
                    />
                </ListItem>
    
              <div>
                <FormControlLabel 
                  label="All"
                  control={
                    <Checkbox
                      checked={isAll__Chechbox__Selected}
                      indeterminate={false}
                      onChange={(e) => {handleSelectAll(isAll__Chechbox__Selected)}}
                    />
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 0 }}>
                  {childrenCategoryData?.map((child__Category : any, index: number)=>(
                    <FormControlLabel
                      key={index}
                      sx={{minWidth: "100%"}}
                      label={`${child__Category?.name}`}
                      control={
                        <Checkbox 
                          checked={child__Category?.is__Selected} 
                          onChange={(event)=>{
                            handleChange(event, child__Category?.category_id)}
                          } 
                        />
                      }
                    />
                  ))}
                </Box>
              </div>
              </List>
            </Box>
          </Box>
        
        </Box> */}